import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import 'multer'; // Needed for Express.Multer type

@Injectable()
export class SupabaseService implements OnModuleInit {
  private supabaseClient: SupabaseClient;
  private bucketName: string;
  private readonly logger = new Logger(SupabaseService.name);

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    // Initialize Supabase client
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials');
    }
    
    this.supabaseClient = createClient(supabaseUrl, supabaseKey);
    this.bucketName = this.configService.get<string>('SUPABASE_BUCKET') || 'images';
    
    this.logger.log(`Initialized Supabase client with bucket: ${this.bucketName}`);
  }

  // Upload file to Supabase Storage using service role key (bypasses RLS)
  async uploadFile(file: Express.Multer.File, path = ''): Promise<string> {
    try {
      if (!file) {
        throw new Error('No file provided');
      }
      
      // Create a more URL-friendly filename
      const originalName = file.originalname.replace(/\s+/g, '_');
      const timestamp = Date.now();
      const uniqueFilename = `${timestamp}_${originalName}`;
      
      // Determine the final path (with or without subfolder)
      const filePath = path ? `${path}/${uniqueFilename}` : uniqueFilename;
      
      this.logger.log(`Uploading file to ${this.bucketName}/${filePath}`);
      
      // Check file size
      if (file.size > 50 * 1024 * 1024) { // 50MB
        throw new Error('File size exceeds the 50MB limit');
      }
      
      // Upload file
      const { data, error } = await this.supabaseClient
        .storage
        .from(this.bucketName)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: true // Overwrite if exists
        });
        
      if (error) {
        this.logger.error(`Upload failed: ${error.message}`);
        throw new Error(`Upload failed: ${error.message}`);
      }
      
      this.logger.log(`File uploaded successfully. Creating URL...`);
      
      // Since your bucket is marked as public in the dashboard, get the public URL
      const { data: publicUrlData } = this.supabaseClient
        .storage
        .from(this.bucketName)
        .getPublicUrl(filePath);
        
      return publicUrlData.publicUrl;
    } catch (error) {
      this.logger.error(`Failed to upload file: ${error.message}`);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  // Delete file from Supabase Storage
  async deleteFile(filePath: string): Promise<void> {
    try {
      this.logger.log(`Attempting to delete file at ${filePath}`);
      
      const { data, error } = await this.supabaseClient
        .storage
        .from(this.bucketName)
        .remove([filePath]);
        
      if (error) {
        this.logger.error(`Delete failed: ${error.message}`);
        throw new Error(`Delete failed: ${error.message}`);
      }
      
      this.logger.log(`File deleted successfully`);
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  // Get public URL for a file
  getPublicUrl(filePath: string): string {
    try {
      const { data } = this.supabaseClient
        .storage
        .from(this.bucketName)
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error) {
      throw new Error(`Failed to get public URL: ${error.message}`);
    }
  }
  
  // List all files in a path
  async listFiles(path = ''): Promise<string[]> {
    try {
      const { data, error } = await this.supabaseClient
        .storage
        .from(this.bucketName)
        .list(path);
        
      if (error) {
        throw new Error(`Failed to list files: ${error.message}`);
      }
      
      return data.map(file => file.name);
    } catch (error) {
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }
  
  // Get Supabase client (for custom operations)
  getClient(): SupabaseClient {
    return this.supabaseClient;
  }
  
  // Get bucket name
  getBucketName(): string {
    return this.bucketName;
  }
}

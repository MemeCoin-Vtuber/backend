import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Express } from 'express';

@Injectable()
export class FilesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Upload file
  async uploadFile(file: Express.Multer.File, folder = '') {
    try {
      const url = await this.supabaseService.uploadFile(file, folder);
      
      // Extract filename from the URL
      const urlParts = url.split('/');
      const filename = urlParts[urlParts.length - 1];
      
      return { 
        url,
        filename,
        size: file.size,
        mimetype: file.mimetype
      };
    } catch (error) {
      throw error;
    }
  }

  // Get public URL for a file
  getFileUrl(filename: string) {
    try {
      const url = this.supabaseService.getPublicUrl(filename);
      return { url };
    } catch (error) {
      throw error;
    }
  }

  // Delete file
  async deleteFile(filename: string) {
    try {
      await this.supabaseService.deleteFile(filename);
      return { success: true, message: 'File successfully deleted' };
    } catch (error) {
      throw error;
    }
  }
  
  // List all files in a folder
  async listFiles(folder = '') {
    try {
      const files = await this.supabaseService.listFiles(folder);
      
      // Get public URLs for all files
      const filesWithUrls = files.map(filename => {
        const url = this.supabaseService.getPublicUrl(folder ? `${folder}/${filename}` : filename);
        return {
          filename,
          url
        };
      });
      
      return { files: filesWithUrls };
    } catch (error) {
      throw error;
    }
  }
}
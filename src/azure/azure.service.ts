import { Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureStorageService {
  constructor(private configService: ConfigService) {}

  private getBlobServiceInstance() {
    const connectionString = this.configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');
    return BlobServiceClient.fromConnectionString(connectionString!);
  }

  private async getBlobClient(containerName: string, blobName: string): Promise<BlockBlobClient> {
    const blobServiceClient = this.getBlobServiceInstance();
    const containerClient = blobServiceClient.getContainerClient(containerName);
    
    // Create the container if it doesn't exist
    await containerClient.createIfNotExists({
      access: 'blob', // 'blob' access allows public read access for blobs
    });
    
    return containerClient.getBlockBlobClient(blobName);
  }

  async upload(
    containerName: string,
    blobName: string,
    file: any, // Update from Express.Multer.File
  ): Promise<string> {
    const blockBlobClient = await this.getBlobClient(containerName, blobName);
    
    // Upload file
    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: {
        blobContentType: file.mimetype,
      },
    });
    
    // Return the URL to the blob
    return blockBlobClient.url;
  }
}
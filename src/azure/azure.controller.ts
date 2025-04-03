// Create a file: src/file/file.controller.ts
import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AzureStorageService } from './azure.service';
import { FileUploadDto } from './dto/azure.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('file')
export class FileController {
  constructor(private readonly azureStorageService: AzureStorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        containerName: { type: 'string' },
      },
    },
  }) 
  async uploadFile(@UploadedFile() file: any, @Body() fileUploadDto) {
    try {
      // Generate a unique name for the blob
      const blobName = `${Date.now()}-${file.originalname}`;
      
      // Upload to the 'files' container
      const url = await this.azureStorageService.upload(fileUploadDto.containerName!, blobName, file);
      
      return {
        message: 'File uploaded successfully',
        url,
        fileName: file.originalname,
        contentType: file.mimetype,
        size: file.size,
      };
    } catch (error) {
      return {
        message: 'Failed to upload file',
        error: error.message,
      };
    }
  }
}

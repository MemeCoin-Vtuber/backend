import {
  Controller,
  Post,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Get,
  Body
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FilesService } from './file.service';
import {
  ApiTags,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse
} from '@nestjs/swagger';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('upload')
  @ApiOperation({ summary: 'Upload a file to Supabase Storage' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to upload to Supabase Storage',
        },
        folder: {
          type: 'string',
          description: 'Folder path where the file should be uploaded',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'File successfully uploaded',
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          example: 'https://your-project.supabase.co/storage/v1/object/sign/files/example.jpg?token=...',
          description: 'URL to the uploaded file in Supabase Storage'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body('folder') folder: string) {
    return this.filesService.uploadFile(file, folder);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get file download URL by ID' })
  @ApiParam({
    name: 'id',
    description: 'File ID or filename to retrieve from storage',
    example: 'my-image.jpg'
  })
  @ApiResponse({
    status: 200,
    description: 'File URL found',
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          example: 'https://your-project.supabase.co/storage/v1/object/sign/files/my-image.jpg?token=...'
        }
      }
    }
  })
  async getFile(@Param('id') id: string) {
    return this.filesService.getFileUrl(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a file from Supabase Storage' })
  @ApiParam({
    name: 'id',
    description: 'File ID or filename to delete from storage',
    example: 'my-image.jpg'
  })
  @ApiResponse({
    status: 200,
    description: 'File successfully deleted',
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: true
        }
      }
    }
  })
  async deleteFile(@Param('id') id: string) {
    return this.filesService.deleteFile(id);
  }
}

// Create a file: src/file/file.controller.ts
import { BadRequestException, Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AzureStorageService } from './azure.service';
import { FileUploadDto } from './dto/azure.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/decorators';

@Controller('file')
export class FileController {
    constructor(private readonly azureStorageService: AzureStorageService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiSecurity('bearer')
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
    async uploadFile(@UploadedFile() file: any, @Body() fileUploadDto, @CurrentUser() user) {
        try {

            const MAX_FILE_SIZE =  1 * 1024 * 1024;
            if (file.size > MAX_FILE_SIZE) {
                throw new BadRequestException(`File size exceeds the maximum limit of 1MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
                return;
            }

            // Generate a unique name for the blob
            const blobName = `${user.userId}-${Date.now()}-${file.originalname}`;

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

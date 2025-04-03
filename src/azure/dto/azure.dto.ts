
// Create a file: src/file/dto/file-upload.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FileUploadDto {

  @IsString()
  @ApiProperty({
    description: 'Custom container name (optional)',
    required: false,
    example: 'users',
  })
  containerName: string;
}
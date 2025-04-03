import { Module } from '@nestjs/common';
import { AzureStorageService } from './azure.service';
import { FileController } from './azure.controller';

@Module({
  providers: [AzureStorageService],
  controllers: [FileController]
})
export class AzureModule {}

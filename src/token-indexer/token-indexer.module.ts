import { Module } from '@nestjs/common';
import { PriceTrackerService } from './token-indexer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PriceTrackerController } from './token-indexer.controller';

@Module({
  providers: [PriceTrackerService, PrismaService],
  controllers: [PriceTrackerController],
})
export class PriceTrackerModule {}
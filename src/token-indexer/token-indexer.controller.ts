import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('price-history')
export class PriceTrackerController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':tokenId')
  async getTokenPriceHistory(@Param('tokenId', ParseIntPipe) tokenId: number) {
    const priceHistory = await this.prisma.tokenPriceHistory.findMany({
      where: {
        aiTokenId: tokenId,
      },
      orderBy: {
        timestamp: 'asc',
      },
      select: {
        timestamp: true,
        priceInWei: true,
      },
    });

    return priceHistory;
  }
}
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ethers } from 'ethers';
import { PrismaService } from 'src/prisma/prisma.service';

// Safely load env vars
const LAUNCHPAD_ADDRESS = process.env.LAUNCHPAD_CONTRACT_ADDRESS;
const RPC_URL = process.env.RPC_URL;

if (!LAUNCHPAD_ADDRESS || !RPC_URL) {
  throw new Error('Missing env: LAUNCHPAD_CONTRACT_ADDRESS or RPC_URL');
}

const LAUNCHPAD_ABI = [
  'function currentPrice(address tokenAddress) public view returns (uint256)',
];

@Injectable()
export class PriceTrackerService {
  private provider = new ethers.JsonRpcProvider(RPC_URL);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async trackPricesForAllTokens() {
    const tokens = await this.prisma.aIToken.findMany({
      where: {
        contractAddress: {
          not: null,
        },
      },
    });

    for (const token of tokens) {
      const tokenAddress = token.contractAddress;
      if (!tokenAddress) continue;

      try {
        const launchpadContract = new ethers.Contract(
          LAUNCHPAD_ADDRESS!,
          LAUNCHPAD_ABI,
          this.provider,
        );

        const price = await launchpadContract.currentPrice(tokenAddress);

        await this.prisma.tokenPriceHistory.create({
          data: {
            priceInWei: price.toString(),
            aiTokenId: token.id,
          },
        });

        console.log(
          `📊 Stored price for ${token.tokenName}: ${price.toString()} wei`,
        );
      } catch (err) {
        console.error(`❌ Failed to store price for ${token.tokenName}`, err);
      }
    }
  }
}
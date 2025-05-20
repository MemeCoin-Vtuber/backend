import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigService } from './config/config.service';
import { ConfigModule } from '@nestjs/config';
import { AgentModule } from './agent/agent.module';
import { AzureModule } from './azure/azure.module';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { PriceTrackerModule } from './token-indexer/token-indexer.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AgentModule,
    AzureModule,
    ChatModule,
    PriceTrackerModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, ConfigService],
})
export class AppModule {}
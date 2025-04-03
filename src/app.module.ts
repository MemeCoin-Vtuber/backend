import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigService } from './config/config.service';
import { ConfigModule } from '@nestjs/config';
import { AgentModule } from './agent/agent.module';
import { AzureModule } from './azure/azure.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({isGlobal: true}),
    AgentModule,
    AzureModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, ConfigService],
})
export class AppModule {}

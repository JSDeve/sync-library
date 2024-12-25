import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import config from 'knexfile';
import { SyncService } from './sync.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    KnexModule.forRoot({
      config
    })
  ],
  controllers: [AppController],
  providers: [AppService, SyncService],
})
export class AppModule {}

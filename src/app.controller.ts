import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SyncService } from './sync.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly syncService: SyncService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  async findAll() {
    const data = await this.syncService.findAll();
    return data;
  }

  @Get('/sync')
  async sync(@Query('q') query: string) {
    const count = await this.syncService.syncAuthors(query);
    return {
      message: `${count} authors processed`
    };
  }
}

import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller()
export class AppController {
  constructor(private readonly dataSource: DataSource) {}

  @Get()
  @Get('/health')
  async healthCheck() {
    const DS_manager = this.dataSource.manager;
    const health = await DS_manager.query('SELECT NOW()');
    return { status: 'ok', dbTime: health[0].now };
  }
}

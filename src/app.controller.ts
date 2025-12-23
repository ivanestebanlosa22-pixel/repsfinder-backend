import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('agents')
  getAgents() {
    return this.appService.getAgents();
  }

  @Get('products')
  getProducts() {
    return this.appService.getProducts();
  }

  @Get('guides')
  getGuides() {
    return this.appService.getGuides();
  }
}
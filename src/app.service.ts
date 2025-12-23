import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'RepsFinder Backend API is running!';
  }

  async getAgents() {
    const agents = await this.prisma.agent.findMany({
      where: { isVerified: true },
    });
    
    return agents.map(agent => ({
      ...agent,
      categories: JSON.parse(agent.categories),
      shippingMethods: JSON.parse(agent.shippingMethods),
      paymentMethods: JSON.parse(agent.paymentMethods),
      storeLinks: JSON.parse(agent.storeLinks),
      contactInfo: agent.contactInfo ? JSON.parse(agent.contactInfo) : null,
    }));
  }

  async getProducts() {
    return this.prisma.product.findMany({
      where: { isActive: true },
      take: 20,
    });
  }

  async getGuides() {
    return this.prisma.guide.findMany({
      where: { isPublished: true },
    });
  }
}
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@repsfinder.com' },
    update: {},
    create: {
      email: 'admin@repsfinder.com',
      username: 'admin',
      password: hashedPassword,
      isVerified: true,
    },
  });

  console.log('Admin created');

  const usfans = await prisma.agent.upsert({
    where: { affiliateCode: 'RCGD5Y' },
    update: {},
    create: {
      name: 'USFANS',
      agentType: 'USFANS',
      description: 'Premium shopping agent',
      affiliateCode: 'RCGD5Y',
      affiliateLink: 'https://www.usfans.com/register?ref=RCGD5Y',
      bonusInfo: 'Free QC photos',
      isVerified: true,
      isPremium: true,
      isTrusted: true,
      reputationScore: 4.9,
      categories: JSON.stringify(['Shoes', 'Clothing']),
      shippingMethods: JSON.stringify(['DHL', 'EMS']),
      paymentMethods: JSON.stringify(['PayPal']),
      averageProcessingTime: 48,
      storeLinks: JSON.stringify({}),
      contactInfo: JSON.stringify({}),
    },
  });

  console.log('USFANS created');

  const cnfans = await prisma.agent.upsert({
    where: { affiliateCode: '5267649' },
    update: {},
    create: {
      name: 'CNFANS',
      agentType: 'CNFANS',
      description: 'Reliable shopping agent with competitive prices',
      affiliateCode: '5267649',
      affiliateLink: 'https://cnfans.com/register/?ref=5267649',
      bonusInfo: '10% discount on first order',
      isVerified: true,
      isPremium: false,
      isTrusted: true,
      reputationScore: 4.7,
      categories: JSON.stringify(['Shoes', 'Clothing', 'Watches']),
      shippingMethods: JSON.stringify(['EMS', 'DHL']),
      paymentMethods: JSON.stringify(['PayPal', 'Bitcoin']),
      averageProcessingTime: 72,
      storeLinks: JSON.stringify({}),
      contactInfo: JSON.stringify({}),
    },
  });

  console.log('CNFANS created');

  const kakobuy = await prisma.agent.upsert({
    where: { affiliateCode: 'hc9hz' },
    update: {},
    create: {
      name: 'Kakobuy',
      agentType: 'KAKOBUY',
      description: 'User-friendly agent with free storage',
      affiliateCode: 'hc9hz',
      affiliateLink: 'https://ikako.vip/r/hc9hz',
      bonusInfo: 'Free 30-day storage',
      isVerified: true,
      isPremium: true,
      isTrusted: false,
      reputationScore: 4.5,
      categories: JSON.stringify(['Electronics', 'Home', 'Fashion']),
      shippingMethods: JSON.stringify(['DHL', 'FedEx']),
      paymentMethods: JSON.stringify(['PayPal', 'Apple Pay']),
      averageProcessingTime: 60,
      storeLinks: JSON.stringify({}),
      contactInfo: JSON.stringify({}),
    },
  });

  console.log('KAKOBUY created');

  const litbuy = await prisma.agent.upsert({
    where: { affiliateCode: 'LITBUY2024' },
    update: {},
    create: {
      name: 'Litbuy',
      agentType: 'LITBUY',
      description: 'Premium agent for luxury items',
      affiliateCode: 'LITBUY2024',
      affiliateLink: 'https://www.litbuy.com/register?ref=LITBUY2024',
      bonusInfo: 'Premium QC service included',
      isVerified: true,
      isPremium: true,
      isTrusted: true,
      reputationScore: 4.8,
      categories: JSON.stringify(['Watches', 'Bags', 'Jewelry']),
      shippingMethods: JSON.stringify(['DHL Express', 'FedEx Priority']),
      paymentMethods: JSON.stringify(['PayPal', 'Crypto']),
      averageProcessingTime: 36,
      storeLinks: JSON.stringify({}),
      contactInfo: JSON.stringify({}),
    },
  });

  console.log('LITBUY created');

  const guide = await prisma.guide.create({
    data: {
      title: 'How to Buy with USFANS',
      slug: 'how-to-buy-usfans',
      category: 'AGENT_GUIDES',
      content: 'Complete guide for USFANS...',
      excerpt: 'Learn how to buy with USFANS',
      tags: JSON.stringify(['USFANS', 'tutorial']),
      authorId: admin.id,
      isPublished: true,
      estimatedReadTime: 5,
      difficulty: 'BEGINNER',
    },
  });

  console.log('Guide created');

  await prisma.fAQ.createMany({
    data: [
      {
        question: 'What is a shopping agent?',
        answer: 'A shopping agent helps you buy from Chinese marketplaces.',
        category: 'GETTING_STARTED',
        order: 1,
      },
      {
        question: 'Which agent should I choose?',
        answer: 'USFANS for speed, CNFANS for price, LITBUY for luxury.',
        category: 'AGENTS',
        order: 2,
      },
    ],
  });

  console.log('FAQs created');
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
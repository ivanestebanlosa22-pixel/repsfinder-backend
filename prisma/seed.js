const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const sneakers = await prisma.category.upsert({
    where: { name: "Sneakers" },
    update: {},
    create: { name: "Sneakers" },
  });

  const streetwear = await prisma.category.upsert({
    where: { name: "Streetwear" },
    update: {},
    create: { name: "Streetwear" },
  });

  await prisma.store.createMany({
    data: [
      {
        name: "Old Chen",
        platform: "Weidian",
        url: "https://weidian.com/?userid=123456",
        categoryId: sneakers.id,
        priceTier: "HIGH",
        activityStatus: "ACTIVE",
        reputationScore: 70,
      },
      {
        name: "Budget King",
        platform: "Weidian",
        url: "https://weidian.com/?userid=654321",
        categoryId: streetwear.id,
        priceTier: "LOW",
        activityStatus: "ACTIVE",
        reputationScore: 55,
      }
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seed completado");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

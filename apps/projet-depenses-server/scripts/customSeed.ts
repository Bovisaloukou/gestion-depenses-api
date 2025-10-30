import { PrismaClient } from "@prisma/client";

export async function customSeed() {
  const client = new PrismaClient();
  const username = "admin";

  // Find the user to associate with the new data
  const user = await client.user.findUnique({
    where: { username },
  });

  if (!user) {
    console.error("User not found. Please make sure the main seed script runs first.");
    return;
  }

  // Seed Categories
  const category1 = await client.category.create({
    data: {
      name: "Food",
      icon: "🍔",
      userId: user.id,
    },
  });

  const category2 = await client.category.create({
    data: {
      name: "Transportation",
      icon: "🚗",
      userId: user.id,
    },
  });

  // Seed Expenses
  await client.expense.create({
    data: {
      amount: 25.5,
      date: new Date(),
      description: "Lunch with colleagues",
      userId: user.id,
      categoryId: category1.id,
    },
  });

  await client.expense.create({
    data: {
      amount: 12.0,
      date: new Date(),
      description: "Bus ticket",
      userId: user.id,
      categoryId: category2.id,
    },
  });

  // Seed TrackedCryptos
  await client.trackedCrypto.create({
    data: {
      tokenId: "bitcoin",
      userId: user.id,
    },
  });

  await client.trackedCrypto.create({
    data: {
      tokenId: "ethereum",
      userId: user.id,
    },
  });

  console.log("Custom seed completed successfully!");

  client.$disconnect();
}
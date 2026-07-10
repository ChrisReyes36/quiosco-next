import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/src/generated/prisma/client";
import { categories } from "./data/categories";
import { products } from "./data/products";

const adapter = new PrismaPg({
  connectionString: `${process.env.DATABASE_URL}`,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.product.createMany({
    data: products,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

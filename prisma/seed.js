import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Insertar usuarios
  const users = await prisma.user.createMany({
    data: [
      {
        name: "Juan Pérez",
        email: "juan@example.com",
        password: "hashedpassword123",
      },
      {
        name: "María López",
        email: "maria@example.com",
        password: "securepassword456",
      },
      {
        name: "Carlos Fernández",
        email: "carlos@example.com",
        password: "strongpass789",
      },
      {
        name: "Ana Gómez",
        email: "ana@example.com",
        password: "password123",
      },
      {
        name: "Pedro Sánchez",
        email: "pedro@example.com",
        password: "safeandsecure2024",
      },
      {
        name: "Lucía Ramírez",
        email: "lucia@example.com",
        password: "mypass456",
      },
      {
        name: "Diego Torres",
        email: "diego@example.com",
        password: "topsecret789",
      },
    ],
  });

  // Insert categories first
  const categories = await prisma.category.createMany({
    data: [
      { name: "Electronics" },
      { name: "Gaming" },
      { name: "Accessories" },
      { name: "Office" },
      { name: "Fitness" },
    ],
  });

  // Fetch categories with IDs
  const categoryElectronics = await prisma.category.findFirst({ where: { name: "Electronics" } });
  const categoryGaming = await prisma.category.findFirst({ where: { name: "Gaming" } });
  const categoryAccessories = await prisma.category.findFirst({ where: { name: "Accessories" } });
  const categoryOffice = await prisma.category.findFirst({ where: { name: "Office" } });
  const categoryFitness = await prisma.category.findFirst({ where: { name: "Fitness" } });

  // Insert products with stock and categories
  const products = await prisma.product.createMany({
    data: [
      {
        name: "Laptop Gamer",
        description: "Potente laptop con RTX 3080",
        price: 2500,
        stock: 5,
        categoryId: categoryGaming?.id,
      },
      {
        name: "Mouse Inalámbrico",
        description: "Ergonómico y con gran autonomía",
        price: 50,
        stock: 30,
        categoryId: categoryAccessories?.id,
      },
      {
        name: "Auriculares Bluetooth",
        description: "Sonido envolvente y cancelación de ruido",
        price: 120,
        stock: 20,
        categoryId: categoryElectronics?.id,
      },
      {
        name: "Teclado Mecánico RGB",
        description: "Switches silenciosos y luces RGB personalizables",
        price: 200,
        stock: 15,
        categoryId: categoryGaming?.id,
      },
      {
        name: "Monitor 4K 32''",
        description: "Resolución ultra HD con 144Hz de refresco",
        price: 800,
        stock: 10,
        categoryId: categoryOffice?.id,
      },
      {
        name: "Silla Gamer Ergonómica",
        description: "Comodidad para largas horas de juego o trabajo",
        price: 350,
        stock: 8,
        categoryId: categoryGaming?.id,
      },
      {
        name: "Smartwatch Deportivo",
        description: "Monitoreo de salud y notificaciones en tiempo real",
        price: 180,
        stock: 25,
        categoryId: categoryFitness?.id,
      },
      {
        name: "Micrófono Profesional USB",
        description: "Ideal para streaming y podcasting",
        price: 140,
        stock: 12,
        categoryId: categoryAccessories?.id,
      },
    ],
  });

  console.log("✅ Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

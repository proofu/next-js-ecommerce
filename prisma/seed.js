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
  await prisma.product.createMany({
    data: [
      {
        name: "Laptop Gamer",
        description: "Potente laptop con RTX 3080",
        price: 2500,
        stock: 5,
        categoryId: categoryGaming?.id,
        imageUrl: null,
      },
      {
        name: "Mouse Inalámbrico",
        description: "Ergonómico y con gran autonomía",
        price: 50,
        stock: 30,
        categoryId: categoryAccessories?.id,
        imageUrl: null,
      },
      {
        name: "Auriculares Bluetooth",
        description: "Sonido envolvente y cancelación de ruido",
        price: 120,
        stock: 20,
        categoryId: categoryElectronics?.id,
        imageUrl: null,
      },
      {
        name: "Teclado Mecánico RGB",
        description: "Switches silenciosos y luces RGB personalizables",
        price: 200,
        stock: 15,
        categoryId: categoryGaming?.id,
        imageUrl: null,
      },
      {
        name: "Monitor 4K 32''",
        description: "Resolución ultra HD con 144Hz de refresco",
        price: 800,
        stock: 10,
        categoryId: categoryOffice?.id,
        imageUrl: null,
      },
      {
        name: "Silla Gamer Ergonómica",
        description: "Comodidad para largas horas de juego o trabajo",
        price: 350,
        stock: 8,
        categoryId: categoryGaming?.id,
        imageUrl: null,
      },
      {
        name: "Smartwatch Deportivo",
        description: "Monitoreo de salud y notificaciones en tiempo real",
        price: 180,
        stock: 25,
        categoryId: categoryFitness?.id,
        imageUrl: null,
      },
      {
        name: "Micrófono Profesional USB",
        description: "Ideal para streaming y podcasting",
        price: 140,
        stock: 12,
        categoryId: categoryAccessories?.id,
        imageUrl: null,
      },
      {
        name: "Cámara Web 1080p",
        description: "Videollamadas en alta resolución",
        price: 90,
        stock: 18,
        categoryId: categoryElectronics?.id,
        imageUrl: null,
      },
      {
        name: "Router WiFi 6",
        description: "Conectividad de alta velocidad",
        price: 120,
        stock: 14,
        categoryId: categoryOffice?.id,
        imageUrl: null,
      },
      {
        name: "Disco Duro Externo 2TB",
        description: "Almacenamiento portátil de gran capacidad",
        price: 100,
        stock: 22,
        categoryId: categoryAccessories?.id,
        imageUrl: null,
      },
      {
        name: "Tablet 10'' Android",
        description: "Pantalla táctil y gran rendimiento",
        price: 250,
        stock: 11,
        categoryId: categoryElectronics?.id,
        imageUrl: null,
      },
      {
        name: "Bocinas Bluetooth",
        description: "Sonido potente y portátil",
        price: 80,
        stock: 27,
        categoryId: categoryElectronics?.id,
        imageUrl: null,
      },
      {
        name: "Lámpara LED Escritorio",
        description: "Iluminación ajustable y diseño moderno",
        price: 40,
        stock: 35,
        categoryId: categoryOffice?.id,
        imageUrl: null,
      },
      {
        name: "Cargador Rápido USB-C",
        description: "Carga eficiente y rápida para dispositivos móviles",
        price: 25,
        stock: 50,
        categoryId: categoryAccessories?.id,
        imageUrl: null,
      },
      {
        name: "Mochila para Laptop 15''",
        description: "Resistente al agua y ergonómica",
        price: 60,
        stock: 20,
        categoryId: categoryAccessories?.id,
        imageUrl: null,
      },
      {
        name: "Impresora Multifuncional",
        description: "Impresión, escaneo y copiado",
        price: 300,
        stock: 9,
        categoryId: categoryOffice?.id,
        imageUrl: null,
      },
      {
        name: "Batería Externa 20000mAh",
        description: "Carga portátil para múltiples dispositivos",
        price: 70,
        stock: 28,
        categoryId: categoryAccessories?.id,
        imageUrl: null,
      },
      {
        name: "Ventilador USB de Escritorio",
        description: "Compacto y silencioso",
        price: 30,
        stock: 40,
        categoryId: categoryOffice?.id,
        imageUrl: null,
      },
      {
        name: "Gafas de Realidad Virtual",
        description: "Experiencia inmersiva en 3D",
        price: 220,
        stock: 7,
        categoryId: categoryGaming?.id,
        imageUrl: null,
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

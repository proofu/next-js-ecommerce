import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Devuelve 10 productos
    const products = await prisma.product.findMany({ take: 9 })

    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    console.error('❌ Error al obtener productos:', error)

    return NextResponse.json(
      { message: 'Error al obtener los productos', error: (error as Error).message },
      { status: 500 }
    )
  }
}

type createProductDTO = {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
};

export async function POST(request: NextRequest) {
  try {
    const res: createProductDTO = await request.json();
    const product = await prisma.product.create({
      data: {
        name: res.name,
        description: res.description,
        price: res.price,
        stock: res.stock,
        categoryId: res.categoryId,
      } as createProductDTO,
    });
    // Return successful response
    return new Response(
      JSON.stringify({ message: "Product created", product }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error al crear producto:", error);

    return new Response(
      JSON.stringify({ error: "Falla al crear el producto" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

type updateProductDTO = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
};

export async function PUT(request: NextRequest) {
  try {
    const res: updateProductDTO = await request.json();

    const updatedProduct = await prisma.product.update({
      where: {
        id: res.id,
      },
      data: {
        name: res.name,
        description: res.description,
        price: res.price,
        stock: res.stock,
        categoryId: res.categoryId,
      } as updateProductDTO,
    });
    return NextResponse.json(
      { message: "Producto actualizado con éxito", updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Erorr al actualizar producto:", error);

    // Return error response
    return NextResponse.json(
      { error: "Falla al actualizar producto" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const res = await request.json();
    const deletedProduct = await prisma.product.delete({
      where: {
        id: res.id,
      },
    });
    return NextResponse.json(
      { message: "Producto eliminado", deletedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error al eliminar el producto:", error);

    return NextResponse.json(
      {
        message: "Error eliminando el producto",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

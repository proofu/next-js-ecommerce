import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "9", 10);
    const skip = (page - 1) * limit;
    
    
    
    
    // Validate page and limit
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return NextResponse.json(
        { error: "Invalid page or limit" },
        { status: 400 }
      );
    }
    
    const whereClause: Prisma.ProductWhereInput = {}; // Use Prisma's type

    const search = searchParams.get("search") || "";
    const categorySearchId = searchParams.get("categoryId") || "";
    // const whereClause = search
    //   ? { name: { contains: search } }
    //   : {};
    if (search) {
      whereClause.name= { contains: search }      
    } 
    if(categorySearchId){
      whereClause.categoryId = parseInt(categorySearchId, 10);
    }

    const products =
      (await prisma.product.findMany({ where: whereClause, skip, take: 9 })) ||
      [];
    const totalProducts = await prisma.product.count({ where: whereClause });
    const totalPages = Math.ceil(totalProducts / 9);

    return NextResponse.json(
      { products, totalPages, currentPage: page },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);

    return NextResponse.json(
      {
        message: "Error al obtener los productos",
        error: (error as Error).message,
      },
      { status: 500 }
    );
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

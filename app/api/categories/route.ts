import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error("❌ Error al obtener categorias:", error);

    return NextResponse.json(
      {
        message: "Error al obtener los categorias",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const product = await prisma.category.create({
      data: {
        name: res.name,
      },
    });
    // Return successful response
    return new Response(
      JSON.stringify({ message: "Category created", product }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error al crear categoria:", error);

    return new Response(
      JSON.stringify({ error: "Falla al crear la categoria" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
export async function PUT(request: NextRequest) {
  try {
    const res = await request.json();

    const updatedCategory = await prisma.category.update({
      where: {
        id: res.id,
      },
      data: {
        name: res.name
      },
    });
    return NextResponse.json(
      { message: "Categoria actualizada con éxito", updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Erorr al actualizar categoria:", error);

    // Return error response
    return NextResponse.json(
      { error: "Falla al actualizar categoria" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
    try {
      const res = await request.json();
      const deletedCategory = await prisma.category.delete({
        where: {
          id: res.id,
        },
      });
      return NextResponse.json(
        { message: "Categoria eliminada", deletedCategory },
        { status: 200 }
      );
    } catch (error) {
      console.error("❌ Error al eliminar la categoria:", error);
  
      return NextResponse.json(
        {
          message: "Error eliminando la categoria",
          error: (error as Error).message,
        },
        { status: 500 }
      );
    }
  }
  
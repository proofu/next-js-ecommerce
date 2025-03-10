import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ productId: string }> }
  ) {
    const product = (await params).productId // 'a', 'b', or 'c'
    return Response.json({ message: "get de " + product })
  }
  export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ productId: string }> }
  ) {
    const product = (await params).productId // 'a', 'b', or 'c'
    return Response.json({ message: "put de " + product })
  }
  export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ productId: string }> }
  ) {
    const product = (await params).productId // 'a', 'b', or 'c'
    return Response.json({ message: "delete de " + product })
  }
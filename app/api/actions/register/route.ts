import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";
import { z } from "zod";

const UserZod = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
    email: z.string().email("Correo inválido."),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
  });
  

export async function POST(request: NextRequest) {
    try {
      const res = await request.json();
  
      const validatedData = UserZod.parse(res);

      // Validate required fields
      if (!res.name || !res.email || !res.password) {
        return new Response(
          JSON.stringify({ error: "No se encontraron los campos requeridos" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

  
      const user = await prisma.user.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          password: validatedData.password, 
        },
      });


  
      return new Response(
        JSON.stringify({ message: "Usuario registrado", user }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
  
    } catch (error) {
      console.error("Error al registrar usuario:", error);
  
      return new Response(
        JSON.stringify({ error: "Erorr en el servidor interno" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  
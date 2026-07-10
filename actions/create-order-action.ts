"use server";

import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schema";

export async function createOrder(data: unknown) {
  const result = OrderSchema.safeParse(data);

  if (!result.success) return { errors: result.error.issues };

  try {
    await prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        orderProducts: {
          create: result.data.order.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error al crear la orden:", error);
    return {
      errors: [{ message: "No se pudo crear la orden. Inténtalo de nuevo." }],
    };
  }
}

import { env } from "@/config/env.config";
import { EventLocation } from "@/types/event.types";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  context: Context
) {
  try {
    const { id } = await context.params;

    const response = await fetch(
      `${env.API_BASE_URL}/events/event-locations/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: request.headers.get("Authorization") || "",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Error en la solicitud a la API externa: ${response.status} ${response.statusText}`
      );
    }

    const data: EventLocation = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    let message = "Ocurrió un error desconocido.";
    if (
      typeof error === "object" &&
      error &&
      "message" in error &&
      typeof (error as { message?: string }).message === "string"
    ) {
      message = (error as { message?: string }).message!;
    }

    if (process.env.NODE_ENV === "development") {
      console.error("Error en el handler GET de event-locations:", error);
    }

    return NextResponse.json(
      { message: "Fallo al obtener la ubicación del evento: " + message },
      { status: 500 }
    );
  }
}

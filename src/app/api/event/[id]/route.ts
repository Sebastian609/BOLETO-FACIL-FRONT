import { env } from "@/config/env.config";
import { EventLocation } from "@/types/event.types";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string }}
) {
  try {
    const { id } = await params; // Directly destructure 'id' from 'params'

    
    const response = await fetch(
      `${env.API_BASE_URL}/events/event-locations/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: request.headers.get("Autorization")
        }
      }
    );

    if (!response.ok) {
      // Provide more specific error details from the API if available
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error en la solicitud a la API externa: ${response.status} ${response.statusText}`);
    }

    const data: EventLocation = await response.json();
    return NextResponse.json(data);

  } catch (error) { // Use 'any' or more specific type if known for error object
    // Log the full error in development for better debugging
    if (process.env.NODE_ENV === 'development') {
      console.error("Error en el handler GET de event-locations:", error);
    }
    return NextResponse.json(
      { message: "Fallo al obtener la ubicación del evento: " + (error.message || "Ocurrió un error desconocido.")   },
      { status: 401 } // Use 401 if it's an authentication/authorization issue, 500 for server errors
    );
  }
}
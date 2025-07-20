import { NextRequest, NextResponse } from 'next/server'
import { env } from "@/config/env.config";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    
    const token  = "tok001"

    // Hacer la petición al API externo
    const response = await fetch(`${env.API_BASE_URL}/events/paginated?page=${page}&limit=${limit}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token })
    })

    if (!response.ok) {
      throw new Error(`Error del API externo: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error en API handler de eventos:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    
    // Para GET, asumimos que el token está en los headers o query params
    const token = searchParams.get('token') || 'tok001'

    // Hacer la petición al API externo
    const response = await fetch(`${env.API_BASE_URL}/events/paginated?page=${page}&limit=${limit}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token })
    })

    if (!response.ok) {
      throw new Error(`Error del API externo: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error en API handler de eventos:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 
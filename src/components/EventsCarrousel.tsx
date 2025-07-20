"use client"
import { env } from "@/config/env.config";

import { useState, useEffect } from "react"

// --- Interfaces actualizadas para la nueva estructura ---

interface Location {
  id: number
  name: string
  capacity: number
  createdAt: string
  updatedAt: string
  isActive: boolean
  deleted: boolean
}

interface EventLocation {
  id: number
  name: string
  price: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  deleted: boolean
  location: Location
}

interface Event {
  id: number
  name: string
  description: string
  startDate: string
  endDate: string
  saleStart: string
  saleEnd: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  deleted: boolean
  eventLocations: EventLocation[]
}

// Interfaz para la respuesta completa de la API - ACTUALIZADA
interface EventsResponse {
  data: Event[]
  pagination: {
    currentPage: number
    itemsPerPage: number | null
    totalItems: number
    totalPages: number | null
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

const categoryGradients = [
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-purple-500",
  "from-teal-500 to-blue-500",
]

export default function EventsCarrousel() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationInfo, setPaginationInfo] = useState<EventsResponse["pagination"] | null>(null)
  const [limit] = useState(3)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${env.API_BASE_URL}/events/paginated?page=${currentPage}&limit=${limit}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Error al cargar los eventos")
        }

        const data: EventsResponse = await response.json()
        setEvents(data.data)
        setPaginationInfo(data.pagination)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [currentPage, limit])

  const handleNextPage = () => {
    if (paginationInfo?.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (paginationInfo?.hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Renderizado del Skeleton con estilo vívido
  if (loading) {
    return (
      <div className="w-full">
        <div className="flex overflow-x-auto gap-6 pb-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 animate-pulse overflow-hidden"
            >
              <div className="h-4 bg-gradient-to-r from-purple-200 to-blue-200 w-full"></div>
              <div className="p-6">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-3"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-4 w-3/4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3"></div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                  <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Renderizado del Error con estilo vívido
  if (error) {
    return (
      <div className="w-full">
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-red-700 font-semibold">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Renderizado principal con estilo vívido
  return (
    <div className="w-full">
      {/* Carrusel de eventos */}
      <div className="flex flex-row justify-center overflow-x-auto gap-6 pb-6 ">
        {events.map((event, index) => {
          const gradientClass = categoryGradients[index % categoryGradients.length]
          return (
            <div
              key={event.id}
              className="flex-shrink-0 w-80 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden"
            >
              {/* Header colorido */}
              <div className={`h-2 bg-gradient-to-r ${gradientClass}`}></div>

              <div className="p-6">
                {/* Título del evento */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2 flex-1">
                    {event.name}
                  </h3>
                  <div
                    className={`ml-2 w-3 h-3 rounded-full bg-gradient-to-r ${gradientClass} flex-shrink-0 mt-1`}
                  ></div>
                </div>

                {/* Descripción */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{event.description}</p>

                {/* Información del evento */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50/80 rounded-lg p-2">
                    <span className="text-purple-500">📅</span>
                    <span className="font-medium text-gray-700">Fecha:</span>
                    <span>{formatDate(event.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50/80 rounded-lg p-2">
                    <span className="text-blue-500">📍</span>
                    <span className="font-medium text-gray-700">Ubicación:</span>
                    <span>{event.eventLocations[0]?.location.name}</span>
                  </div>
                </div>

                {/* Opciones de entrada */}
                <div className="space-y-3 mb-4">
                  <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="text-green-500">🎫</span>
                    Opciones de Entrada:
                  </p>
                  <div className="space-y-2 overflow-y-auto">
                    {event.eventLocations.map((eventLocation) => (
                      <div
                        key={eventLocation.id}
                        className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-3 hover:border-purple-300 transition-all duration-300 hover:shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800">{eventLocation.name}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <span>📍</span>
                              {eventLocation.location.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      
                            </span>
                            <button
                              onClick={() => {
                                window.location.href = `/venta/${eventLocation.id}/${env.API_TOKEN}`
                              }}
                              className={`px-4 py-2 text-xs font-semibold text-white rounded-lg bg-gradient-to-r ${gradientClass} hover:shadow-lg hover:shadow-purple-200/50 transition-all duration-300 transform hover:scale-105`}
                            >
                                  S/ {Number.parseFloat(eventLocation.price).toFixed(2)}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rango de precios */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Desde</p>
                    <span className="text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      S/ {Math.min(...event.eventLocations.map((el) => Number.parseFloat(el.price))).toFixed(2)}
                    </span>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Hasta</p>
                    <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      S/ {Math.max(...event.eventLocations.map((el) => Number.parseFloat(el.price))).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Controles de Paginación con estilo vívido */}
      {paginationInfo && paginationInfo.totalPages && paginationInfo.totalPages > 1 && (
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={!paginationInfo.hasPreviousPage || loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            <span>←</span>
            Anterior
          </button>

          <div className="bg-white/80 backdrop-blur-sm border border-purple-200 rounded-xl px-6 py-3 shadow-lg">
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Página {paginationInfo.currentPage} de {paginationInfo.totalPages}
            </span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={!paginationInfo.hasNextPage || loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            Siguiente
            <span>→</span>
          </button>
        </div>
      )}

      {/* Información adicional de paginación */}
      {paginationInfo && (
        <div className="text-center mt-4">
          <div className="inline-block bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-2">
            <span className="text-sm text-gray-600">
              Mostrando <span className="font-semibold text-purple-600">{events.length}</span> de{" "}
              <span className="font-semibold text-blue-600">{paginationInfo.totalItems}</span> eventos
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

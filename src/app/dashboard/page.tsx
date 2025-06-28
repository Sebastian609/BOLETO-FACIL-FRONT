"use client"

import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-red-50 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 sm:p-8">
      <div className="text-center text-white max-w-4xl w-full">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl">
            🎫 BoletaFácil
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90 font-light max-w-2xl mx-auto">
            La plataforma más confiable para la venta de entradas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-3xl mx-auto">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span className="text-3xl sm:text-4xl block mb-2 sm:mb-3">🔒</span>
            <p className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">Pagos Seguros</p>
            <p className="text-xs sm:text-sm opacity-80">Encriptación SSL de última generación</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span className="text-3xl sm:text-4xl block mb-2 sm:mb-3">⚡</span>
            <p className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">Proceso Rápido</p>
            <p className="text-xs sm:text-sm opacity-80">Compra tus entradas en segundos</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span className="text-3xl sm:text-4xl block mb-2 sm:mb-3">📱</span>
            <p className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">Entradas Digitales</p>
            <p className="text-xs sm:text-sm opacity-80">Acceso inmediato desde tu móvil</p>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <Link
            href="/venta?referal=partner123&event=2"
            className="inline-block bg-slate-800 hover:bg-slate-900 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-lg active:translate-y-0 active:shadow-lg"
          >
            Comprar Entradas
          </Link>

          <div className="text-xs sm:text-sm opacity-70 max-w-md mx-auto">
            <p>Más de 10,000 eventos vendidos • Soporte 24/7 • Garantía de reembolso</p>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import EventsCarrousel from "@/components/EventsCarrousel"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="flex items-center justify-center p-4 sm:p-8 min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="text-center max-w-6xl w-full relative z-10">
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-8 shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">🎫</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent tracking-tight">
              BoletaFácil
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl mb-12 text-gray-700 font-light max-w-4xl mx-auto leading-relaxed">
              La plataforma empresarial líder en venta de entradas digitales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl p-8 hover:border-purple-400 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-200/50 group transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6 group-hover:from-purple-500 group-hover:to-purple-600 transition-all duration-300">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🔒</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">Seguridad Empresarial</h3>
              <p className="text-gray-600 leading-relaxed">Encriptación bancaria y cumplimiento PCI DSS</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border-2 border-blue-100 rounded-2xl p-8 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-200/50 group transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-6 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">⚡</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">Procesamiento Instantáneo</h3>
              <p className="text-gray-600 leading-relaxed">Tecnología de alta velocidad para grandes volúmenes</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border-2 border-cyan-100 rounded-2xl p-8 hover:border-cyan-400 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-200/50 group transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-xl flex items-center justify-center mb-6 group-hover:from-cyan-500 group-hover:to-cyan-600 transition-all duration-300">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📱</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">Solución Digital</h3>
              <p className="text-gray-600 leading-relaxed">Plataforma omnicanal con API empresarial</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                <span>+50,000 eventos procesados</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                <span>Soporte empresarial 24/7</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
                <span>SLA 99.9% garantizado</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-20 px-4 sm:px-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6">
              Eventos Corporativos
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Gestiona eventos empresariales de cualquier escala con nuestra plataforma profesional
            </p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border h-auto  border-white/20">
            <EventsCarrousel />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 py-20 px-4 sm:px-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full opacity-20 blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-4 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:shadow-purple-200/30 transform hover:-translate-y-1">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">10M+</div>
              <div className="text-gray-700 font-medium">Entradas Vendidas</div>
            </div>
            <div className="space-y-4 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:shadow-blue-200/30 transform hover:-translate-y-1">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">500+</div>
              <div className="text-gray-700 font-medium">Empresas Clientes</div>
            </div>
            <div className="space-y-4 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-cyan-100 hover:border-cyan-300 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-200/30 transform hover:-translate-y-1">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">99.9%</div>
              <div className="text-gray-700 font-medium">Tiempo de Actividad</div>
            </div>
            <div className="space-y-4 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-indigo-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-200/30 transform hover:-translate-y-1">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">24/7</div>
              <div className="text-gray-700 font-medium">Soporte Técnico</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

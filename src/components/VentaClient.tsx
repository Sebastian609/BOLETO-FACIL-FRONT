"use client"
import type { EventLocation } from "@/types/event.types"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, MapPin, Ticket, CreditCard, Shield, CheckCircle, Minus, Plus, Clock } from "lucide-react"

interface ClientSaleProps {
  eventLocation: EventLocation
  referal: string
}

interface PaymentData {
  partnerToken: string
  userId: number
  eventLocationId: number
  cardHash: string
}

export default function VentaPage({ eventLocation, referal }: ClientSaleProps) {
  const [quantity, setQuantity] = useState(1)
  const [cardNumber, setCardNumber] = useState("")
  const [ccv, setCcv] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cardHolder, setCardHolder] = useState("")
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Número de tarjeta inválido"
    }
    if (!ccv || ccv.length < 3) {
      newErrors.ccv = "CCV inválido"
    }
    if (!expiry || expiry.length < 5) {
      newErrors.expiry = "Fecha de vencimiento inválida"
    }
    if (!cardHolder.trim()) {
      newErrors.cardHolder = "Nombre del titular requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = async () => {
    if (!validateForm()) return

    setLoading(true)

    setTimeout(() => {
      const mockPaymentData: PaymentData = {
        partnerToken: referal,
        userId: 1,
        eventLocationId: eventLocation.id,
        cardHash: "asdfasdfwesf",
      }

      setPaymentData(mockPaymentData)
      setLoading(false)
    }, 3000)
  }

  const totalAmount = eventLocation.price * quantity

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center gap-4">
            <Ticket className="h-8 w-8 text-white" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-light tracking-wide mb-1">BoletaFácil</h1>
              <p className="text-gray-300 text-sm sm:text-base font-light">Sistema de Venta de Entradas</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Section */}
          <div className="space-y-6 sm:space-y-8">
            {/* Event Summary */}
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg sm:text-xl font-medium text-gray-900 flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  Resumen del Evento
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-gray-50 rounded-sm p-6 border-l-2 border-gray-900">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">{eventLocation.event.name}</h3>
                  <div className="space-y-3">
                    <p className="text-sm sm:text-base text-gray-600 flex items-center">
                      <MapPin className="mr-3 h-4 w-4 text-gray-500" />
                      {eventLocation.location.name}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 flex items-center">
                      <Clock className="mr-3 h-4 w-4 text-gray-500" />
                      {eventLocation.event.startDate}
                    </p>
                    <p className="text-base sm:text-lg text-gray-900 font-medium flex items-center">
                      <span className="mr-3 text-lg sm:text-xl text-gray-600">S/</span>
                      {eventLocation.price} por entrada
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantity Section */}
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-base sm:text-lg font-medium text-gray-900">Cantidad de Entradas</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 bg-white"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-2xl font-light text-gray-900 min-w-[48px] text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-10 h-10 border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 bg-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-center text-gray-500 text-sm">Máximo 10 entradas por compra</p>
              </CardContent>
            </Card>

            {/* Total Section */}
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>
                      Subtotal ({quantity} entrada{quantity > 1 ? "s" : ""})
                    </span>
                    <span>S/ {totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>Comisión de servicio</span>
                    <span>S/ {(totalAmount * 0.05).toFixed(2)}</span>
                  </div>
                  <Separator className="bg-gray-200" />
                  <div className="flex justify-between text-base sm:text-lg font-medium text-gray-900 pt-3">
                    <span>Total a Pagar</span>
                    <span>S/ {(totalAmount * 1.05).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section - Payment Form */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-lg sm:text-xl font-medium text-gray-900 flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-gray-600" />
                Información de Pago
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Card Holder Name */}
              <div className="space-y-2">
                <Label htmlFor="cardHolder" className="text-sm font-medium text-gray-700">
                  Nombre del Titular
                </Label>
                <Input
                  id="cardHolder"
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                  placeholder="NOMBRE COMPLETO"
                  className={`bg-white border-gray-300 focus:border-gray-900 focus:ring-gray-900 ${
                    errors.cardHolder ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                {errors.cardHolder && <span className="text-red-600 text-sm">{errors.cardHolder}</span>}
              </div>

              {/* Card Number */}
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">
                  Número de Tarjeta
                </Label>
                <Input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  className={`font-mono bg-white border-gray-300 focus:border-gray-900 focus:ring-gray-900 ${
                    errors.cardNumber ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                  maxLength={19}
                />
                {errors.cardNumber && <span className="text-red-600 text-sm">{errors.cardNumber}</span>}
              </div>

              {/* Expiry and CCV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="text-sm font-medium text-gray-700">
                    Fecha de Vencimiento
                  </Label>
                  <Input
                    id="expiry"
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/AA"
                    className={`font-mono bg-white border-gray-300 focus:border-gray-900 focus:ring-gray-900 ${
                      errors.expiry ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    maxLength={5}
                  />
                  {errors.expiry && <span className="text-red-600 text-sm">{errors.expiry}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ccv" className="text-sm font-medium text-gray-700">
                    CCV
                  </Label>
                  <Input
                    id="ccv"
                    type="text"
                    value={ccv}
                    onChange={(e) => setCcv(e.target.value.replace(/\D/g, ""))}
                    placeholder="123"
                    className={`font-mono bg-white border-gray-300 focus:border-gray-900 focus:ring-gray-900 ${
                      errors.ccv ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    maxLength={4}
                  />
                  {errors.ccv && <span className="text-red-600 text-sm">{errors.ccv}</span>}
                </div>
              </div>

              {/* Security Info */}
              <Alert className="bg-gray-50 border border-gray-200">
                <Shield className="h-4 w-4 text-gray-600" />
                <AlertDescription className="text-gray-700 text-sm">
                  Tu información está protegida con encriptación SSL
                </AlertDescription>
              </Alert>

              {/* Pay Button */}
              <Button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full py-4 px-6 font-medium text-base transition-all duration-200 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed opacity-70"
                    : "bg-gray-900 hover:bg-black active:bg-gray-800"
                } text-white`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Procesando Pago...
                  </div>
                ) : (
                  `Pagar S/ ${(totalAmount * 1.05).toFixed(2)}`
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Success Section */}
        {paymentData && (
          <div className="mt-8 space-y-6">
            <Alert className="bg-gray-50 border-2 border-gray-300">
              <CheckCircle className="h-5 w-5 text-gray-700" />
              <AlertDescription className="text-center">
                <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-4">Pago Procesado Exitosamente</h2>
                <p className="text-gray-700 text-sm sm:text-base">
                  Tu compra ha sido confirmada. Recibirás un email con los detalles.
                </p>
              </AlertDescription>
            </Alert>

            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-base sm:text-lg font-medium text-gray-900">
                  Detalles de la Transacción
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-gray-900 text-gray-100 p-6 rounded-sm text-sm overflow-x-auto font-mono">
                  <pre className="whitespace-pre-wrap break-words">{JSON.stringify(paymentData, null, 2)}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

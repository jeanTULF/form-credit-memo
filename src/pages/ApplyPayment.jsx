"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@/lib/utils"




 function ApplyPayment({ activities, onApplyPayment }) {
  const [sourceActivityId, setSourceActivityId] = useState("")
  const [sourceActivity, setSourceActivity] = useState(null)
  const [availableAmount, setAvailableAmount] = useState(0)
  const [distributions, setDistributions] = useState([])
  const [referencia, setReferencia] = useState(`VM.Inv-${Date.now().toString().slice(-6)}`)
  const [metodo, setMetodo] = useState("Transferencia")
  const [recentPayments, setRecentPayments] = useState([])

  // Filter activities with saldo > 0 for source selection
  /* const activitiesWithSaldo = activities.filter((a) => a.saldo > 0) */

  // Update source activity when selection changes
 /*  useEffect(() => {
    if (sourceActivityId) {
      const activity = activities.find((a) => a.id === sourceActivityId) || null
      setSourceActivity(activity)
      if (activity) {
        setAvailableAmount(activity.saldo)
      } else {
        setAvailableAmount(0)
      }
      // Reset distributions when source changes
      setDistributions([])
    } else {
      setSourceActivity(null)
      setAvailableAmount(0)
    }
  }, [sourceActivityId, activities]) */

  // Generate recent payments list
  /* useEffect(() => {
    const allPayments = []

    activities.forEach((activity) => {
      if (activity.pagos && activity.pagos.length > 0) {
        activity.pagos.forEach((payment) => {
          allPayments.push({
            activity,
            payment,
          })
        })
      }
    })

    // Sort by date (most recent first) and take the 10 most recent
    const sorted = allPayments
      .sort((a, b) => new Date(b.payment.fecha).getTime() - new Date(a.payment.fecha).getTime())
      .slice(0, 10)

    setRecentPayments(sorted)
  }, [activities]) */

  // Add a new payment distribution
  const addDistribution = () => {
    if (!sourceActivity || availableAmount <= 0) return

    setDistributions([
      ...distributions,
      {
        activityId: "",
        monto: 0,
        referencia: referencia,
        metodo: metodo,
        notas: "",
      },
    ])
  }

  // Remove a payment distribution
  const removeDistribution = (index) => {
    const newDistributions = [...distributions]
    const removedAmount = newDistributions[index].monto
    newDistributions.splice(index, 1)
    setDistributions(newDistributions)
    setAvailableAmount(availableAmount + removedAmount)
  }

  // Update a payment distribution
  const updateDistribution = (index, field, value) => {
    const newDistributions = [...distributions]

    // If updating the amount, calculate the difference and update available amount
    if (field === "monto") {
      const oldAmount = newDistributions[index].monto
      const newAmount = typeof value === "string" ? Number.parseFloat(value) : value

      // Validate that the new amount doesn't exceed available amount
      const difference = newAmount - oldAmount
      if (difference > availableAmount) {
        // If exceeds, set to maximum available
        newDistributions[index].monto = oldAmount + availableAmount
        setAvailableAmount(0)
      } else {
        newDistributions[index].monto = newAmount
        setAvailableAmount(availableAmount - difference)
      }
    } else {
      // @ts-ignore - We know the field exists
      newDistributions[index][field] = value
    }

    setDistributions(newDistributions)
  }

  // Apply all payments
  const handleApplyPayment = () => {
    if (!sourceActivityId) {
      alert("Por favor seleccione una actividad origen.")
      return
    }

    // Validate that all distributions have an activity selected and amount > 0
    /* const isValid = distributions.every(
      (d) => d.activityId && d.monto > 0 && d.referencia.trim() !== "" && d.metodo.trim() !== "",
    ) */

    if (!isValid || distributions.length === 0) {
      alert("Por favor complete todos los campos requeridos para cada pago.")
      return
    }

    onApplyPayment(sourceActivityId, distributions)

    // Reset form after successful payment
    setDistributions([])
    setReferencia(`VM.Inv-${Date.now().toString().slice(-6)}`)

    // Update available amount
    if (sourceActivity) {
      const updatedSourceActivity = activities.find((a) => a.id === sourceActivityId)
      if (updatedSourceActivity) {
        setAvailableAmount(updatedSourceActivity.saldo)
        setSourceActivity(updatedSourceActivity)
      }
    }
  }

  // Calculate total amount being distributed
  const totalDistributed = distributions.reduce((sum, d) => sum + d.monto, 0)

  // Filter activities that have saldo > 0 for target selection
  /* const applicableActivities = activities.filter((a) => a.saldo > 0) */
  return (
    <div className='flex flex-col p-10 w-full gap-8'>
      <h1 className="text-2xl font-bold tracking-tight self-center">Aplicación de Pagos</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Aplicar Nuevo Pago</CardTitle>
              <CardDescription>Seleccione una actividad origen y distribuya el pago</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sourceActivity">Actividad Origen</Label>
                  <Select value={sourceActivityId} onValueChange={setSourceActivityId}>
                    <SelectTrigger id="sourceActivity">
                      <SelectValue placeholder="Seleccionar actividad con saldo" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* {activitiesWithSaldo.length > 0 ? (
                        activitiesWithSaldo.map((activity) => (
                          <SelectItem key={activity.id} value={activity.id}>
                            {activity.numero} - {activity.contrato} ({formatCurrency(activity.saldo)})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No hay actividades con saldo disponible
                        </SelectItem>
                      )} */}
                    </SelectContent>
                  </Select>

                  {sourceActivity && (
                    <div className="mt-2 text-sm">
                      <div>
                        <span className="font-medium">Contrato:</span> {sourceActivity.contrato}
                      </div>
                      <div>
                        <span className="font-medium">Proyecto:</span> {sourceActivity.proyecto}
                      </div>
                      <div>
                        <span className="font-medium">Saldo disponible:</span> {formatCurrency(availableAmount)}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="referencia">Referencia de Pago</Label>
                    <Input
                      id="referencia"
                      value={referencia}
                      onChange={(e) => setReferencia(e.target.value)}
                      placeholder="Número de referencia"
                    />
                  </div>

                  <div>
                    <Label htmlFor="metodo">Método de Pago</Label>
                    <Select value={metodo} onValueChange={setMetodo}>
                      <SelectTrigger id="metodo">
                        <SelectValue placeholder="Seleccionar método" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Transferencia">Transferencia</SelectItem>
                        <SelectItem value="Cheque">Cheque</SelectItem>
                        <SelectItem value="Efectivo">Efectivo</SelectItem>
                        <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Distribución de Pago</h3>
                  <p className="text-sm text-muted-foreground">Monto disponible: {formatCurrency(availableAmount)}</p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={addDistribution}
                  disabled={!sourceActivity || availableAmount <= 0}
                >
                  <Plus className="h-4 w-4 mr-1" /> Agregar Distribución
                </Button>
              </div>

              {distributions.length > 0 ? (
                <div className="space-y-4">
                  {distributions.map((distribution, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-sm font-medium">Distribución #{index + 1}</h4>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeDistribution(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`activity-${index}`}>Actividad Destino</Label>
                            <Select
                              value={distribution.activityId}
                              onValueChange={(value) => updateDistribution(index, "activityId", value)}
                            >
                              <SelectTrigger id={`activity-${index}`}>
                                <SelectValue placeholder="Seleccionar actividad" />
                              </SelectTrigger>
                              <SelectContent>
                                {applicableActivities.map((activity) => (
                                  <SelectItem key={activity.id} value={activity.id}>
                                    {activity.numero} - {formatCurrency(activity.saldo)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor={`amount-${index}`}>Monto a Aplicar</Label>
                            <Input
                              id={`amount-${index}`}
                              type="number"
                              min="0"
                              max={distribution.monto + availableAmount}
                              step="0.01"
                              value={distribution.monto}
                              onChange={(e) =>
                                updateDistribution(index, "monto", Number.parseFloat(e.target.value) || 0)
                              }
                            />
                          </div>

                          <div className="md:col-span-2">
                            <Label htmlFor={`notes-${index}`}>Notas</Label>
                            <Textarea
                              id={`notes-${index}`}
                              value={distribution.notas}
                              onChange={(e) => updateDistribution(index, "notas", e.target.value)}
                              placeholder="Detalles adicionales sobre este pago"
                              rows={2}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="flex justify-between items-center p-4 bg-muted rounded-md">
                    <div>
                      <span className="text-sm font-medium">Total a aplicar:</span>
                    </div>
                    <div className="text-lg font-bold">{formatCurrency(totalDistributed)}</div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleApplyPayment}
                      disabled={distributions.length === 0 || totalDistributed === 0}
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Aplicar Pagos
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground border border-dashed rounded-md">
                  {sourceActivity
                    ? 'Haga clic en "Agregar Distribución" para comenzar a aplicar pagos'
                    : "Seleccione una actividad origen para comenzar"}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Pagos Recientes</CardTitle>
              <CardDescription>Últimos pagos registrados en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              {recentPayments.length > 0 ? (
                <div className="space-y-3">
                  {recentPayments.map((item, index) => (
                    <div key={index} className="border rounded-md p-3 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="outline">{item.activity.numero}</Badge>
                          <div className="text-sm font-medium mt-1">{formatCurrency(item.payment.monto)}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{formatDate(new Date(item.payment.fecha))}</div>
                      </div>
                      <div className="text-xs">
                        <span className="font-medium">Ref:</span> {item.payment.referencia} |
                        <span className="font-medium"> Método:</span> {item.payment.metodo}
                      </div>
                      {item.payment.notas && <div className="text-xs text-muted-foreground">{item.payment.notas}</div>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">No hay pagos registrados en el sistema</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ApplyPayment
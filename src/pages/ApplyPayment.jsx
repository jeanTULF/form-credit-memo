"use client"

import { useState, useEffect } from "react"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@/lib/utils"
import { useActivitiesStore } from "@/store/store"
import { toast } from "sonner"

const ApplyPayment = () => {
  const activities = useActivitiesStore((state) => state.activities)
  const applyPayment = useActivitiesStore((state) => state.applyPayment)

  const [sourceActivityId, setSourceActivityId] = useState("")
  const [sourceActivity, setSourceActivity] = useState(null)
  const [availableAmount, setAvailableAmount] = useState(0)
  const [distributions, setDistributions] = useState([])
  const [referenciaBase, setReferenciaBase] = useState(`VM.Inv-${Date.now().toString().slice(-6)}`)
  // const [metodo, setMetodo] = useState("ACH")
  const [recentPayments, setRecentPayments] = useState([])

  const activitiesWithSaldo = activities.filter((a) => a.saldo > 0)

  useEffect(() => {
    if (sourceActivityId) {
      const activity = activities.find((a) => a.id === sourceActivityId) || null
      setSourceActivity(activity)
      setAvailableAmount(activity ? activity.saldo : 0)
      setDistributions([])
    } else {
      setSourceActivity(null)
      setAvailableAmount(0)
    }
  }, [sourceActivityId, activities])

  useEffect(() => {
    const allPayments = []
    activities.forEach((activity) => {
      if (activity.pagos?.length > 0) {
        activity.pagos.forEach((payment) => {
          allPayments.push({ activity, payment })
        })
      }
    })
    const sorted = allPayments
      .sort((a, b) => new Date(b.payment.fecha).getTime() - new Date(a.payment.fecha).getTime())
      .slice(0, 10)
    setRecentPayments(sorted)
  }, [activities])

  const addDistribution = () => {
    if (!sourceActivity || availableAmount <= 0) return
    setDistributions([
      ...distributions,
      {
        monto: 0,
        referencia: referenciaBase,
        metodo: "",
        notas: "",
      },
    ])
  }

  const removeDistribution = (index) => {
    const newDistributions = [...distributions]
    const removedAmount = newDistributions[index].monto
    newDistributions.splice(index, 1)
    setDistributions(newDistributions)
    setAvailableAmount(availableAmount + removedAmount)
  }

  const updateDistribution = (index, field, value) => {
    const newDistributions = [...distributions]
    if (field === "monto") {
      const oldAmount = newDistributions[index].monto
      const newAmount = typeof value === "string" ? parseFloat(value) || 0 : value
      const difference = newAmount - oldAmount
      if (difference > availableAmount) {
        newDistributions[index].monto = oldAmount + availableAmount
        setAvailableAmount(0)
      } else {
        newDistributions[index].monto = newAmount
        setAvailableAmount(availableAmount - difference)
      }
    } else {
      newDistributions[index][field] = value
    }
    setDistributions(newDistributions)
  }

  const handleApplyPayment = () => {
    if (!sourceActivityId) {
      alert("Seleccione una actividad origen.")
      return
    }
    const isValid = distributions.every(
      (d) => d.monto > 0 && d.referencia.trim() !== "" && d.metodo.trim() !== ""
    )
    if (!isValid || distributions.length === 0) {
      alert("Complete todos los campos de las distribuciones.")
      return
    }

    applyPayment(sourceActivityId, distributions)
    toast("Payment applied successfully")

    setDistributions([])
    setReferenciaBase(`VM.Inv-${Date.now().toString().slice(-6)}`)

    const updatedSource = activities.find((a) => a.id === sourceActivityId)
    if (updatedSource) {
      setAvailableAmount(updatedSource.saldo)
      setSourceActivity(updatedSource)
    }
  }

  const totalDistributed = distributions.reduce((sum, d) => sum + d.monto, 0)

  return (
    <div className='flex flex-col p-10 w-full gap-8'>
      <h1 className="text-2xl font-bold tracking-tight self-center">Payment apply</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Apply new jma payment</CardTitle>
              <CardDescription>Seleccione una actividad y aplique múltiples distribuciones.</CardDescription>
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
                      {activitiesWithSaldo.length > 0 ? (
                        activitiesWithSaldo.map((activity) => (
                          <SelectItem key={activity.id} value={activity.id}>
                            {activity.numero} - {activity.contrato} ({formatCurrency(activity.saldo)})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No hay actividades con saldo disponible
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>

                  {sourceActivity && (
                    <div className="mt-2 text-sm">
                      <div><span className="font-medium">Contrato:</span> {sourceActivity.contrato}</div>
                      <div><span className="font-medium">Proyecto:</span> {sourceActivity.proyecto}</div>
                      <div><span className="font-medium">Saldo disponible:</span> {formatCurrency(availableAmount)}</div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="referencia">Payment inv. reference</Label>
                    <Input
                      id="referencia"
                      value={referenciaBase}
                      onChange={(e) => setReferenciaBase(e.target.value)}
                      placeholder="Número de referencia"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Payment distribution</h3>
                  <p className="text-sm text-muted-foreground">Available: {formatCurrency(availableAmount)}</p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={addDistribution}
                  disabled={!sourceActivity || availableAmount <= 0}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add distribution
                </Button>
              </div>

              {distributions.length > 0 ? (
                <div className="space-y-4">
                  {distributions.map((distribution, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-medium">Distribution #{index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDistribution(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`amount-${index}`}>Amount to apply</Label>
                            <Input
                              id={`amount-${index}`}
                              type="text"
                              min="0"
                              max={distribution.monto + availableAmount}
                              step="0.01"
                              value={distribution.monto}
                              onChange={(e) =>
                                updateDistribution(index, "monto", parseFloat(e.target.value) || 0)
                              }
                            />
                          </div>

                          <div>
                            <Label htmlFor={`notes-${index}`}>Notes</Label>
                            <Textarea
                              id={`notes-${index}`}
                              value={distribution.notas}
                              onChange={(e) => updateDistribution(index, "notas", e.target.value)}
                              placeholder="Detalles adicionales"
                              rows={2}
                            />
                          </div>

                          <div>
                            <Label htmlFor="metodo">Payment method</Label>
                            <Select
                              value={distribution.metodo}
                              onValueChange={(value) => updateDistribution(index, "metodo", value)}
                            >
                              <SelectTrigger id="metodo">
                                <SelectValue placeholder="Seleccionar método" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ACH">ACH</SelectItem>
                                <SelectItem value="CM">Credit memo</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="flex justify-between items-center p-4 bg-muted rounded-md">
                    <div className="text-sm font-medium">Total a aplicar:</div>
                    <div className="text-lg font-bold">{formatCurrency(totalDistributed)}</div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleApplyPayment}
                      disabled={distributions.length === 0 || totalDistributed === 0}
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Apply
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
          <Card className="h-screen overflow-auto">
            <CardHeader>
              <CardTitle>Last payments</CardTitle>
              <CardDescription>Recent Payments Recorded</CardDescription>
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
                        <div className="text-xs text-muted-foreground">
                          {formatDate(new Date(item.payment.fecha))}
                        </div>
                      </div>
                      <div className="text-xs">
                        <span className="font-medium">Ref:</span> {item.payment.referencia} |
                        <span className="font-medium"> Método:</span> {item.payment.metodo}
                      </div>
                      {item.payment.notas && (
                        <div className="text-xs text-muted-foreground">{item.payment.notas}</div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">No payments recorded</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ApplyPayment
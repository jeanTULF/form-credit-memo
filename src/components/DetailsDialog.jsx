"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download, Paperclip } from "lucide-react"
import { formatCurrency, formatDate, generatePDF, getStatusColor } from "@/lib/utils"

export const DetailsDialog = ({ activity, onClose }) => {

  return (
    <Dialog open={!!activity} onOpenChange={onClose} className="">
      <DialogContent className="w-screen max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalles de Actividad: {activity.numero}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="pagos">Pagos</TabsTrigger>
            <TabsTrigger value="adjuntos">Adjuntos</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Actividad</CardTitle>
                  <CardDescription>Detalles de la actividad seleccionada</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Número:</span>
                    <span>{activity.numero}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Tipo:</span>
                    <span>{activity.tipo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Proyecto:</span>
                    <span>{activity.proyecto}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Fecha:</span>
                    <span>{formatDate(activity.fecha)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Estado:</span>
                    <Badge className={getStatusColor(activity.estado)}>{activity.estado}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información Financiera</CardTitle>
                  <CardDescription>Detalles financieros de la actividad</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Contrato:</span>
                    <span>{activity.contrato}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Monto Total:</span>
                    <span className="font-semibold">{formatCurrency(activity.monto)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Saldo Restante:</span>
                    <span className="font-semibold">{formatCurrency(activity.saldo)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Pagado:</span>
                    <span className="font-semibold">{formatCurrency(activity.monto - activity.saldo)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Porcentaje Pagado:</span>
                    <span className="font-semibold">
                      {Math.round(((activity.monto - activity.saldo) / activity.monto) * 100)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pagos" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Pagos</CardTitle>
                <CardDescription>Registro de pagos aplicados a esta actividad</CardDescription>
              </CardHeader>
              <CardContent>
                {activity.pagos && activity.pagos.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Referencia</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Monto</TableHead>
                        <TableHead>Método</TableHead>
                        <TableHead>Notas</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activity.pagos.map((pago, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{pago.referencia}</TableCell>
                          <TableCell>{formatDate(new Date(pago.fecha))}</TableCell>
                          <TableCell className="text-right">{formatCurrency(pago.monto)}</TableCell>
                          <TableCell>{pago.metodo}</TableCell>
                          <TableCell>{pago.notas}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No hay pagos registrados para esta actividad
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="adjuntos" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentos Adjuntos</CardTitle>
                <CardDescription>Archivos relacionados con esta actividad</CardDescription>
              </CardHeader>
              <CardContent>
                {activity.adjuntos && activity.adjuntos.length > 0 ? (
                  <ul className="space-y-2">
                    {activity.adjuntos.map((adjunto, index) => (
                      <li key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <Paperclip className="h-4 w-4 text-muted-foreground" />
                          <span>{adjunto}</span>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Descargar</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No hay documentos adjuntos para esta actividad
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button onClick={() => generatePDF(activity)} className="gap-2">
            <FileText className="h-4 w-4" />
            Generar PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
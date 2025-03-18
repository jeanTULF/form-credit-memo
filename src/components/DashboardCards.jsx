import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import data from "@/data.json"

const DashboardCards = () => {
  return (
    <>
    <div className='my-9'>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Actividades</CardTitle>
            <CardDescription>Número total de actividades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monto Total</CardTitle>
            <CardDescription>Suma de todos los montos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
            {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
                data.reduce((sum, a) => sum + a.monto, 0),
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saldo Pendiente</CardTitle>
            <CardDescription>Total por pagar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              25
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monto Pagado</CardTitle>
            <CardDescription>Total pagado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              25
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
      
    </>
  )
}

export default DashboardCards
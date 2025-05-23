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
            <CardTitle className="text-sm font-medium">Total Records Entered</CardTitle>
            <CardDescription>Join Marketing total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">S/PO Total amount</CardTitle>
            <CardDescription>Total S/PO Amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
            {new Intl.NumberFormat("es-MX", { style: "currency", currency: "USD" }).format(
                data.reduce((sum, a) => sum + a.monto, 0),
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Not applied</CardTitle>
            <CardDescription>Not applied amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
            {new Intl.NumberFormat("es-MX", { style: "currency", currency: "USD" }).format(
                data.reduce((sum, a) => sum + a.saldo, 0),
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total applied</CardTitle>
            <CardDescription>Total pay amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
            {new Intl.NumberFormat("es-MX", { style: "currency", currency: "USD" }).format(
                data.reduce((sum, a) => sum + (a.monto - a.saldo) , 0),
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
      
    </>
  )
}

export default DashboardCards
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { DataTable } from './DataTable';
import data from "@/data.json"

const FilterActivities = () => {

    const columns = [
        "Activity N°",
        "Type",
        "Project Name",
        "S/PO Amount",
        "status"
      ];

  return (
        <div className="space-y-4">
        {/* <FilterBar activities={activities} onFilter={onFilter} /> */}

        <Card>
          <CardHeader>
            <CardTitle>Actividades y Contratos</CardTitle>
            <CardDescription>Listado de todas las actividades y contratos registrados en el sistema.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} caption="Listado de actividades recientes" />
          </CardContent>
        </Card>
      </div>
  )
}

export default FilterActivities
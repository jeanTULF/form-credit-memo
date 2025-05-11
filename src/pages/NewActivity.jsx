import ActivityForm from '@/components/ActivityForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const NewActivity = () => {
  return (
    <div className='flex flex-col p-10 w-full'>
      <h1 className="text-2xl font-bold tracking-tight">Nueva Actividad</h1>
      <Card>
        <CardHeader>
          <CardTitle>Registrar Nueva Actividad</CardTitle>
          <CardDescription>Completa el formulario para registrar una nueva actividad en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityForm /> 
        </CardContent>
      </Card>
    </div>
  )
}

export default NewActivity
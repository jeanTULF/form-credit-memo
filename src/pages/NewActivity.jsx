import ActivityForm from '@/components/ActivityForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const NewActivity = () => {
  return (
    <div className='flex flex-col p-10 w-full'>
      <h1 className="text-2xl font-bold tracking-tight">New activity</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add new activity</CardTitle>
          <CardDescription>Complete the form to register a new activity in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityForm /> 
        </CardContent>
      </Card>
    </div>
  )
}

export default NewActivity
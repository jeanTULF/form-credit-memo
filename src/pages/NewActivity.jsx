import ActivityForm from '@/components/ActivityForm'
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useActivitiesStore } from '@/store/store'

const NewActivity = () => {

  const addActivity = useActivitiesStore((state) => state.addActivity)

  const handleAddActivity = (newActivity) => {
    addActivity(newActivity)
    toast(`La actividad ${newActivity.numero} ha sido registrada exitosamente.`)
  }
  return (
    <div className="space-y-6 w-full flex flex-col p-10">
      <h1 className="text-2xl font-bold tracking-tight self-center">New activity (Join marketing)</h1>
      <Card>
        <CardHeader>
          <CardTitle>Register New Activity</CardTitle>
          <CardDescription>Fill out the form to register a new activity in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityForm onSubmit={handleAddActivity} /> 
        </CardContent>
      </Card>
    </div>
  )
}

export default NewActivity
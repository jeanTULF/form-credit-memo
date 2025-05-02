import { useActivitiesStore } from '@/store/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { DataTable } from './DataTable';
import FilterBar from './FilterBar';

const FilterActivities = () => {

  const activities = useActivitiesStore((state) => state.activities)
  const filteredActivities = useActivitiesStore((state) => state.filteredActivities)
  const setFilteredActivities = useActivitiesStore((state) => state.setFilteredActivities)

  const handleFilter = (filtered) => {
      setFilteredActivities(filtered)
  }

    const columns = [
        "Activity N°",
        "Contract N°",
        "Type",
        "Project Name",
        "S/PO Amount",
        "Excecution Date",
        "status"
      ];

  return (
        <div className="space-y-4">
        <FilterBar activities={activities} onFilter={handleFilter} />

        <Card>
          <CardHeader>
            <CardTitle>Actividades y Contratos</CardTitle>
            <CardDescription>Listado de todas las actividades y contratos registrados en el sistema.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} filteredActivities={filteredActivities}  caption="Listado de actividades recientes" />
          </CardContent>
        </Card>
      </div>
  )
}

export default FilterActivities
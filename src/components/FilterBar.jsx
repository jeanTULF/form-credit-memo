import { useState, useEffect } from "react"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

const FilterBar = ({activities, onFilter}) => {

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  /* const [dateRange, setDateRange] = useState({from, to}) */

  // Get unique values for filter dropdowns
  const types = [...new Set(activities.map((a) => a.tipo))]
  const projects = [...new Set(activities.map((a) => a.proyecto))]
  const statuses = [...new Set(activities.map((a) => a.estado))]

  // Apply filters
  useEffect(() => {
    // Skip the effect if no filter is applied yet
    if (!searchTerm && 
        !selectedType && 
        !selectedProject && 
        !selectedStatus /* && 
        !dateRange.from && !dateRange.to */) {
      return
    }

    let filtered = [...activities]

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (a) =>
          a.numero.toLowerCase().includes(term) ||
          a.contrato.toLowerCase().includes(term) ||
          a.proyecto.toLowerCase().includes(term),
      )
    }

    // Type filter
    if (selectedType && selectedType !== "all") {
      filtered = filtered.filter((a) => a.tipo === selectedType)
    }

    // Project filter
    if (selectedProject && selectedProject !== "all") {
      filtered = filtered.filter((a) => a.proyecto === selectedProject)
    }

    // Status filter
    if (selectedStatus && selectedStatus !== "all") {
      filtered = filtered.filter((a) => a.estado === selectedStatus)
    }

    // Date range filter
   /*  if (dateRange.from) {
      filtered = filtered.filter((a) => new Date(a.fecha) >= dateRange.from)
    }

    if (dateRange.to) {
      filtered = filtered.filter((a) => new Date(a.fecha) <= dateRange.to)
    } */

    onFilter(filtered)
  }, [searchTerm, selectedType, selectedProject, selectedStatus, /* dateRange */ ])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedType("")
    setSelectedProject("")
    setSelectedStatus("")
    // setDateRange({ from: undefined, to: undefined })

    // Reset to original activities
    onFilter(activities)
  }

  const clearSearchTerm = () => {
    setSearchTerm("")
    onFilter(activities)
  }
  
  const clearSelectedType = () => {
    setSelectedType("")
    onFilter(activities)
  }
  
  const clearSelectedProject = () => {
    setSelectedProject("")
    onFilter(activities)
  }
  
  const clearSelectedStatus = () => {
    setSelectedStatus("")
    onFilter(activities)
  }
  
  /* const clearDateRange = () => {
    setDateRange({ from: undefined, to: undefined })
    onFilter(activities)
  } */
  

  const hasActiveFilters =
    searchTerm || selectedType || selectedProject || selectedStatus /* dateRange.from || dateRange.to */

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por número, contrato o proyecto..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={clearFilters}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Limpiar búsqueda</span>
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Proyecto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los proyectos</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project} value={project}>
                  {project}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                <Filter className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                    </>
                  ) : (
                    formatDate(dateRange.from)
                  )
                ) : (
                  "Rango de fechas"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover> */}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtros activos:</span>
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Búsqueda: {searchTerm}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={clearSearchTerm}>
                  <X className="h-3 w-3" />
                  <span className="sr-only">Eliminar filtro</span>
                </Button>
              </Badge>
            )}

            {selectedType && (
              <Badge variant="secondary" className="gap-1">
                Tipo: {selectedType}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={clearSelectedType}>
                  <X className="h-3 w-3" />
                  <span className="sr-only">Eliminar filtro</span>
                </Button>
              </Badge>
            )}

            {selectedProject && (
              <Badge variant="secondary" className="gap-1">
                Proyecto: {selectedProject}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={clearSelectedProject}>
                  <X className="h-3 w-3" />
                  <span className="sr-only">Eliminar filtro</span>
                </Button>
              </Badge>
            )}

            {selectedStatus && (
              <Badge variant="secondary" className="gap-1">
                Estado: {selectedStatus}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={clearSelectedStatus}>
                  <X className="h-3 w-3" />
                  <span className="sr-only">Eliminar filtro</span>
                </Button>
              </Badge>
            )}

            {/* {(dateRange.from || dateRange.to) && (
              <Badge variant="secondary" className="gap-1">
                Fechas: {dateRange.from ? formatDate(dateRange.from) : "..."} -{" "}
                {dateRange.to ? formatDate(dateRange.to) : "..."}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => setDateRange({ from: undefined, to: undefined })}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Eliminar filtro</span>
                </Button>
              </Badge>
            )} */}

            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={clearFilters}>
              Limpiar todos
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterBar
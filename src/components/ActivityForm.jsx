import React, { useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useForm } from 'react-hook-form'
import { CalendarIcon, Upload, X } from 'lucide-react'
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { v4 as uuidv4 } from 'uuid'

const ActivityForm = ({onSubmit, existingActivities}) => {

  const [adjuntos, setAdjuntos] = useState([])

   // Manejar el drag and drop de archivos
   const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newAdjuntos = [...adjuntos]
      Array.from(e.dataTransfer.files).forEach((file) => {
        newAdjuntos.push(file.name)
      })
      setAdjuntos(newAdjuntos)
    }
  }

  const handleRemoveAdjunto = (index) => {
    const newAdjuntos = [...adjuntos]
    newAdjuntos.splice(index, 1)
    setAdjuntos(newAdjuntos)
  }

  const handleFormSubmit = (values) => {

    const id = `AT-${uuidv4()}`

    // Convertir el monto de string a número
    const montoNumerico = Number.parseFloat(values.monto.replace(/,/g, ""))

    // Calcular el saldo automáticamente basado en el estado
    const saldo = values.estado === "Completado" ? 0 : montoNumerico

    // Crear la nueva actividad
    const newActivity = {
      id,
      numero: values.numero,
      contrato: values.contrato,
      tipo: values.tipo,
      proyecto: values.proyecto,
      monto: montoNumerico,
      saldo: saldo,
      fecha: values.fecha,
      estado: values.estado,
      adjuntos: adjuntos,
      pagos: [], // Inicialmente sin pagos
    }

    // Enviar la nueva actividad al componente padre
    onSubmit(newActivity)
    console.log(newActivity)

    // Resetear el formulario
    form.reset()
    setAdjuntos([])
  }

    const formSchema = z.object({
      numero: z.string().min(1, "El número de actividad es requerido"),
      contrato: z.string().min(1, "El contrato es requerido"),
      tipo: z.string().min(1, "El tipo es requerido"),
      proyecto: z.string().min(1, "El proyecto es requerido"),
      monto: z
        .string()
        .min(1, "El monto es requerido")
        .refine((val) => !isNaN(Number.parseFloat(val.replace(/,/g, ""))) && Number.parseFloat(val.replace(/,/g, "")) > 0, {
          message: "El monto debe ser un número válido mayor a 0",
        }),
      fecha: z.date(),
      estado: z.string().min(1, "El estado es requerido"),
      adjuntos: z.array(z.string()).optional(),
      notas: z.string().optional(),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          numero: "",
          contrato: "",
          tipo: "",
          proyecto: "",
          monto: "",
          fecha: new Date(),
          estado: "Pendiente",
          adjuntos: [],
          notas: "",
        },
      });


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity number</FormLabel>
                  <FormControl>
                    <Input placeholder="AT23061234567" {...field} />
                  </FormControl>
                  <FormDescription>Unique ID for activity</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contrato"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract</FormLabel>
                  <FormControl>
                    <Input placeholder="Ejm: JL591230500123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select one type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="JMA">JMA</SelectItem>
                      <SelectItem value="GAR">GAR</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="proyecto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project name</FormLabel>
                  <FormControl>
                    <Input placeholder="Online Promotion - Social Media Adv." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="monto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total amount</FormLabel>
                  <FormControl>
                    <Input placeholder="$31030.00" {...field} />
                  </FormControl>
                  <FormDescription>Activity total amount in USD</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fecha"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP", { locale: es }) : <span>Select a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pendiente">Pending</SelectItem>
                      <SelectItem value="En Proceso">Processing</SelectItem>
                      <SelectItem value="Completado">Complete</SelectItem>
                      <SelectItem value="Cancelado">Executed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Si seleccionas "(placeholder)", el saldo pendiente será 0</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <FormLabel>Attached files</FormLabel>
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="rounded-full bg-primary/10 p-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Drop your files here</h3>
              <p className="text-sm text-muted-foreground">Or click here to open explorer</p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                onChange={(e) => {
                  e.preventDefault() // Prevenir comportamiento por defecto
                  if (e.target.files) {
                    const newAdjuntos = [...adjuntos]
                    Array.from(e.target.files).forEach((file) => {
                      newAdjuntos.push(file.name)
                    })
                    setAdjuntos(newAdjuntos)
                    // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
                    e.target.value = ""
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault() // Prevenir cualquier comportamiento por defecto
                  document.getElementById("file-upload")?.click()
                }}
              >
                Select files
              </Button>
            </div>
          </div>

          {adjuntos.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {adjuntos.map((adjunto, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1.5">
                      {adjunto}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => handleRemoveAdjunto(index)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <FormField
          control={form.control}
          name="notas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observations</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any extra additional information"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Cancel
          </Button>
          <Button type="submit">Add activity</Button>
        </div>
      </form>
    </Form>
  )
}

export default ActivityForm
import React from 'react'
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
import { CalendarIcon, Upload } from 'lucide-react'
import { format } from "date-fns"
import { es } from "date-fns/locale"

const ActivityForm = () => {

    const formSchema = z.object({
  numero: z.string().min(1, "Activity number is required"),
  contrato: z.string().min(1, "Contract is required"),
  tipo: z.string().min(1, "Type is required"),
  proyecto: z.string().min(1, "Project is required"),
  monto: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) =>
        !isNaN(Number.parseFloat(val.replace(/,/g, ""))) &&
        Number.parseFloat(val.replace(/,/g, "")) > 0,
      {
        message: "Amount must be a valid number greater than 0",
      }
    ),
  fecha: z.date(),
  estado: z.string().min(1, "Status is required"),
  adjuntos: z.array(z.string()).optional(),
  notas: z.string().optional(),
});

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          numero: "",
          contrato: "",
          tipo: "",
          proyecto: "",
          monto: "",
          fecha: new Date(),
          creditMemo: "",
          estado: "pending",
          adjuntos: [],
          notas: "",
        },
      });


  return (
    <Form {...form}>
      <form /* onSubmit={form.handleSubmit(handleFormSubmit)} */ className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity number</FormLabel>
                  <FormControl>
                    <Input placeholder="ACT-2023-XXX" {...field} />
                  </FormControl>
                  <FormDescription>Unique ID for the activity</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            

            <FormField
              control={form.control}
              name="fecha"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-[240px] justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
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
              name="monto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount Executed</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the amount" {...field} />
                  </FormControl>
                  <FormDescription>Executed amount for this activity</FormDescription>
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
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="jma">JMA</SelectItem>
                      <SelectItem value="pp">Price protection</SelectItem>
                      <SelectItem value="so">Sell Out</SelectItem>
                      <SelectItem value="st">Sell True</SelectItem>
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
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the client name" {...field} />
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
                  <FormLabel>Budget Approved</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the amount" {...field} />
                  </FormControl>
                  <FormDescription>Total activity budget amount</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

              

            <FormField
              control={form.control}
              name="fecha"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-[240px] justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
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
              name="proyecto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Honor CM</FormLabel>
                  <FormControl>
                    <Input placeholder="EX: HK1234567" {...field} />
                  </FormControl>
                  <FormDescription>(optional)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="pending">Confirmed pending payment from brand</SelectItem>
                      <SelectItem value="complete">Complete</SelectItem>
                      <SelectItem value="ended">Ended</SelectItem>
                      <SelectItem value="paidShare">Paid share CM with client</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>*Placeholder*</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <FormLabel>Attached</FormLabel>
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors"
            /* onDragOver={handleDragOver}
            onDrop={handleDrop} */
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="rounded-full bg-primary/10 p-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Drop your files here</h3>
              <p className="text-sm text-muted-foreground">Or click to select your file</p>
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

          {/* {adjuntos.length > 0 && (
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
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )} */}
        </div>

        <FormField
          control={form.control}
          name="notas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any additional relevant information"
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
          <Button type="submit">Add new activity</Button>
        </div>
      </form>
    </Form>
  )
}

export default ActivityForm
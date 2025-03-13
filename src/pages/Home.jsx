import CustomDatePicker from '@/components/CustomDatePicker'
import CustomInput from '@/components/CustomInput'
import TableData from '@/components/TableData'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import React from 'react'

const columns = [
    "Fecha Inicio",
    "Fecha Final",
    "Nombre del Proyecto",
    "N° Actividad",
    "N° Contrato",
    "Monto SPO",
    "Adjunto",
  ];
  
  const data = [
    {
      fechaInicio: "2025-02-02",
      fechaFinal: "2025-02-03",
      nombreProyecto: "CO-PROMOTERS",
      actividad: "AT22102800036",
      contrato: "HK2314471",
      montoSPO: "$1.00",
      adjunto: "$56,000.00",
    },
    {
      fechaInicio: "2025-03-05",
      fechaFinal: "2025-03-10",
      nombreProyecto: "NEW PROJECT",
      actividad: "AT23987700012",
      contrato: "HK2398876",
      montoSPO: "$2.50",
      adjunto: "$30,000.00",
    },
  ];

const Home = () => {
  return (
    <div className='flex flex-col p-10'>
      <Dialog>
      <DialogTrigger asChild>
          <Button className='cursor-pointer self-end'>Nueva actividad</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[320px] overflow-auto scroll-smooth">
        <DialogHeader>
          <DialogTitle>New Register</DialogTitle>
          <DialogDescription>
            Add new credit memo to list.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <Label className="">
                Fecha inicio
            </Label>
            <CustomDatePicker />
        </div>
        <div className="grid gap-4 py-4">
            <Label className="">
                Fecha fin
            </Label>
            <CustomDatePicker />
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
              <CustomInput 
                label="Project Name"
                name="pname"
                placeholder="Enter your project name"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <CustomInput 
                label="Contract Number"
                name="contractNumber"
                placeholder="Enter your contract number"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <CustomInput 
                label="SPO Amount"
                name="amount"
                placeholder="Enter your Spo Amount"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <CustomInput 
                label="Current Acceptance"
                name="currentAceptance"
                placeholder="Enter your current acceptance"
              />
          </div>
          <div className="flex gap-4">
              <Label className="text-right">PDF file</Label>
              <Input id="pdf" type="file" className="w-full" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="cursor-pointer">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>


        <TableData columns={columns} data={data} caption="Listado de actividades recientes" />
      </div>
  )
}

export default Home
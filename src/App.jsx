import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"  
import './App.css'
import { Button } from './components/ui/button'
import { Label } from './components/ui/label'
import { Input } from './components/ui/input'
import CustomInput from './components/CustomInput'
import CustomDatePicker from './components/CustomDatePicker'

function App() {

  return (
    <>
      <div className='flex flex-col p-10'>

      <Dialog>
      <DialogTrigger asChild>
          <Button className='cursor-pointer self-end'>Nueva actividad</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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


    <Table className=''>
        <TableCaption>A list of your recent activities.</TableCaption>
            <TableHeader>
                <TableRow>
                  <TableHead>Fecha Inicio</TableHead>
                  <TableHead>Fecha final</TableHead>
                  <TableHead>Nombre del proyecto</TableHead>
                  <TableHead>N° Actividad</TableHead>
                  <TableHead>N° Contrato</TableHead>
                  <TableHead>Monto SPO</TableHead>
                  <TableHead>Adjunto</TableHead>
                </TableRow>
            </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
        </TableBody> 
    </Table>
      </div>
    </>
  )
}

export default App



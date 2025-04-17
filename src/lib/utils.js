import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date instanceof Date ? date : new Date(date));
}

export const generatePDF = (item) => {
  // En una implementación real, aquí se generaría el PDF
  console.log("Generando PDF para la actividad:", item)
  alert(`Se está generando el PDF para la actividad ${item.numero}`)
}

export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "completado":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case "en proceso":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    case "pendiente":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    case "cancelado":
      return "bg-red-100 text-red-800 hover:bg-red-200"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }
}

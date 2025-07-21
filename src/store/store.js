import { create } from "zustand"
import { persist } from "zustand/middleware"
import data from "@/data.json"

export const useActivitiesStore = create(
  persist(
    (set, get) => ({
      activities: [...data],
      filteredActivities: [...data],

      addActivity: (newActivity) =>
        set((state) => {
          const updated = [newActivity, ...state.activities]
          return {
            activities: updated,
            filteredActivities: updated,
          }
        }),

      setFilteredActivities: (filtered) => set({ filteredActivities: filtered }),

      applyPayment: (activityId, distributions) => {
  const current = get().activities
  const updated = [...current]

  const idx = updated.findIndex((a) => a.id === activityId)
  if (idx === -1) return

  const totalAmount = distributions.reduce((sum, d) => sum + d.monto, 0)

  const paymentDate = new Date().toISOString()

  const nuevosPagos = distributions.map((dist) => ({
    referencia: dist.referencia,
    fecha: paymentDate,
    monto: dist.monto,
    metodo: dist.metodo,
    notas: dist.notas || "",
  }))

  updated[idx] = {
    ...updated[idx],
    pagos: [...updated[idx].pagos, ...nuevosPagos],
    saldo: updated[idx].saldo - totalAmount,
  }

  set({
    activities: updated,
    filteredActivities: updated,
  })
},
    }),
    {
      name: "activities-store",
      partialize: (state) => ({
        activities: state.activities,
        filteredActivities: state.filteredActivities,
      }),
    }
  )
)

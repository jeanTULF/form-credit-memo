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

      applyPayment: (sourceActivityId, distributions) => {
        const current = get().activities
        const updated = [...current]

        // Encuentra la actividad origen
        const sourceIdx = updated.findIndex((a) => a.id === sourceActivityId)
        if (sourceIdx === -1) return

        // Total a aplicar
        const totalAmount = distributions.reduce((sum, d) => sum + d.monto, 0)

        // Resta saldo a la actividad origen
        updated[sourceIdx] = {
          ...updated[sourceIdx],
          saldo: updated[sourceIdx].saldo - totalAmount,
        }

        const paymentDate = new Date().toISOString()

        // Aplica cada distribución
        distributions.forEach((dist) => {
          const targetIdx = updated.findIndex((a) => a.id === dist.activityId)
          if (targetIdx === -1) return

          const newPayment = {
            referencia: dist.referencia,
            fecha: paymentDate,
            monto: dist.monto,
            metodo: dist.metodo,
            notas: dist.notas || "",
          }

          updated[targetIdx] = {
            ...updated[targetIdx],
            pagos: [...updated[targetIdx].pagos, newPayment],
            saldo: updated[targetIdx].saldo - dist.monto,
          }
        })

        set({
          activities: updated,
          filteredActivities: updated, // sincroniza ambos
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

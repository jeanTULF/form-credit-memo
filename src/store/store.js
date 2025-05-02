import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import data from '@/data.json'

export const useActivitiesStore = create(persist(
  (set) => ({
    activities: [...data],
    filteredActivities: [...data],

    addActivity: (newActivity) => set((state) => {
      const updated = [newActivity, ...state.activities]
      return {
        activities: updated,
        filteredActivities: updated,
      }
    }),

    setFilteredActivities: (filtered) => set({ filteredActivities: filtered }),
  }),
  {
    name: 'activities-store', // clave para localStorage
    partialize: (state) => ({
      activities: state.activities,
      filteredActivities: state.filteredActivities,
    }),
  }
))
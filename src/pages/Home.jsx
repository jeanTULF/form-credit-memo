import DashboardCards from '@/components/DashboardCards'
import FilterActivities from '@/components/FilterActivities'
import Header from '@/components/Header'

import React from 'react'
  
  

const Home = () => {
  return (
    <div className='flex flex-col p-10 w-full'>
      <Header />
        <DashboardCards />
        <FilterActivities />
      </div>
  )
}

export default Home
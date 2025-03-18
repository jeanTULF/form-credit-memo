import React from 'react'

const Searchbar = () => {
  return (
    <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
        <div className="relative w-full max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
            type="search"
            placeholder="Buscar en el sistema..."
            className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
        />
        </div>
    </div>
  )
}

export default Searchbar
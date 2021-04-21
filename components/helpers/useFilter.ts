import { SetStateAction, useMemo, useState } from "react"
import { IData, mode } from "../table"


export function useFilter(updateData: (value: SetStateAction<IData[]>) => void) {
  const [filter, setFilter] = useState<{ mode: mode, sortedBy: string}>({ mode: 'asc', sortedBy: ''})
  
  const filterByColumn = (by: string) => {
    setFilter(f => ({
      mode: f.mode === 'asc' ? 'desc' : 'asc',
      sortedBy: by
    }))
    updateData(d => {
      return d.sort((a, b) => {
        if(filter.mode === 'asc') return a[by] - b[by]
        if(filter.mode === 'desc') return b[by] - a[by]
      })
    })
  }

  return {
    filterByColumn,
    filter
  }
}
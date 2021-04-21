import { IData } from './../table';
import { SetStateAction, useMemo, useState } from "react"

export function useSelect(data: IData[], updateData: (value: SetStateAction<IData[]>) => void) {
  const anySelected = useMemo(() => data.some(el => el.selected === true), [data])
  const [isSelectedAll, setIsSelectedAll] = useState(false)

  const toggleSelectById = (id: string) => {
    let updatedItem = data.find((el) => el.id === id)
    updateData(d => [...d.map(el => ({
        ...el,
        selected: id === el.id ? !el.selected : el.selected
    }))])
    return updatedItem
  }

  const removeSelectedItems = () => {
    const removingItems = data.filter(el => el.selected === true)
    updateData(d => [...d.filter(el => el.selected !== true)])
    setIsSelectedAll(false)
    return removingItems
  }

  const selectAll = () => {
    updateData(d => [...d.map(el => ({
        ...el,
        selected: !isSelectedAll
      }))
    ]) 
    setIsSelectedAll(s=>!s)
  }
  return {
    anySelected,
    selectAll,
    toggleSelectById,
    isSelectedAll,
    removeSelectedItems
  }   
}
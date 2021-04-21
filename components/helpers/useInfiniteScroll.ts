import { useState, useEffect, useRef } from "react"

export function useInfiniteScroll(fetchNewData: () => Promise<any>) {
  const [isFetching, setIsFething] = useState(false)
  const handleScroll = (e: Event) => {
    if (tableRef.current.scrollTop !== (tableRef.current.scrollHeight - tableRef.current.offsetHeight)) return
    setIsFething(true)
  }
  useEffect(() => {
    if(!isFetching) return
    (async () => {
      await fetchNewData()
      setIsFething(false)
    })()
  }, [isFetching])

  let tableRef = useRef<HTMLTableElement>(null)
  useEffect(() => {
    if(!tableRef.current) return
    tableRef.current.addEventListener('scroll', handleScroll)
    return () => tableRef.current.removeEventListener('scroll', handleScroll)
  }, [tableRef.current])

  return {
    tableRef,
    isFetching,
  }
}
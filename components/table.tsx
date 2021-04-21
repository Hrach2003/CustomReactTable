import { useEffect, useMemo, useRef, useState } from "react"
import { useFilter } from "./helpers/useFilter"
import { useInfiniteScroll } from "./helpers/useInfiniteScroll"
import { useSelect } from "./helpers/useSelect"

export type mode = 'asc' | 'desc'
export type IHeaders = {
  dataIndex: string,
  title: string,
  width?: number,
  sorter: boolean,
}
export type IHeadersObject = {
  [k: string]: IHeaders
}

export type IData = {
  [k: string]: any
}

export interface ICustomTable {
  data: IData[],
  headers: IHeaders[],
  onScroll: () => Promise<IData[]>
  onItemClick?: (item: IData) => any,
  onRemoveItems?: (items: IData[]) => any
  onFilter?: (by: string, mode: mode) => any,
}




export const CustomTable: React.FC<ICustomTable> = ({ data, headers, ...handlers }) => {
  const headersObject: IHeadersObject = useMemo(() => {
    return headers.reduce((obj, item) => (obj[item.dataIndex] = item, obj), {})
  }, [headers])
  const [sortedData, setSortedData] = useState<IData[]>(data)
  useEffect(() => {
    setSortedData(data)
  },[data])
  const { isSelectedAll, anySelected, selectAll, toggleSelectById, removeSelectedItems } = useSelect(sortedData, setSortedData)
  const { isFetching, tableRef, setIsFething } = useInfiniteScroll(handlers.onScroll, setSortedData)
  const { filter, filterByColumn } = useFilter(setSortedData)
  useEffect(() => {
    if(!sortedData.length) setIsFething(true)
  }, [sortedData])

  
  const handleFilter = (by: string) => {
    if (!headersObject[by].sorter) return
    if(handlers.onFilter) handlers.onFilter(by, filter.mode)
    else filterByColumn(by)
  }
  
  const handleRemoveItems = () => {
    let removingItems = removeSelectedItems()
    if(handlers.onRemoveItems) handlers.onRemoveItems(removingItems)
  }
  
  const handleItemClick = (id: string) => {
    let item: IData = toggleSelectById(id)
    if(handlers.onItemClick) handlers.onItemClick(item)
  }
  
  const arrow = useMemo(() => filter.mode === 'asc' ? <i aria-hidden className="fas fa-chevron-up"></i> : <i aria-hidden className="fas fa-chevron-down"></i>, [filter.mode])
  return (
    <>
      <div ref={tableRef} className="w-10/12 h-5/6 overflow-y-scroll mx-auto shadow-2xl pb-3 rounded-md bg-gray-200 text-gray-900  ">
        <table className="w-full h-20 table-auto relative">
          <thead>
              <tr>
                <th className="group cursor-pointer sticky top-0 bg-gray-300 flex flex-col items-center justify-center space-y-2 h-full">
                  <input name="select-all" id="select-all" checked={isSelectedAll} onChange={selectAll} type="checkbox" className="rounded-sm border-2 h-6 w-6 border-indigo-300"></input>
                  <button disabled={!anySelected} onClick={handleRemoveItems} className="focus:outline-none disabled:bg-gray-400 bg-red-600 focus:ring-2 ring-red-600 ring-offset-2   ring-opacity-50 text-white h-6 w-6 text-sm rounded" >
                    <i className="fas fa-trash-alt" aria-hidden></i>
                  </button>
                </th>
                {headers.map((h, idx) => (
                  <th 
                    className="group cursor-pointer py-4 sticky top-0 bg-gray-300" 
                    onClick={() => handleFilter(h.dataIndex)} 
                    key={idx}
                  >
                    <button className="w-10/12 focus:outline-none group-hover:bg-white mx-auto flex items-center justify-center py-2 focus:ring-2 ring-offset-1  ring-offset-indigo-300 bg-gray-100 rounded-lg">
                      {h.title}
                      <span className={`font-extrabold text-sm pl-2 ${filter.sortedBy !== h.dataIndex ? 'invisible' : 'visible'}`}>{arrow}</span>
                    </button>
                  </th>
                ))}
              </tr>
          </thead>
          <tbody>
              {sortedData.map((row) => (
                <tr className="group hover:bg-gray-50 hover:shadow-lg cursor-pointer" onClick={() => handleItemClick(row.id)} key={row.id}>
                  <td className=" w-16 text-center">
                    <input name="select" id={row.id} onChange={() => {}} checked={row.selected} type="checkbox" className="rounded-sm border-2 h-4 w-4 border-indigo-300"></input>
                  </td>
                  {Object.keys(headersObject).map((dataIndex) => (
                    <td className="py-2 px-3" key={`${row.id} ${dataIndex}`}>{row[dataIndex]}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>  
        {isFetching && <p className="text-center">Loading...</p>}
      </div>
      <p className="mt-3">{sortedData.length} items</p>
    </>
  )
}

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Custom table API
```javascript
 <CustomTable
    headers: Array<{
                    dataIndex: string,
                    title: string,
                    sorter: true | false
             }>
    data: Array<{}>
    onScroll: Function
    onItemClick?: (item: Object) => any
    onFilter?: (mode: 'asc' | 'desc') => any
    onRemoveItems?: (items: Array<Object>) => any
  />
```

- `data` - the provided data (array of objects). Each key in object should be in the `dataIndex` field in the `headers`
- `headers` - the list of table columns (array of objects). Each of them should be an object with following fields
  - `dataIndex` - the way to find an item from `data`
  - `sorter` - depends on value the column should be able to be sorted in `'asc'` | `'desc'` mode
- `onScroll` - callback, which fires when a table has reached the bottom. It should return new data
- `onItemClick` - *optional*. Function will be called when an item is clicked (selected or unselected)
- `onFilter` - *optional*. Will be called when table column title is clicked and for the column `sorter` is `true`, otherwise will sort by `'asc'` or `'desc'` modes.
- `onRemoveItems` - *optional*. Calling this function after removing selected items



## Check live demo [here](https://custom-react-table.vercel.app/)

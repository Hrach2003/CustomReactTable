import Head from "next/head";
import { CustomTable } from "../components/table";
import { v4 as uuidv4 } from 'uuid';

const headers = [
  {
    "dataIndex": "name",
    "title": "Name",
    "sorter": false
  },
  {
    "dataIndex": "rating",
    "title": "Rating",
    "sorter": true
  },
  {
    "dataIndex": "forks",
    "title": "Fork",
    "sorter": true
  },
  {
    "dataIndex": "totalProjects",
    "title": "Total Projects",
    "sorter": true
  }
]    


function generateRandomData(len = 40) {
  const names = [
    "Jermaine Edwards",
    "Marshall Chavez",
    "Bradley Gonzalez",
    "Hashim Rutledge",
    "Orlando Noel",
    "Honorato Adams",
    "Blake Delgado",
    "Amir Franks",
    "Wing Barber",
  ]
  return Array(len).fill({}).map(_ => ({
    name: names[Math.floor(Math.random() * names.length)],
    rating: Math.floor(Math.random() * 100),
    forks: Math.floor(Math.random() * 1000),
    totalProjects: Math.floor(Math.random() * 20),
    id: uuidv4(),
    selected: false
  }))
}

export const getStaticProps = () => {
  return {
    props: {
      data: generateRandomData()
    }
  }
}

export default function Home({ data }) {
  const loadMore = async () => {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
    await delay(1000)
    return generateRandomData()
  }  
  return <div className="h-screen bg-white flex items-center justify-center flex-col">
    <Head>
      <script src="https://kit.fontawesome.com/fb17d09cb6.js" crossOrigin="anonymous"></script>
    </Head>
    <CustomTable 
      data={data} 
      headers={headers} 
      onScroll={loadMore} 
      onItemClick={console.log}
      onRemoveItems={console.log}
    />  
  </div>;
}

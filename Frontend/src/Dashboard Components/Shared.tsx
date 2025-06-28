import DashBoard from './DashBoard';
import axios from "../utils/token";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import { useParams } from 'react-router';

const Shared = () => {
    const { hash } = useParams(); 
    const [data,setData] = useState([])
    useEffect(()=>{
        async function getData() {
            const res = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`)
            setData(res.data.content)
        }
        getData()
    },[hash])

  return (
    <div>
      <DashBoard shared={true} data={data}/>
    </div>
  )
}

export default Shared

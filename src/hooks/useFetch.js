import { useEffect, useState } from "react"
import axios from "axios"


// directData variable because the response 
// is coming without results array in details page

const useFetch = (endPoint,directData = false) => {
    const [data, setData] = useState([])

    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await axios.get(endPoint)
            setLoading(false)

            directData ? setData(res.data) : setData(res.data.results)
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [endPoint])

    return {data, loading}
}


export default useFetch
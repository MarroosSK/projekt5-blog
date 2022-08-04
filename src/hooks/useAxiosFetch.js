import { useState, useEffect } from "react";
import axios from "axios"

const useAxiosFetch = (dataUrl) =>{
    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) =>{
            setIsLoading(true);

            try{
                // response obsahuje url a cancel token vo forme objektu
                const response = await axios.get(url, {
                        cancelToken : source.token
                })

                if (isMounted){
                    setData(response.data)
                    setFetchError(null)
                }

            } catch (err){
                
                if (isMounted){
                
                    setFetchError(err.message)
                    // data formou empty array, lebo mame error
                    setData([])
                }
            } finally{
                isMounted && setTimeout(()=>{
                    setIsLoading(false)
                }, 2000)
            }
        }

        fetchData(dataUrl)

        // cleanUp funkcia - zmaze effect, proti memory Leak
        const cleanUp = () =>{
            isMounted=false
            source.cancel()
        }

        return cleanUp;
    }, [dataUrl])

    return {data, fetchError, isLoading}
}

export default useAxiosFetch
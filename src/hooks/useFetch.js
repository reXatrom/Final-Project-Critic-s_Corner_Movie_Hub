import { useEffect, useState } from "react";
import { omdbAxios } from '../index'; // Adjust the path if needed

const useFetch = (params) => {
  const [data, setData] = useState([]); // OMDb returns Search array for search
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // OMDb expects query params, so params is an object here
        const response = await omdbAxios.get('', { params });
        setLoading(false);

        // If response includes Search array, use it; else empty array
        setData(response.data.Search || []);
      } catch (error) {
        console.log('error', error);
        setLoading(false);
      }
    };
    if(params) fetchData();
  }, [params]);

  return { data, loading };
};

export default useFetch;

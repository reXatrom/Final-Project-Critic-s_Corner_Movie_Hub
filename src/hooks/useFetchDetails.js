import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const useFetchDetails = (queryParams) => {
  
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/?${queryParams}&apikey=${API_KEY}`);
        setLoading(false);
        setData(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    if (queryParams) fetchData();
  }, [queryParams]);

  return { data, loading };
};

export default useFetchDetails;

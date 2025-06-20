import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Cards from '../components/Cards'

const API_KEY = process.env.REACT_APP_OMDB_API_KEY  // make sure you add your key in .env

const ExplorePage = () => {
  const { explore } = useParams()
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const [totalResults, setTotalResults] = useState(0)

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/`, {
        params: {
          apikey: API_KEY,
          s: explore,
          type: explore === 'movie' ? 'movie' : 'series',  // adjust as needed
          page: pageNo,
        }
      })

      if(response.data.Response === "True"){
        setData(prev => [...prev, ...response.data.Search])
        setTotalResults(Number(response.data.totalResults))
      } else {
        console.error("OMDB Error:", response.data.Error)
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [explore, pageNo])

  // Infinite scroll handler
  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (data.length < totalResults) {
        setPageNo(prev => prev + 1)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    setPageNo(1)
    setData([])
  }, [explore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [data, totalResults])

  return (
    <div className='py-16'>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Popular {explore} shows</h3>

        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
          {
            data.map((item, index) => (
              <Cards key={item.imdbID} data={item} media_type={explore} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ExplorePage

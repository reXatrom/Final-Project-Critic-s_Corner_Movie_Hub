import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cards from '../components/Cards';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const query = new URLSearchParams(location.search).get('q');

  const fetchData = React.useCallback(async () => {
    if (!query) return;

    try {
      const response = await axios.get(`?apikey=${API_KEY}&s=${query}&page=${page}`);
      if(response.data.Search) {
        setData((prev) => [...prev, ...response.data.Search]);
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [query, page]);

  useEffect(() => {
    if (query) {
      setPage(1);
      setData([]);
      fetchData();
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [page, fetchData]);

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='py-16'>
      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input
          type='text'
          placeholder='Search here...'
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={query || ''}
          className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900 '
        />
      </div>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h3>
        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
          {data.map((item, index) => (
            <Cards data={item} key={item.imdbID + index} media_type={item.Type} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

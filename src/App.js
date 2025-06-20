import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBannerData } from './store/MovieSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        // OMDb does not have a "trending" endpoint.
        // You can do a search query instead; example: "batman"
        const response = await axios.get(`/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=batman&type=movie`);
        
        // OMDb returns data.Search array with movie results
        if (response.data && response.data.Search) {
          dispatch(setBannerData(response.data.Search));
        } else {
          dispatch(setBannerData([]));
        }
      } catch (error) {
        console.log("error", error);
        dispatch(setBannerData([]));
      }
    };

    fetchTrendingData();
  }, [dispatch]);

  return (
    <main className='pb-14 lg:pb-0'>
        <Header/>
        <div className='min-h-[90vh]'>
            <Outlet/>
        </div>
        <Footer/>
        <MobileNav/>
    </main>
  );
}

export default App;

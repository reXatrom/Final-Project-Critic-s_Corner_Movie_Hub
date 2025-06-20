import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Divider from '../components/Divider';
import VideoPlay from '../components/VideoPlay';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const DetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`?apikey=${API_KEY}&i=${id}&plot=full`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log('error', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handlePlayVideo = () => {
    setPlayVideo(true);
    setPlayVideoId(id); // Or whatever logic you want
  };

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No details found.</p>;

  return (
    <div>
      <div className='container mx-auto px-3 py-16'>
        <div className='flex flex-col lg:flex-row gap-5'>
          <img
            src={data.Poster !== "N/A" ? data.Poster : "/placeholder.png"}
            alt={data.Title}
            className='h-80 w-60 object-cover rounded'
          />
          <div>
            <h2 className='text-2xl lg:text-4xl font-bold text-white'>{data.Title}</h2>
            <p className='text-neutral-400'>{data.Plot}</p>

            <Divider />

            <div className='flex items-center gap-3'>
              <p>Rating: {data.imdbRating}</p>
              <span>|</span>
              <p>Released: {data.Released}</p>
              <span>|</span>
              <p>Runtime: {data.Runtime}</p>
            </div>

            <Divider />

            <button
              onClick={handlePlayVideo}
              className='mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'
            >
              Play Now
            </button>
          </div>
        </div>
      </div>

      {/* Add horizontal cards if you want to show similar/recommended, but OMDB doesn't provide that directly */}

      {playVideo && <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} />}
    </div>
  );
};

export default DetailsPage;

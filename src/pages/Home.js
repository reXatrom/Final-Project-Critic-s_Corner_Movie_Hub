import React from 'react';
import HomeBanner from '../components/HomeBanner';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import useFetch from '../hooks/useFetch';

const Home = () => {
  const { data: trendingData } = useFetch(`?s=avengers&type=movie`);
  const { data: nowPlayingData } = useFetch(`?s=avengers&type=movie&y=2023`); // example for recent movies
  const { data: topRatedData } = useFetch(`?s=godfather&type=movie`);
  const { data: popularTvShowData } = useFetch(`?s=friends&type=series`);
  const { data: onTheAirShowData } = useFetch(`?s=breaking bad&type=series`);

  return (
    <div>
      <HomeBanner data={trendingData} />
      <HorizontalScrollCard data={trendingData} heading={"Trending"} />
      <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} />
      <HorizontalScrollCard data={topRatedData} heading={"Top Rated Movies"} />
      <HorizontalScrollCard data={popularTvShowData} heading={"Popular TV Shows"} />
      <HorizontalScrollCard data={onTheAirShowData} heading={"On The Air"} />
    </div>
  );
};

export default Home;

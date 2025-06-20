import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({ data, trending, index }) => {
  return (
    <Link
      to={"/movie/" + data.imdbID}
      className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all"
    >
      {
        data?.Poster && data.Poster !== "N/A" ? (
          <img
            src={data.Poster}
            alt={data.Title || "Movie Poster"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-neutral-800 h-full w-full flex justify-center items-center text-white">
            No image found
          </div>
        )
      }

      <div className="absolute top-4">
        {
          trending && (
            <div className="py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden text-white">
              #{index} Trending
            </div>
          )
        }
      </div>

      <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2 text-white">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">{data.Title}</h2>
        <div className="text-sm text-neutral-400 flex justify-between items-center">
          <p>{data.Year}</p>
          <p className="bg-black px-1 rounded-full text-xs text-white">
            Rating: {data.imdbRating && data.imdbRating !== "N/A" ? data.imdbRating : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Cards;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const HomeBanner = () => {
    const bannerData = useSelector(state => state.MovieData?.bannerData || []);
    const [currentImage, setCurrentImage] = useState(0);

    const handleNext = React.useCallback(() => {
        if(currentImage < bannerData.length - 1){
            setCurrentImage(prev => prev + 1);
        }
    }, [currentImage, bannerData.length]);

    const handlePrevious = () => {
        if(currentImage > 0){
            setCurrentImage(prev => prev - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if(currentImage < bannerData.length - 1){
                handleNext();
            } else {
                setCurrentImage(0);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [bannerData, currentImage, handleNext]);

    return (
        <section className='w-full h-full'>
            <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
                {
                    bannerData.map((data, index) => {
                        return (
                            <div
                                key={data.imdbID + "_bannerHome_" + index}
                                className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all'
                                style={{ transform: `translateX(-${currentImage * 100}%)` }}
                            >
                                <div className='w-full h-full'>
                                    <img
                                        src={data.Poster !== "N/A" ? data.Poster : "/placeholder.png"}
                                        alt={data.Title}
                                        className='h-full w-full object-cover'
                                    />
                                </div>

                                {/* Buttons */}
                                <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex'>
                                    <button onClick={handlePrevious} className='bg-white p-1 rounded-full text-xl z-10 text-black'>
                                        <FaAngleLeft />
                                    </button>
                                    <button onClick={handleNext} className='bg-white p-1 rounded-full text-xl z-10 text-black'>
                                        <FaAngleRight />
                                    </button>
                                </div>

                                <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>

                                <div className='container mx-auto'>
                                    <div className='w-full absolute bottom-0 max-w-md px-3'>
                                        <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>{data.Title}</h2>
                                        <p className='text-ellipsis line-clamp-3 my-2'>{data.Plot !== "N/A" ? data.Plot : "No description available."}</p>
                                        {/* Rating and popularity not available from OMDb here, so omitted */}
                                        <Link to={"/movie/" + data.imdbID}>
                                            <button className='bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                                                View Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
}

export default HomeBanner;

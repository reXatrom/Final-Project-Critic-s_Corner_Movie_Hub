import React, { useRef } from 'react';
import Cards from './Cards';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const HorizontalScrollCard = ({ data = [], heading }) => {
    const containerRef = useRef();

    const handleNext = () => {
        containerRef.current.scrollLeft += 300;
    };

    const handlePrevious = () => {
        containerRef.current.scrollLeft -= 300;
    };

    return (
        <div className='container mx-auto px-3 my-10'>
            <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>{heading}</h2>

            <div className='relative'>
                <div
                    ref={containerRef}
                    className='grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-x-scroll scrollbar-none scroll-smooth relative z-10 transition-all'
                >
                    {
                        data.map((item, index) => (
                            <Cards
                                key={item.imdbID + "_heading_" + index}
                                data={item}
                                index={index + 1}
                            />
                        ))
                    }
                </div>

                <div className='absolute top-0 hidden lg:flex justify-between w-full h-full items-center'>
                    <button onClick={handlePrevious} className='bg-white p-1 text-black rounded-full -ml-2 z-10'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleNext} className='bg-white p-1 text-black rounded-full -mr-2 z-10'>
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HorizontalScrollCard;

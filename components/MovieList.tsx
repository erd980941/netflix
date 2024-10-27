import React from 'react'

import { isEmpty } from 'lodash'
import MovieCard from './MovieCard';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface MovieListProps {
    data: any[];
    title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {

    if (isEmpty(data)) {
        return null;
    }

    return (
        <div className='px-4 space-y-6' >
            <div className='' >
                <p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-5 mt-5' >{title}</p>
                <div className=' gap-2' >
                        <Swiper
                            watchSlidesProgress={true} 
                            slidesPerView={2}
                            spaceBetween={10}

                            breakpoints={{
                                640: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                                768: {
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 6,
                                    spaceBetween: 20,
                                },
                            }}
                            className="h-72"
                        >
                            {data.map((movie) => (
                                <SwiperSlide key={movie.id} className=' hover:scale-[1-7]' >
                                    <MovieCard data={movie} key={movie.id} ></MovieCard>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                </div>
            </div>
        </div>
    )
}

export default MovieList
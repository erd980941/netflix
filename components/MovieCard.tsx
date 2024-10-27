import React, { useCallback } from 'react'
import { PlayIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import FavoriButton from './FavoriButton';
import { useRouter } from 'next/router';
import useInfoModalStore from '@/hooks/useInfoModalStore';

interface MovieCardProp {
    data: any;
}

const MovieCard: React.FC<MovieCardProp> = ({ data }) => {

    const router = useRouter();

    const {openModal} = useInfoModalStore();


    const redirectToWatch = useCallback(()=>router.push(`/watch/${data.id}`),[router,data.id])

    return (
        <div className='group bg-zinc-800 col-span-1 relative h-52' >
            <img onClick={redirectToWatch} src={data.thumbnailUrl}
                className='h-52 
                w-full 
                object-cover 
                cursor-pointer
                rounded-lg
                shadow-xl
                group-hover:opacity-85
                '  alt="" />

            <div className='z-10 w-full opacity-0 group-hover:opacity-100 absolute top-0 scale-0 group-hover:scale-105 invisible sm:visible' >
                <img onClick={redirectToWatch} src={data.thumbnailUrl}
                    className='h-36 w-full cursor-pointer
                    object-cover shadow-xl rounded-lg
                    ' alt="" />

                <div className='z-20 bg-zinc-800 p-2 lg:p-4 absolute w-full shadow-lg rounded-br-md'>
                    <div className='flex flex-row items-center gap-4' >
                        <div className='bg-white flex items-center justify-center rounded-full w-7 h-7 lg:h-11 lg:w-11
                            transition hover:border-neutral-300 border-white border-2 cursor-pointer' >
                            <PlayIcon onClick={redirectToWatch} className='text-black w-4 lg:w-6' ></PlayIcon>
                        </div>
                        <div>
                            <FavoriButton movieId={data.id} ></FavoriButton>
                        </div>
                        <div onClick={()=>openModal(data?.id)} className='ml-auto flex items-center justify-center rounded-full w-7 h-7 lg:h-11 lg:w-11
                            transition border-2 cursor-pointer' >
                            <ChevronDownIcon className='text-white w-5 lg:w-7' ></ChevronDownIcon>
                        </div>


                    </div>
                    <p className='text-green-500 font-semibold mt-4 text-sm' >New <span className='text-white ml-2' >2024</span> </p>

                    <div className='flex flex-row mt-2 gap-2 items-center' >
                        <p className='text-white text-sm'>{data.duration}</p>
                    </div>
                    <div className='flex flex-row mt-2 gap-2 items-center' >
                        <p className='text-white text-sm'>{data.genre}</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default MovieCard
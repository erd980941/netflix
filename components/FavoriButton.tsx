import useCurrentUser from '@/hooks/useCurrentUser';
import useFavoriMovie from '@/hooks/useFavorites';
import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import React, { useCallback, useMemo, useState } from 'react'

interface FavoriButtonProps {
    movieId: string;

}

const FavoriButton: React.FC<FavoriButtonProps> = ({ movieId }) => {

    const { data: muteFavori } = useFavoriMovie();
    const { data: user } = useCurrentUser();

    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useMemo(() => {
        const list = user?.favoriteIds || [];
        setIsFavorite(list.includes(movieId));
    }, [user, movieId])

    const toggleFavorites = useCallback(async () => {
        try {
            if (isFavorite) {
                await axios.delete('api/favorite', { data: { movieId } });
            } else {
                await axios.post('api/favorite', { movieId });
            }
            setIsFavorite(!isFavorite);
            muteFavori();
        } catch (error) {
            console.log("Error", error);
        }
    }, [movieId, isFavorite, muteFavori])

    const Icon = isFavorite ? CheckIcon : PlusIcon;

    return (
        <div onClick={toggleFavorites} 
        className='cursor-pointer border-white rounded-full flex
                items-center justify-center border-2 w-7 h-7 lg:w-11 lg:h-11' >
            <Icon className='text-white  w-4 h-4 lg:w-8 lg:h-8' ></Icon>
        </div>
    )
}

export default FavoriButton
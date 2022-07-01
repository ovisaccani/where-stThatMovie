import { useEffect, useState } from 'react'
import peliculaBd from '../api/peliculaBd';
import { MovieFull } from '../interfaces/movieInterface';
import { CreditsResponse, Cast } from '../interfaces/creditsInterface';

interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}


export const useMovieDetails = ( movieId: number ) => {


    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    });

    console.log("ID ID ID ID")
    console.log(movieId)

    const getMovieDetails = async() => {

        const movieDetailsPromise = peliculaBd.get<MovieFull>(`/movie/${ movieId }`);
        const castPromise = peliculaBd.get<CreditsResponse>(`/movie/${ movieId }/credits`);

        const [ movieDetailsResp, castPromiseResp ] = await Promise.all([ movieDetailsPromise, castPromise ]);

        setState({
            isLoading: false,
            movieFull: movieDetailsResp.data,
            cast: castPromiseResp.data.cast
        })
    }

    useEffect(() => {
        getMovieDetails();
        
    }, []);


    return {
        ...state
    }
    
}

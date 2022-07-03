import { useEffect, useState } from 'react'
import peliculaBd from '../api/peliculaBd';
import peliculaRapidBd from '../api/peliculaRapidBd';
import { MovieFull } from '../interfaces/movieInterface';
import { CreditsResponse, Cast } from '../interfaces/creditsInterface';
import { MovieRapidDBMoviesResponse, StreamingInfo } from '../interfaces/movieRapidInterface';

interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
    streamingInfo: StreamingInfo
}


export const useMovieDetails = ( movieId: number ) => {


    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: [],
        streamingInfo: {}
    });

    console.log("ID ID ID ID")
    console.log(movieId)

    const getMovieDetails = async() => {

        const movieDetailsPromise = peliculaBd.get<MovieFull>(`/movie/${ movieId }`);
        const castPromise = peliculaBd.get<CreditsResponse>(`/movie/${ movieId }/credits`);
        const streamingInfoPromise = peliculaRapidBd.get<MovieRapidDBMoviesResponse>(``,{ params: { tmdb_id: `movie/${ movieId }` } });

        const [ movieDetailsResp, castPromiseResp, streamingInfoResp ] = await Promise.all([ movieDetailsPromise, castPromise, streamingInfoPromise ]);

        console.log(streamingInfoResp.data.streamingInfo)

        setState({
            isLoading: false,
            movieFull: movieDetailsResp.data,
            cast: castPromiseResp.data.cast,
            streamingInfo: streamingInfoResp.data.streamingInfo
        })

        
    }

    useEffect(() => {
        getMovieDetails();
        
    }, []);


    return {
        ...state
    }
    
}

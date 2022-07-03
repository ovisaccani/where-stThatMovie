import { useEffect, useState } from 'react'
import peliculaRapidBd from '../api/peliculaRapidBd';
import { MovieRapidDBMoviesResponse, StreamingInfo } from '../interfaces/movieRapidInterface';

interface MovieDetails {
    isLoading: boolean;
    streamingInfo?: StreamingInfo
}

export const useMovieStreamingDetails = ( movieId: number ) => {
    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        streamingInfo: undefined
    });

    console.log("ID ID ID ID")
    console.log(movieId)

    const getMovieStreamingDetails = async() => {     
        const streamingInfoPromise = peliculaRapidBd.get<MovieRapidDBMoviesResponse>(``,{ params: { tmdb_id: `movie/${ movieId }` } });
        const [ streamingInfoResp ] = await Promise.all([streamingInfoPromise ]); 

        let noData = false
        const streamingInfoRespData = streamingInfoResp.data.streamingInfo

        if (!streamingInfoRespData.disney &&
            !streamingInfoRespData.hbo &&
            !streamingInfoRespData.hulu &&
            !streamingInfoRespData.netflix &&
            !streamingInfoRespData.prime){
                noData = true
            }

        setState({
            isLoading: false,
            streamingInfo: noData? undefined: streamingInfoRespData
        })        
    }

    useEffect(() => {
        getMovieStreamingDetails();
        
    }, []);

    return {
        ...state
    }    
}

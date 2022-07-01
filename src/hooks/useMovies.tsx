import { useEffect, useState } from 'react';
import peliculaBd from '../api/peliculaBd';
import { MovieDBMoviesResponse, Movie } from '../interfaces/movieInterface';

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
    searched: Movie[];
}

export const useMovies = () => {

    const [ isLoading, setIsLoading ] = useState(true);
    const [ searchParams, setSearchParams ] = useState('Doctor');
    const [ moviesState, setMoviesState ] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
        searched: []
    })


    const getMovies = async () => {

        setIsLoading(true);       
       
        const nowPlayingPromise     = peliculaBd.get<MovieDBMoviesResponse>('/movie/now_playing');
        const popularPromise        = peliculaBd.get<MovieDBMoviesResponse>('/movie/popular');
        const topRatedPromise       = peliculaBd.get<MovieDBMoviesResponse>('/movie/top_rated');
        const upcomingPromise       = peliculaBd.get<MovieDBMoviesResponse>('/movie/upcoming');
        const searchedMoviesPromise = peliculaBd.get<MovieDBMoviesResponse>('/search/movie',{ params: { query: searchParams } });
        
        const resps = await Promise.all([ 
            nowPlayingPromise, 
            popularPromise, 
            topRatedPromise, 
            upcomingPromise,
            searchedMoviesPromise
        ]);

        setMoviesState({
            nowPlaying: resps[0].data.results,
            popular: resps[1].data.results,
            topRated: resps[2].data.results,
            upcoming: resps[3].data.results,
            searched: resps[4].data.results,
        })

        setIsLoading(false);
    }

   
    useEffect(() => {
        // now_playing
        getMovies();

    }, [])



    return {
        ...moviesState,
        searchParams,
        setSearchParams,
        getMovies,
        isLoading
    }

}

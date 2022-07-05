import { useContext, useEffect, useState } from "react";
import peliculaBd from "../api/peliculaBd";
import { MovieDBMoviesResponse, Movie } from "../interfaces/movieInterface";
import { PeliculasContext } from "../context/peliculasContext/PeliculasContext";

interface MoviesState {
	nowPlaying: Movie[];
	popular: Movie[];
	topRated: Movie[];
	searched: Movie[];
}

export const useMovies = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [searchIsLoading, setSearchIsLoading] = useState(false);
	const [searchParams, setSearchParams] = useState("");
	const [yaBusco, setyaBusco] = useState(false);
	const [moviesState, setMoviesState] = useState<MoviesState>({
		nowPlaying: [],
		popular: [],
		topRated: [],
		searched: [],
	});

	useEffect(() => {
		if (searchParams.length === 0) {
			setyaBusco(false);
			setMoviesState({
				...moviesState,
				searched: [],
			});
		}
	}, [searchParams]);

	const getMovies = async () => {
		setIsLoading(true);

		const nowPlayingPromise =
			peliculaBd.get<MovieDBMoviesResponse>("/movie/now_playing");
		const popularPromise =
			peliculaBd.get<MovieDBMoviesResponse>("/movie/popular");
		const topRatedPromise =
			peliculaBd.get<MovieDBMoviesResponse>("/movie/top_rated");
		/* 		const searchedMoviesPromise = peliculaBd.get<MovieDBMoviesResponse>(
			"/search/movie",
			{ params: { query: searchParams } }
		); */

		const resps = await Promise.all([
			nowPlayingPromise,
			popularPromise,
			topRatedPromise,
		]);

		setMoviesState({
			nowPlaying: resps[0].data.results,
			popular: resps[1].data.results,
			topRated: resps[2].data.results,
			searched: [],
		});

		setIsLoading(false);
	};

	const getMovieByName = async () => {
		setSearchIsLoading(true);
		setyaBusco(true);
		const searchedMoviesPromise = peliculaBd.get<MovieDBMoviesResponse>(
			"/search/movie",
			{ params: { query: searchParams } }
		);
		const resps = await Promise.all([searchedMoviesPromise]);
		setMoviesState({
			...moviesState,
			searched: resps[0].data.results,
		});
		setSearchIsLoading(false);
	};

	useEffect(() => {
		// now_playing
		getMovies();
	}, []);

	return {
		...moviesState,
		searchParams,
		setSearchParams,
		isLoading,
		searchIsLoading,
		getMovieByName,
		yaBusco,
	};
};

import React, { createContext, useEffect, useState } from "react";
import { Movie } from "../../interfaces/movieInterface";

type PeliculasContextProps = {
	peliculasFavoritas: Movie[];
	sumarPelicula: (movie: Movie) => void;
	borrarPelicula: (movie: Movie) => void;
	buscarPelicula: (id: number) => boolean;
};

export const PeliculasContext = createContext({} as PeliculasContextProps);

export const PeliculasProvider = ({ children }: any) => {
	const [peliculasFavoritas, setPeliculasFavoritas] = useState<Movie[]>([]);

	const sumarPelicula = (movie: Movie) => {
		setPeliculasFavoritas((peliculasFavoritas) => [
			...peliculasFavoritas,
			movie,
		]);
	};
	const borrarPelicula = (movie: Movie) => {
		const indexDelete = peliculasFavoritas
			.map(function (x) {
				return x.id;
			})
			.indexOf(movie.id);
		setPeliculasFavoritas((peliculas) =>
			peliculas.filter((_, index) => index !== indexDelete)
		);
	};

	const buscarPelicula = (id: number) => {
		const result = peliculasFavoritas.find(
			(pelicula) => pelicula.id === id
		);
		return result !== undefined;
	};
	return (
		<PeliculasContext.Provider
			value={{
				peliculasFavoritas,
				sumarPelicula,
				borrarPelicula,
				buscarPelicula,
			}}
		>
			{children}
		</PeliculasContext.Provider>
	);
};

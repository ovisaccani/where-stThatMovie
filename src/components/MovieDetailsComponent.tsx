import React, { useContext, useState } from "react";
import { FlatList, Text, View } from "react-native";
import currencyFormatter from "currency-formatter";
import Icon from "react-native-vector-icons/Ionicons";
import { MovieFull, Movie } from "../interfaces/movieInterface";
import { Cast } from "../interfaces/creditsInterface";
import { CastItem } from "./CastItem";
import { StreamingButtonLink } from "./StreamingButtonLink";
import { StreamingInfo } from "../interfaces/movieRapidInterface";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PeliculasContext } from "../context/peliculasContext/PeliculasContext";

interface Props {
	movieFull: MovieFull;
	cast: Cast[];
	streamingInfo?: StreamingInfo;
}

export const MovieDetailsComponent = ({
	movieFull,
	cast,
	streamingInfo,
}: Props) => {
	const { sumarPelicula, buscarPelicula, borrarPelicula } =
		useContext(PeliculasContext);

	const [esFav, setEsFav] = useState(buscarPelicula(movieFull.id));

	const addFav = () => {
		const movie = movieFullToMovie();
		sumarPelicula(movie);
		setEsFav(true);
	};

	const deleteFav = () => {
		const movie = movieFullToMovie();
		borrarPelicula(movie);
		setEsFav(false);
	};

	const agregarBorrar = () => {
		esFav ? deleteFav() : addFav();
	};

	function movieFullToMovie() {
		const movie: Movie = {
			adult: movieFull.adult,
			backdrop_path: movieFull.backdrop_path,
			id: movieFull.id,
			original_title: movieFull.original_title,
			overview: movieFull.overview,
			popularity: movieFull.popularity,
			poster_path: movieFull.poster_path,
			release_date: movieFull.release_date,
			title: movieFull.title,
			video: movieFull.video,
			vote_average: movieFull.vote_average,
			vote_count: movieFull.vote_count,
		};
		return movie;
	}

	return (
		<>
			<View style={{ marginHorizontal: 20 }}>
				<View style={{ flexDirection: "row" }}>
					<Icon name="star-outline" color="grey" size={16} />

					<Text> {movieFull.vote_average}</Text>

					<Text style={{ marginLeft: 5 }}>
						- {movieFull.genres.map((g) => g.name).join(", ")}
					</Text>
				</View>

				<TouchableOpacity
					style={{
						marginTop: 10,
						borderRadius: 12,
						backgroundColor: "red",
						width: "65%",
						padding: 6,
					}}
					onPress={agregarBorrar}
				>
					<Text
						style={{
							color: "black",
							fontWeight: "bold",
							textAlign: "center",
							fontSize: 12,
						}}
					>
						{esFav
							? "ELIMINAR DE MI LISTA DE FAVORITOS"
							: "AGREGAR A MI LISTA DE FAVORITOS"}
					</Text>
				</TouchableOpacity>

				<Text
					style={{ fontSize: 23, marginTop: 10, fontWeight: "bold" }}
				>
					Servicios de stream
				</Text>
				{streamingInfo ? (
					<View>
						{streamingInfo?.disney ? (
							<StreamingButtonLink
								buttonName="Disney"
								url={streamingInfo?.disney?.ar.link}
							/>
						) : (
							<View />
						)}
						{streamingInfo?.hbo ? (
							<StreamingButtonLink
								buttonName="HBO"
								url={streamingInfo?.hbo?.ar.link}
							/>
						) : (
							<View />
						)}
						{streamingInfo?.hulu ? (
							<StreamingButtonLink
								buttonName="Hulu"
								url={streamingInfo?.hulu?.ar.link}
							/>
						) : (
							<View />
						)}
						{streamingInfo?.netflix ? (
							<StreamingButtonLink
								buttonName="Netflix"
								url={streamingInfo?.netflix?.ar.link}
							/>
						) : (
							<View />
						)}
						{streamingInfo?.prime ? (
							<StreamingButtonLink
								buttonName="Prime"
								url={streamingInfo?.prime?.ar.link}
							/>
						) : (
							<View />
						)}
					</View>
				) : (
					<Text style={{ fontSize: 16, marginTop: 10 }}>
						No se encontraron servicios de stream.
					</Text>
				)}

				<Text
					style={{ fontSize: 23, marginTop: 10, fontWeight: "bold" }}
				>
					Historia
				</Text>

				<Text style={{ fontSize: 16 }}>{movieFull.overview}</Text>

				<Text
					style={{ fontSize: 23, marginTop: 10, fontWeight: "bold" }}
				>
					Presupuesto
				</Text>
				<Text style={{ fontSize: 18 }}>
					{currencyFormatter.format(movieFull.budget, {
						code: "USD",
					})}
				</Text>
			</View>

			<View style={{ marginTop: 10, marginBottom: 100 }}>
				<Text
					style={{
						fontSize: 23,
						marginTop: 10,
						fontWeight: "bold",
						marginHorizontal: 20,
					}}
				>
					Actores
				</Text>

				<FlatList
					data={cast}
					keyExtractor={(item, index) => item.id.toString() + index}
					renderItem={({ item }) => <CastItem actor={item} />}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					style={{ marginTop: 10, height: 70 }}
				/>
			</View>
		</>
	);
};

import React, { useContext, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	View,
	ScrollView,
	Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import { MoviePoster } from "../components/MoviePoster";
import { useMovies } from "../hooks/useMovies";
import { HorizontalSlider } from "../components/HorizontalSlider";
import { StackScreenProps } from "@react-navigation/stack";
import { SearchInput } from "../components/SearchInput";
import { AuthContext } from "../context/authContext/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar } from "../components/Appbar";

const { width: windowWidth } = Dimensions.get("window");

interface Props extends StackScreenProps<any, any> {}

export const Home = ({ navigation }: Props) => {
	const {
		nowPlaying,
		popular,
		topRated,
		isLoading,
		searchParams,
		setSearchParams,
		searched,
		searchIsLoading,
		yaBusco,
		getMovieByName,
	} = useMovies();
	const { top } = useSafeAreaInsets();

	React.useEffect(
		() =>
			navigation.addListener("beforeRemove", (e) => {
				e.preventDefault();
			}),
		[navigation]
	);

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignContent: "center",
				}}
			>
				<ActivityIndicator color="red" size={100} />
			</View>
		);
	}

	return (
		<View>
			<Appbar navigation={navigation} />
			<ScrollView>
				{searchIsLoading ? (
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignContent: "center",
							marginTop: 8,
						}}
					>
						<ActivityIndicator color="red" size={50} />
					</View>
				) : (
					<View style={{ marginTop: 8 }}>
						<SearchInput
							value={searchParams}
							setValue={setSearchParams}
							getMovieByName={getMovieByName}
						/>
						{yaBusco && searched.length === 0 ? (
							<Text style={{ textAlign: "center" }}>
								No se han encontrado resultados con ese nombre
							</Text>
						) : null}

						<View style={{ marginTop: top + 20 }}>
							{searched.length > 0 ? (
								<View style={{ height: 440 }}>
									<Carousel
										data={searched}
										renderItem={({ item }: any) => (
											<MoviePoster
												movie={item}
												navigation={navigation}
											/>
										)}
										sliderWidth={windowWidth}
										itemWidth={300}
										inactiveSlideOpacity={0.9}
									/>
								</View>
							) : null}
						</View>
					</View>
				)}
				<View>
					<HorizontalSlider
						title="Proyectandose"
						movies={nowPlaying}
						navigation={navigation}
					/>
					<HorizontalSlider
						title="Populares"
						movies={popular}
						navigation={navigation}
					/>
					<HorizontalSlider
						title="Mejores puntuadas"
						movies={topRated}
						navigation={navigation}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

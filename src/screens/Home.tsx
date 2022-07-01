import React from "react";
import { ActivityIndicator, Dimensions, View, ScrollView, TextInput, TouchableOpacity, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import { MoviePoster } from "../components/MoviePoster";
import { useMovies } from "../hooks/useMovies";
import { HorizontalSlider } from "../components/HorizontalSlider";
import { StackScreenProps } from "@react-navigation/stack";

const { width: windowWidth } = Dimensions.get("window");

interface Props extends StackScreenProps<any, any> {}

export const Home = ({ navigation }: Props) => {
	const { nowPlaying, popular, topRated, upcoming, isLoading, searchParams,setSearchParams,getMovies, searched } = useMovies();
	const { top } = useSafeAreaInsets();

	React.useEffect(
		() =>
		  navigation.addListener('beforeRemove', (e) => {
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
			<TextInput    
				onChangeText={(params)=>{setSearchParams(params)}}
				value={searchParams}
      		/>

			<TouchableOpacity					
				onPress={getMovies}
			>
				<Text >BuScAr</Text>
			</TouchableOpacity>			
			
			<ScrollView>
				<View style={{ marginTop: top + 20 }}>
					{/* Carosel Principal */}
					<View style={{ height: 440 }}>
						<Carousel
							data={searched}
							renderItem={({ item }: any) => (
								<MoviePoster movie={item} navigation={navigation} />
							)}
							sliderWidth={windowWidth}
							itemWidth={300}
							inactiveSlideOpacity={0.9}
						/>
					</View>

					{/* Películas populares */}
					<HorizontalSlider
						title="Proyectandose"
						movies={nowPlaying}
						navigation={navigation}
					/>
					<HorizontalSlider
						title="Popular"
						movies={popular}
						navigation={navigation}
					/>
					<HorizontalSlider
						title="Top Rated"
						movies={topRated}
						navigation={navigation}
					/>
					<HorizontalSlider
						title="Upcoming"
						movies={upcoming}
						navigation={navigation}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

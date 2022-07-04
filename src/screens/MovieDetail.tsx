import { StackScreenProps } from '@react-navigation/stack';
import React from "react";
import { Image, Text, View, StyleSheet, Dimensions, ActivityIndicator,Alert, Button, Linking, } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParams } from '../navigation/StackNavigator';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetailsComponent } from '../components/MovieDetailsComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieStreamingDetails } from '../hooks/useMovieStreamingDetails';

const screenHeight = Dimensions.get('screen').height;
interface Props extends StackScreenProps<RootStackParams, 'MovieDetail'>{};

export const MovieDetail = ( { route, navigation }: Props ) => {
    
    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;
    const { isLoading, cast, movieFull} = useMovieDetails( movie.id ); 
    const {streamingInfo } = useMovieStreamingDetails( movie.id ); 

    return (        

        <ScrollView>
            <View style={ styles.imageContainer }>
                <View style={ styles.imageBorder }>
                    <Image 
                        source={{ uri }}
                        style={ styles.posterImage }
                    />
                </View>
            </View>

            <View style={ styles.marginContainer }>
                <Text style={ styles.subTitle }>{ movie.original_title }</Text>
                <Text style={ styles.title }>{ movie.title }</Text>
            </View>

            {
                isLoading 
                    ? <ActivityIndicator size={ 35 } color="grey" style={{ marginTop: 20 }} />
                    : <MovieDetailsComponent movieFull={ movieFull! } cast={ cast } streamingInfo={ streamingInfo } />
            }

            <View style={ styles.backButton }>
                <TouchableOpacity
                    onPress={() => navigation.pop() }
                >
                    <Icon 
                        color="white"
                        name="arrow-back-outline"
                        size={ 60 }
                    />
                </TouchableOpacity>
            </View>                
            
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    imageContainer: {
        // backgroundColor: 'red',
        // overflow: 'hidden',
        width: '100%',
        height: screenHeight * 0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 9,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },

    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    posterImage: {
        flex: 1,
    },

    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 30,
        left: 5
    }
});
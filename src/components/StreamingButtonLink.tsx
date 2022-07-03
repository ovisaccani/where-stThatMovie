import React from "react";
import { View, Alert, Button, Linking, } from 'react-native';

interface Props {
    buttonName: string;
    url: string;
}

export const StreamingButtonLink = ({ buttonName, url}: Props) => {

    const openUrl = async (url: string) => {
        const isSupported = await Linking.canOpenURL(url);
        if (isSupported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this url: ${url}`);
        }
    }      

    return (
        <View>
            <Button title={ buttonName } onPress={() => {
                openUrl(url)
            }} color="red" />
        </View>
    )
}

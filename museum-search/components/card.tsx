import React from 'react'
import {StyleSheet, Pressable, Text, View, Image} from 'react-native'
import {colors, fonts} from '../app/index'
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useRouter } from 'expo-router';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypesNamespace';


export const Card = ({title, artist, imageLink, navigationFunction} 
    : {title: string, artist: string, imageLink: string, navigationFunction: Function}) => {
    return (
        <View className="artwork-card" style={styles.artworkCard}>
            <View className="image-container" style={styles.imageContainer}>
                <Image source={{uri: imageLink}} style={styles.cardImage}></Image>
            </View>    
            <View className="card-desc" style={styles.cardDescription}>
                <Text style={[fonts.rubik, fonts.rubikMedium]}>{title}</Text>
                <Text style={[fonts.rubik, styles.artworkArtistText]}>{artist}</Text>
            </View>
            <Pressable className="artwork-link" style={styles.artworkLink} onPress={navigationFunction as any}>
                <MaterialIcons name='arrow-outward' color="white" size={32}/>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        artworkCard : {
            width: '100%',
            height: 'auto',
            minHeight: 100,
            borderRadius: 16,
            backgroundColor: 'white',
            boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
        },
        artworkLink: {
            width: 83,
            backgroundColor: "#84A7B9",
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            position: 'absolute',
            height: '100%',
            right: 0,

        },
        imageContainer: {
            width: "100%",
            height: 120,
        },
        cardImage: {
            width: '100%',
            height: '100%',
        },
        cardDescription: {
            paddingTop: 8,
            paddingLeft: 16,
            paddingRight: 82,
            paddingBottom: 24,
            display: 'flex',
            gap: 4,
            flexDirection: 'column',
        },
        artworkArtistText: {
            fontSize: 14,
        },

    }
)
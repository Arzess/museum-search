import React from 'react'
import {StyleSheet, Pressable, Text} from 'react-native'
import {colors, fonts} from '../app/index'
import { View } from 'react-native';



export const Card = ({title, artist} 
    : {title: string, artist: string}) => {
    return (
        <View className="artwork-card" style={styles.artworkCard}>
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
            boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.25)'
        }

    }
)
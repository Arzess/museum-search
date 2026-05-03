import React from 'react'
import {StyleSheet, Pressable, Text} from 'react-native'
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import {colors} from '../app/index'



export const IconButton = ({iconName, onPress} 
    : {iconName: string, onPress? : Function}) => {
    return (
        <Pressable style={styles.iconButton} onPress={onPress as any}>
            <MaterialIcons name={iconName as any} color="white" size={24} />
        </Pressable>
    );
}

const styles = StyleSheet.create(
    {
        iconButton: {
            backgroundColor: '#84A7B9',
            display: 'flex',
            width: 32,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 999,
        },

    }
)
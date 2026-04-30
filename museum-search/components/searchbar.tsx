import React from 'react';
import {View, TextInput, Pressable, StyleSheet} from 'react-native'
import { MaterialIcons } from '@react-native-vector-icons/material-icons';


export const SearchBar = ({placeholder} : {placeholder: string}) => {
    return (
        <View style={styles.searchbar}>
            <Pressable style={styles.searchButton}><MaterialIcons name="menu" color="black" size={24} /></Pressable>

            <TextInput style={styles.searchInput} placeholder={placeholder} placeholderTextColor="#49454F" returnKeyType='search' underlineColorAndroid='transparent'>
            </TextInput>
            <Pressable style={styles.searchButton}><MaterialIcons name="search" color="black" size={24} /></Pressable>
        </View>

    );

}

const styles = StyleSheet.create({
    searchInput: {
        outline: 'transparent',
        outlineColor: 'transparent',
        borderColor: 'transparent',
        backgroundColor: 'transparent',
    },
    searchbar: {
        width: 'auto',
        height: "auto",
        display: 'flex',
        flexDirection: 'row',
        gap: 0,
        backgroundColor: '#EBF7FF',
        borderRadius: 16,
        overflow: 'hidden',
    },
    searchButton: {
        width: 48,
        height: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
})
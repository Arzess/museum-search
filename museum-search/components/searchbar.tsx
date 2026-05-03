import React from 'react';
import {View, TextInput, Pressable, StyleSheet} from 'react-native'
import { MaterialIcons } from '@react-native-vector-icons/material-icons';


export const SearchBar = ({placeholder, value, setValue, init, filter} 
    : {placeholder: string, value: string, setValue : Function, init: Function, filter: any}) => {
    return (
        <View style={styles.searchbar}>
            <Pressable style={styles.searchButton} onPress={filter as any}><MaterialIcons name="menu" color="black" size={24} /></Pressable>
            <TextInput style={styles.searchInput} placeholder={placeholder} onChangeText={setValue as any} value={value} placeholderTextColor="#49454F" returnKeyType='search' underlineColorAndroid='transparent'>
            </TextInput>
            <Pressable style={styles.searchButton} onPress={init as any}><MaterialIcons name="search" color="black" size={24}/></Pressable>
        </View>
    );

}

const styles = StyleSheet.create({
    searchInput: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        flex: 1,
    },
    searchbar: {
        height: "auto",
        display: 'flex',
        flexDirection: 'row',
        gap: 0,
        backgroundColor: '#EBF7FF',
        borderRadius: 16,
        overflow: 'hidden',
        width: '100%',
        maxWidth: 300,
    },
    searchButton: {
        width: 48,
        height: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
})
import React from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import {colors, fonts} from '../app/index'


// On the breadcrumbs the first page is always the start page
// There can be up to three pages: Start - Search - Artwork
export const Breadcrumbs = ({isArtwork = false, searchQuery, artworkName} : 
    {isArtwork: Boolean, searchQuery: String, artworkName: String}) => {
    return (
        <View style={styles.breadcrumbsContainer}>
            <Pressable>
                <MaterialIcons name="keyboard-arrow-left" />
            </Pressable>
            <View style={styles.breadcrumbList}>
                <Text style={fonts.rubik}>Start</Text>
                <MaterialIcons name="arrow-forward" />
                <Text style={[fonts.rubik, !isArtwork && fonts.rubikMedium]}>{searchQuery}</Text>
                {/* If its the artwork that's displayed and not just search */}
                {isArtwork &&
                (
                    <>
                    <MaterialIcons name="arrow-forward" />
                    <Text style={[fonts.rubik, fonts.rubikMedium]}>
                        {artworkName}
                    </Text>
                    </>
                 )}
            </View>
        </View>

    );

}



const styles = StyleSheet.create({
    breadcrumbsContainer: {
        display: 'flex',
        gap: 8,
        width: '100%',
        justifyContent: 'flex-start',
    },
    breadcrumbList: {
        display: 'flex',
        gap: 4,
        flexWrap: 'wrap',
    },
});
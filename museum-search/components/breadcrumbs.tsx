import React from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import {colors, fonts} from '../app/index'
import { IconButton } from './iconButton';
import { useRouter } from 'expo-router';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

// On the breadcrumbs the first page is always the start page
// There can be up to three pages: Start - Search - Artwork
export const Breadcrumbs = ({isArtwork = false, searchQuery, artworkName, artworkId} : 
    {isArtwork: boolean, searchQuery: string, artworkName?: string, artworkId?: Int32}) => {
        // Routing redirection part
        const router = useRouter();
        return (
        <View style={styles.breadcrumbsContainer}>
            <IconButton iconName="keyboard-arrow-left" onPress={() => { router.back();}} />
            <View style={styles.breadcrumbList}>
                <Text style={fonts.rubik} onPress={()=>{
                    router.back();
                }}>Start</Text>
                <MaterialIcons name="arrow-forward" />
                <Text style={[fonts.rubik, styles.capitalize, !isArtwork && fonts.rubikMedium]} onPress={()=>{if (isArtwork) router.back()}}>{searchQuery}</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        zIndex: 5,
    },
    breadcrumbList: {
        display: 'flex',
        gap: 4,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },
    capitalize: {
        textTransform: 'capitalize',
    },
});
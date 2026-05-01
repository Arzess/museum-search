import React from 'react';
import { useState } from 'react';
import {View, StyleSheet, Modal, Pressable, Switch, Text} from 'react-native';
import {SearchBar} from '../components/searchbar'
import { IconButton } from '../components/iconButton';
import {colors, fonts} from '../app/index'
import { MaterialIcons } from '@react-native-vector-icons/material-icons';


export const Search = ({searchResult, setSearchResult, init} : {searchResult : any, setSearchResult: any, init: Function}) => {    
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <View className="searchModal" style={styles.searchModal}>
            <SearchBar placeholder="Artwork" value={searchQuery} 
            setValue={setSearchQuery} init={()=>{
                init(searchQuery);
            }} filter={setModalVisible}/>
            
            {/* Filter modal */}
            <Modal className="filter" style={styles.filterModal} 
            visible={modalVisible} animationType="fade" transparent={true} 
            onRequestClose={()=> {setModalVisible(!modalVisible)}} >
                <View style={styles.modalContainer}>
                    <View style={styles.filterHeading}>
                        <IconButton iconName='close' onPress={() => setModalVisible(!modalVisible)} />
                        <Text style={[fonts.rubik, styles.filterHeadingText]}>Filter</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );

}

const styles = StyleSheet.create({
    searchModal: {},

    // Filter modal styles
    filterModal: {
        backgroundColor: 'white',

    },

    modalContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 3,
        padding: 16,

    },

    filterHeading: {
        display: 'flex',
        gap: 16,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },

    filterHeadingText: {
        fontSize: 24,
    },

})
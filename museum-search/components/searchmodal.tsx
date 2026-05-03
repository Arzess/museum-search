import React from 'react';
import { useState } from 'react';
import {View, StyleSheet, Modal, Pressable, Switch, Text, TextInput} from 'react-native';
import {SearchBar} from '../components/searchbar'
import { IconButton } from '../components/iconButton';
import {colors, fonts} from '../app/index'
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { GenericButton } from './button';


export const Search = ({searchResult, setSearchResult, init} : {searchResult : any, setSearchResult: any, init: Function}) => {    
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [artistQuery, setArtistQuery] = useState('');
    const [timeRangeStart, setTimeRangeStart] = useState('');
    const [timeRangeEnd, setTimeRangeEnd] = useState('');
    const [isEducational, setIsEducational] = useState(false);
    const [isOnDisplay, setIsOnDisplay] = useState(false);
    const [isNotOftenVisited, setIsNotOftenVisited] = useState(false);

    return (
        <View className="searchModal" style={styles.searchModal}>
            <SearchBar placeholder="Artwork" value={searchQuery} 
            setValue={setSearchQuery} init={()=>{
                init(searchQuery, artistQuery, timeRangeStart, timeRangeEnd, isEducational, isOnDisplay, isNotOftenVisited);
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
                    <View className="filter-list" style={styles.filterList}>
                        <TextInput style={styles.artistInput} placeholder="Artist" onChangeText={setArtistQuery} value={artistQuery} placeholderTextColor="#49454F" returnKeyType='search' underlineColorAndroid='transparent'/>
                        <View className="year-range" style={styles.yearRange}>
                            <TextInput style={styles.yearInput} placeholder="From" onChangeText={setTimeRangeStart} value={timeRangeStart} placeholderTextColor="#49454F" returnKeyType='search' underlineColorAndroid='transparent'/>
                            <TextInput style={styles.yearInput} placeholder="To" onChangeText={setTimeRangeEnd} value={timeRangeEnd} placeholderTextColor="#49454F" returnKeyType='search' underlineColorAndroid='transparent'/>
                        </View>
                        {/* Educational documents */}
                        <View className="filter-toggle-cat" style={styles.filterToggle}>
                            <Text style={fonts.rubik}>
                                Has educational documents
                            </Text>
                            <Switch
                                trackColor={{false: '#FECAC9', true: '#D13A38'}}
                                thumbColor={isEducational ? 'white' : '#7C6161'}
                                ios_backgroundColor="#FECAC9"
                                onValueChange={setIsEducational}
                                value={isEducational}
                            />                      
                        </View>
                        {/* On display */}
                        <View className="filter-toggle-cat" style={styles.filterToggle}>
                            <Text style={fonts.rubik}>
                                Only works that are on display
                            </Text>
                            <Switch
                                trackColor={{false: '#FECAC9', true: '#D13A38'}}
                                thumbColor={isOnDisplay ? 'white' : '#7C6161'}
                                ios_backgroundColor="#FECAC9"
                                onValueChange={setIsOnDisplay}
                                value={isOnDisplay}
                            />                      
                        </View>
                        {/* Not often visited */}
                        <View className="filter-toggle-cat" style={styles.filterToggle}>
                            <Text style={fonts.rubik}>
                                Not often visited
                            </Text>
                            <Switch
                                trackColor={{false: '#FECAC9', true: '#D13A38'}}
                                thumbColor={isNotOftenVisited ? 'white' : '#7C6161'}
                                ios_backgroundColor="#FECAC9"
                                onValueChange={setIsNotOftenVisited}
                                value={isNotOftenVisited}
                            />                      
                        </View>

                    </View>
                    <GenericButton icon={false} textContent="Apply" task={()=>{
                        setModalVisible(!modalVisible)
                    }}/>
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
    filterList: {
        gap: 32,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    artistInput: {
        backgroundColor: '#EBF7FF',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingLeft: 16,
        paddingRight: 16,
        height: 48,
        paddingTop: 4,
        paddingBottom: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,

    },
    filterToggle: {
        width: "100%",
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: 16,
    },
    yearRange: {
        width: "100%",
        display: 'flex',
        gap: 16,
        flexDirection: 'row',
    },
    yearInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        height: 48,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 4,
    },

})
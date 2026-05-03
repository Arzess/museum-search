import { useLocalSearchParams } from 'expo-router';
import {useState, useEffect} from 'react';
import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {colors, fonts} from '../index'
import { Breadcrumbs } from '@/components/breadcrumbs';
import {Card} from '@/components/card'
import { GenericButton } from '@/components/button';
import { useRouter } from 'expo-router';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypesNamespace';

export default function SearchQuery() {
    const {query} = useLocalSearchParams();
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);
    const router = useRouter();
    
    const fetchData = async () => {
            try {
                const res = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=id,title,artist_display,image_id`);
                const data = await res.json();
                console.log(data);
                setTotal(data.pagination.total);
                setResults(data.data);

            } catch (e) {
                console.log(e);
            }
    };
    // Initial call
    useEffect(() => {
        if (query) {
            fetchData();
        }
    }, [query]);


    // Artwork navigation function
    const navigateToArtwork = (artworkId: Int32) => {
        router.push({
          pathname: "/search/artwork/[id]",
          params: { 
            id: artworkId,
            query: query,
        }
        });
    }


    return (
        <View className="search-query-container" style={styles.searchQueryContainer}>
            
            <Breadcrumbs isArtwork={false} searchQuery={query as any}/>
            <View className="search-container" style={styles.searchContainer}>
                <View className="search-heading">
                    <Text style={[fonts.rubik, styles.searchHeadingResultText]}>Results for <Text style={[colors.secondary, fonts.rubikMedium, styles.capitalize]}>{query}</Text></Text>
                    <Text style={[fonts.rubik, styles.searchHeadingAdditionalText]}>{total} results found</Text>
                </View>
                {/* Search results list */}

                <FlatList className='search-result-list' style={styles.searchResultList} 
                // @ts-ignore
                data={results} keyExtractor={item => item.id.toString()} renderItem={({ item }) => (
                        <Card 
                            // @ts-ignore
                            title={item.title} 
                            // @ts-ignore
                            artist={item.artist_display} 
                            // @ts-ignore
                            imageLink={`https://www.artic.edu/iiif/2/${item.image_id}/full/400,/0/default.jpg`} 
                            // @ts-ignore
                            navigationFunction={() => navigateToArtwork(item.id, item.title)} 
                        />)} 
                        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                        />
                {/* <GenericButton icon={true} iconName="cached" textContent='Show more' isDisabled={false}/> */}
            </View>
            

        </View>

    );

}

const styles = StyleSheet.create({
    capitalize: {
        textTransform: 'capitalize',
    },
    
    searchQueryContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        flex: 1,
    },
    searchHeadingResultText: {
        fontSize: 24,
    },
    searchHeadingAdditionalText: {
        fontSize: 14,

    },
    searchContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
    },
    searchResultList: {
        height: '100%',
        display: 'flex',
        gap: 16,
        overflowX: 'scroll',
        paddingBottom: 120,
    },

})
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
import { Footer } from '@/components/footer';

export default function SearchQuery() {
    const {query, artist, start, end, edu, view, rare} = useLocalSearchParams();
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    // Let the system know that no result was found or there was an error
    const [noResult, setNoResult] = useState(false);
    const router = useRouter();
    


    // Wurde durch KI übernommen
    const composeQueryString = (pageNumber: Int32) => {
        let filter = [];
        const artworksPerPage = 8
        if (query) filter.push(query);

        if (artist) filter.push(`artist_title:"${artist}"`);
        
        if (start && end) {
            filter.push(`date_start:[${start} TO ${end}]`);
        }

        if (edu) filter.push(`has_educational_resources:true`);
        if (view) filter.push(`is_on_view:true`);
        if (rare) filter.push(`has_not_been_viewed_much:true`);

        const finalQ = filter.join(' AND ');
        return `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(finalQ)}&fields=id,title,artist_display,image_id&page=${pageNumber}&limit=${artworksPerPage}`;
    }

    // Wurde teils durch KI übernommen
    const fetchData = async (pageNumber: Int32) => {
            try {
                const res = await fetch(composeQueryString(pageNumber));
                const data = await res.json();
                console.log(data);
                setTotal(data.pagination.total);
                if (data.pagination.total == 0) setNoResult(true);
                if (!data.data) setNoResult(true);
                setResults(results.concat(data.data));

            } catch (e) {
                setNoResult(true);
                console.log("There was an error during the search process!" );
                console.log("Error details:" );
                console.log(e);
            }
    };
    
    // Initial call
    useEffect(() => {
        setResults([]);
        setPage(1);
        fetchData(1);
    }, [query, artist, start, end, edu, view, rare]);

    // Load more artworks when needed
    const loadMoreArtworks = () => {
        const next = page + 1;
        setPage(next);
        fetchData(next);

    }

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
                {/* Case 1: there are results */}
                {
                    !noResult &&
                    <>
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
                                />)
                            } 
                                
                            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                                
                            ListFooterComponent={
                                <GenericButton icon={true} iconName="cached" textContent='Show more' isDisabled={false} task={loadMoreArtworks}/>
                            }
                            ListFooterComponentStyle={
                                {
                                    marginTop: 16,
                                }
                            }
                                
                        />
                        
                    </> 
                }
                
                {/* Case 2: no results were found */}
                {
                    noResult &&
                    <>
                        <View className="no-results" style={styles.noResults}>
                                <View className="no-results-heading-title" style={styles.noResultsHeadingContainer}>
                                    <Text style={[fonts.rubik, fonts.rubikBold, colors.secondary, styles.noResultsHelpText]}>No results</Text>
                                    <Text style={[fonts.rubik, fonts.rubikSemi, styles.noResultsText]}>We’re sorry.</Text>
                                </View>
                            <Text style={[fonts.rubik, styles.textAlignCenter]}>We couldn’t find anything that’d fit your description, or there was an error during the process.</Text>
                            <GenericButton icon={true} iconName="arrow-back" textContent="Try again" task={()=>{ router.back(); }} />
                        </View>
                    </>

                }
            
            </View>
            
        <Footer/>
        </View>

    );

}

const styles = StyleSheet.create({
    capitalize: {
        textTransform: 'capitalize',
    },
    textAlignCenter: {
        textAlign: 'center',
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
        paddingBottom: 32,
    },
    noResults: {
        display: 'flex',
        gap: 16,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsHeadingContainer: {
        display: 'flex',
        gap: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noResultsHelpText: {
        fontSize: 14,
    },
    noResultsText: {
        fontSize: 40,
    }

})
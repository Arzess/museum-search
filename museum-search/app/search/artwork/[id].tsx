import { useLocalSearchParams } from 'expo-router';
import {useState, useEffect} from 'react';
import React from 'react'
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import {colors, fonts} from '../../index'
import { Breadcrumbs } from '@/components/breadcrumbs';
import RenderHTML from 'react-native-render-html'

export default function SearchQuery() {
    const {id, query} = useLocalSearchParams();
    const [result, setResult] = useState([]);
    
    const fetchData = async () => {
            try {
                const res = await fetch(`https://api.artic.edu/api/v1/artworks/search?query[term][id]=${id}&fields=title,artist,image_id,date_display,description`);
                const data = await res.json();
                console.log(data);
                setResult(data.data[0]);

            } catch (e) {
                console.log(e);
            }
    };

    // Initial call
    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    // Since the description from the API has html tags in them I used renderHTML to handle that
    const descStyles = StyleSheet.create({
        p: {
            fontFamily: "Rubik_400Regular",
            fontSize: 16,
        },
    })
    const descriptionText = {
        // @ts-ignore
        html: result.description,
    };

    return (
        <View className="search-query-container" style={styles.artworkContainer}>
            {/* @ts-ignore */}
            <Breadcrumbs isArtwork={true} artworkName={result.title} searchQuery={query as any}/>
            {/* @ts-ignore */}
            <ScrollView className="artwork" style={styles.artwork} contentContainerStyle={{rowGap: 16}}>
                <View className='image-container' style={styles.imageContainer}><Image source={{uri: `https://www.artic.edu/iiif/2/${result.image_id}/full/400,/0/default.jpg`}} className="artwork-image" style={styles.artworkImage}/></View>
                                
                {/* Title*/}
                <View className="desc-cat" style={styles.descCat}>
                    <Text style={[fonts.rubik, styles.additionalText]}>Title</Text>
                    {/* @ts-ignore */}
                    <Text style={[fonts.rubik, fonts.rubikMedium, styles.artworkTitleText]}>{result.title}</Text>
                </View>
                
                {/* Id */}
                <View className="desc-cat" style={styles.descCat}>
                    <Text style={[fonts.rubik, styles.additionalText]}>Id</Text>
                    <Text style={[fonts.rubik]}>{id}</Text>
                </View>
                
                {/* Year */}
                {/* Long description */}
                <ScrollView className="desc-cat" style={styles.descCat}>
                    <Text style={[fonts.rubik, styles.additionalText]}>Description</Text>
                    <RenderHTML source={descriptionText} tagsStyles={descStyles} />
                </ScrollView>
            </ScrollView>
        </View>

    );

}

const styles = StyleSheet.create({
    capitalize: {
        textTransform: 'capitalize',
    },
    additionalText: {
        fontSize: 12,
    },
    artworkContainer: {
        backgroundColor: 'white',
        flex: 1,

    },
    artworkImage: {
       width: '100%',
       height: '100%',
       objectFit: 'cover', 
    },
    imageContainer: {
        width: '100%',
        height: 300,
    },
    
    artworkTitleText: {
        fontSize: 24,
    },
    descCat: {
        paddingLeft: 16,
        paddingRight: 16,

    }
})
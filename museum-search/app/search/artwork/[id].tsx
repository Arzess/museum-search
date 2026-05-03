import { useLocalSearchParams } from 'expo-router';
import {useState, useEffect} from 'react';
import React from 'react'
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import {colors, fonts} from '../../index'
import { Breadcrumbs } from '@/components/breadcrumbs';
import RenderHTML from 'react-native-render-html'
import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import { Footer } from '@/components/footer';


export default function SearchQuery() {
    const {id, query} = useLocalSearchParams();
    const [result, setResult] = useState([]);
    const [descriptionAvailable, setDescriptionAvailable] = useState(true);
    
    const fetchData = async () => {
            try {
                const res = await fetch(`https://api.artic.edu/api/v1/artworks/search?query[term][id]=${id}&fields=title,artist_display,image_id,date_display,description,date_display,dimensions,style_title`);
                const data = await res.json();
                console.log(data);
                setResult(data.data[0]);
                // If there's no description
                if (!data.data[0].description) setDescriptionAvailable(false);

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
            <View className='image-container' style={styles.imageContainer}>
                {/* @ts-ignore */}
                <ImageZoom uri={`https://www.artic.edu/iiif/2/${result.image_id}/full/400,/0/default.jpg`} minScale={300} maxScale={1000} doubleTapScale={2} isDoubleTapEnabled={true}/>
            </View>
            {/* @ts-ignore */}
            <ScrollView className="artwork" style={styles.artwork} contentContainerStyle={{rowGap: 16}}>

                                
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
                
                {/* Artists */}
                <View className="desc-cat" style={styles.descCat}>
                    <Text style={[fonts.rubik, styles.additionalText]}>Artist(s)</Text>
                    {/* @ts-ignore */}
                    <Text style={[fonts.rubik]}>{result.artist_display}</Text>
                </View>
                
                {/* Year */}
                <View className="desc-cat" style={styles.descCat}>
                    <Text style={[fonts.rubik, styles.additionalText]}>Year</Text>
                    {/* @ts-ignore */}
                    <Text style={[fonts.rubik]}>{result.date_display}</Text>
                </View>
                
                {/* Dimensions */}
                <View className="desc-cat" style={styles.descCat}>
                    <Text style={[fonts.rubik, styles.additionalText]}>Dimensions</Text>
                    {/* @ts-ignore */}
                    <Text style={[fonts.rubik]}>{result.dimensions}</Text>
                </View>

                {/* Style */}
                <View className="desc-cat" style={styles.descCat}>
                    <Text style={[fonts.rubik, styles.additionalText]}>Style</Text>
                    {/* @ts-ignore */}
                    <Text style={[fonts.rubik]}>{result.style_title}</Text>
                </View>
                
                {/* Long description */}
                {
                descriptionAvailable &&
                    <>
                        <ScrollView className="desc-cat" style={styles.descCat}>
                        <Text style={[fonts.rubik, styles.additionalText]}>Description</Text>
                        <RenderHTML source={descriptionText} tagsStyles={descStyles} />
                        </ScrollView>
                    
                    </>
                }
                
            </ScrollView>
        <Footer/>
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
        zIndex: 2,
    },
    
    artworkTitleText: {
        fontSize: 24,
    },
    descCat: {
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,

    }
});
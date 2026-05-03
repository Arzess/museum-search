import React from 'react';
import { useState } from 'react';
import { useFonts } from "expo-font";
import {StyleSheet, Text, View, Image} from 'react-native';
import { Rubik_400Regular, Rubik_500Medium, Rubik_600SemiBold, Rubik_700Bold } from "@expo-google-fonts/rubik";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Search } from '../components/searchmodal';
import { useRouter } from 'expo-router';
import { Footer } from '@/components/footer';

export default function App() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Rubik_400Regular, Rubik_500Medium, Rubik_600SemiBold, Rubik_700Bold
  });
  const [searchResult, setSearchResult] = useState([]);
  const router = useRouter();
  if (!fontsLoaded) {
    return null;
  }

  // API Search logic
  const reroute = (query: string, artist: string, start: string, 
    end: string, edu: boolean, view: boolean, rare: boolean) => {
      if (query){
        router.push({
          pathname: "/search/[query]",
          params: { 
            query: query,
            artist: artist,
            start: start,
            end: end,
            edu: edu ? 'true' : 'false',
            view: view ? 'true' : 'false',
            rare: rare ? 'true' : 'false',
          }
        });
      }
  }

  return (  
    <View style={styles.mainContainer}>
      {/* Searchbar and the heading */}
      <View style={styles.container}>
          <View className='header-container' style={styles.headerContainer}>
            <Image source={require('../assets/images/museum-search-icon.png')}></Image>
            <Text style={[styles.heading, fonts.rubikBold]}>Museum <Text style={colors.secondary}>Search</Text></Text>
            <Text style={[styles.headingAdditionalText, fonts.rubikMedium]}>Powered by Chicago API.</Text>
          </View>
          {/* Search logic */}
          <Search searchResult={searchResult} setSearchResult={setSearchResult} init={reroute}/>
    </View>
    <Footer isIndex={true}/>
    </View>
  );
}




// Stylesheets
export const colors = StyleSheet.create({
  primary: {
    color: '#60AED9',
  },
  secondary: {
    color: '#D13A38',
  },
  primary4: {
    color: '#84A7B9',
  },
  black: {
    color: 'black',
  },
  white: {
    color: 'white',

  },
});

export const fonts = StyleSheet.create({
  rubik: {
    fontSize: 16,
    fontFamily: 'Rubik_400Regular'    
  },
  rubikBold: {
    fontFamily: 'Rubik_700Bold'
  },
  rubikMedium: {
    fontFamily: 'Rubik_500Medium'
  },
  rubikSemi: {
    fontFamily: 'Rubik_600SemiBold'
  },
});


export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
  },
  heading: {
    fontSize: 32, 
  },
  headingAdditionalText: {
    fontSize: 12,
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingLeft: 16,
    paddingRight: 16,

  },
  searchBar: {
    width: '100%',
    fontFamily: 'Rubik_400Regular' 
  },
});

export const footerStyles = StyleSheet.create({
  footer: {
    gap: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 72,

  },
  // Copyright
  copyright: {
    backgroundColor: '#84A7B9',
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,

  },
  footerAdditionalText: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 14,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: 'center',
  }

})
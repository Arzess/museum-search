import React from 'react';
import { useState } from 'react';
import { useFonts } from "expo-font";
import {StyleSheet, Text, View, Image} from 'react-native';
import { Rubik_400Regular, Rubik_500Medium, Rubik_600SemiBold, Rubik_700Bold } from "@expo-google-fonts/rubik";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Search } from '../components/searchmodal';
import { useRouter } from 'expo-router';

export default function App() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Rubik_400Regular, Rubik_500Medium, Rubik_600SemiBold, Rubik_700Bold
  });
  const [searchResult, setSearchResult] = useState([]);
  // API Search logic
  const router = useRouter();
  const reroute = (query: string) => {
      router.push({
        pathname: "/search/[query]",
        params: { query: query }
      });
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
    {/* Footer */}
    <View className='footer' style={styles.footer}>
        <Text style={styles.footerAdditionalText}>This is a simple API search application to help you find infromation about the works of the Chicago University. Developed within the HCI course at the University of Vienna in SS2026.
<br/> Enjoy. </Text>
        
        <View style={styles.copyright}>
          <Text style={fonts.rubik}>Arsenii Malyshko © 2026</Text>
        </View>

    </View>
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


const styles = StyleSheet.create({
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
  // Footer styles
  footer: {
    gap: 16,
    paddingBottom: 64,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',

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
});
import React from 'react';
import { useFonts } from "expo-font";
import {StyleSheet, Text, View, Image} from 'react-native';
import { Rubik_400Regular, Rubik_500Medium, Rubik_600SemiBold, Rubik_700Bold } from "@expo-google-fonts/rubik";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SearchBar } from '../components/searchbar';



export const unstable_settings = {
  anchor: '(tabs)',
};

export default function App() {
  const colorScheme = useColorScheme();
    const [fontsLoaded] = useFonts({
    Rubik_400Regular, Rubik_500Medium, Rubik_600SemiBold, Rubik_700Bold
  });
  return (
    
    <View style={styles.mainContainer}>
      {/* Searchbar and the heading */}
      <View style={styles.container}>
          <View className='header-container' style={styles.headerContainer}>
            <Image source={require('../assets/images/museum-search-icon.png')}></Image>
            <Text style={[styles.heading, styles.rubikBold]}>Museum <Text style={styles.highlightedPrimary}>Search</Text></Text>
            <Text style={[styles.headingAdditionalText, styles.rubikMedium]}>Powered by <Text style={styles.highlightedSecondary}>Chicago API.</Text></Text>
          </View>
           {/* Searchbar */}
           <SearchBar
              placeholder="Search"
            />
    </View>
    {/* Footer */}
    <View className='footer' style={styles.footer}>
        <Text style={styles.footerAdditionalText}>This is a simple API search application to help you find infromation about the works of the Chicago University. Developed within the HCI course at the University of Vienna in SS2026.
<br/> Enjoy. </Text>
        
        <View style={styles.copyright}>
          <Text style={styles.rubik}>Arsenii Malyshko © 2026</Text>
        </View>

    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // General styles
  highlightedPrimary: {
    color: '#60AED9',
  },
  highlightedSecondary: {
    color: '#D13A38',
  },
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
  mainContainer: {
    backgroundColor: 'white',
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
    height: '100%',
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
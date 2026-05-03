import React from 'react'
import {Text, View} from 'react-native'
import {styles, fonts, colors, footerStyles} from '../app/index'



export const Copyright = () => {
    return (
        <View style={footerStyles.copyright}>
            <Text style={fonts.rubik}>Arsenii Malyshko © 2026</Text>
        </View>
    )
}
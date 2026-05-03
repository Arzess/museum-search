import React from 'react'
import {Text, View} from 'react-native'
import {styles, fonts, colors, footerStyles} from '../app/index'
import { Copyright } from './copyright'


export const Footer = ({isIndex = false} : {isIndex?: boolean}) => {
    return (
        <View className='footer' style={footerStyles.footer}>
                {
                    isIndex &&
                    <>
                        <Text style={footerStyles.footerAdditionalText}>
                            This is a simple API search application to help you find infromation about the works of the Chicago University. 
                            Developed within the HCI course at the University of Vienna in SS2026.
                        </Text>
                        <Text style={footerStyles.footerAdditionalText}>
                            Enjoy. 
                        </Text>
                    </>
                }
                <Copyright/>
        </View>
    )
}
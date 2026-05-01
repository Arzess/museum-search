import React from 'react'
import {StyleSheet, Pressable, Text} from 'react-native'
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import {colors, fonts} from '../app/index'



export const GenericButton = ({icon, iconName, textContent, isDisabled} 
    : {icon?: boolean, iconName: string, textContent: string, isDisabled?: boolean}) => {
    return (
        <Pressable style={styles.genericButton}>
            {icon && (<>
            <MaterialIcons name={iconName as any} color="white" size={18} />
            </>)}
            <Text style={[fonts.rubik, colors.white]}>
                {textContent}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create(
    {
        genericButton: {
            backgroundColor: '#D13A38',
            display: 'flex',
            gap: 8,
            paddingLeft: 16,
            paddingRight: 24,
            paddingTop: 10,
            paddingBottom: 10,

        },

    }
)
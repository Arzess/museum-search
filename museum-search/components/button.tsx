import React from 'react'
import {StyleSheet, Pressable, Text} from 'react-native'
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import {colors, fonts} from '../app/index'



export const GenericButton = ({icon, iconName, textContent, isDisabled, task} 
    : {icon?: boolean, iconName: string, textContent: string, isDisabled?: boolean, task?: Function}) => {
    return (
        <Pressable style={[styles.genericButton, isDisabled && styles.disabledButton]} disabled={isDisabled} onPress={task as any}>
            {icon && (<>
            <MaterialIcons name={iconName as any} color={isDisabled ? "#1D1B20" : "white"} size={18} style={isDisabled && styles.disabledIcon}/>
            </>)}
            <Text style={[fonts.rubik, colors.white, isDisabled && styles.disabledText]}>
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
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,

        },
        disabledIcon: {
            opacity: 0.38,
        },
        disabledText: {
            color: '#1D1B20',
            opacity: 0.38,
        },
        disabledButton: {
            backgroundColor: 'rgba(29, 27, 32, 0.12)',
            color: '#1D1B20',
        }

    }
)
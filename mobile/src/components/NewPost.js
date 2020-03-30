import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View, TextInput, TouchableOpacity, Text, AsyncStorage } from 'react-native'
import io from 'socket.io-client'

import api from '../services/api'
import baseUrl from '../services/baseUrl'

const { width } = Dimensions.get('window')

export default ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [newPost, setNewPost] = useState('')
    const [countCharacter, setCountCharacter] = useState(0)
    const [borderColor, setBorderColor] = useState('#BCBCBC')
    const [socket] = useState(() => io(baseUrl))

    useEffect(() => {
        (async () => {
            const data = await AsyncStorage.getItem('@username')
            if (!data) return navigation.navigate('Login')
            setUsername(data)
        })()
    }, [])

    function handleOnFocus() {
        setBorderColor('#00ACEE')
    }

    function handleOnChangeText(value) {
        if (value.length > 256) return
        setNewPost(value)
        setCountCharacter(value.length)
    }

    async function handleOnPress() {
        if (!newPost) return
        
        const data = { author: username, content: newPost }
        await api.post('/posts', { data })

        socket.emit('post')

        setNewPost('')
        setCountCharacter(0)
    }

    return (
        <>
            <TextInput 
            placeholder={'What\'s happening?'} 
            onFocus={handleOnFocus}
            style={[styles.input, { borderColor }]}
            value={newPost}
            onChangeText={handleOnChangeText}
            multiline={true}
            numberOfLines={4}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.characters}>{countCharacter}/256</Text>
                <TouchableOpacity 
                style={styles.button} 
                onPress={handleOnPress}
                >
                    <Text style={styles.textButton}>Post</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        color: '#333333',
        fontFamily: 'regular',
        width: width * .9,
        height: 116,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 20,
        marginBottom: 10,
        textAlignVertical: 'top',
        padding: 15
    },
    infoContainer: {
        width: width * .9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    characters: {
        color: '#333333',
        fontFamily: 'light',
        fontSize: 16,
        marginLeft: width * .025
    },
    button: {
        height: 48,
        width: width * .3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00ACEE',
        borderRadius: 5
    },
    textButton: {
        color: '#333333',
        fontFamily: 'bold',
        color: '#FFFFFF',
    }
})

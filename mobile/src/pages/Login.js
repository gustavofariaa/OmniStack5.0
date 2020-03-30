import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, View, Image, TextInput, TouchableOpacity, Text, AsyncStorage, Keyboard } from 'react-native'

const { width } = Dimensions.get('window')

export default ({ navigation }) => {
    const [load, setLoad] = useState(true)
    const [username, setUsername] = useState('')
    const [borderColor, setBorderColor] = useState('#BCBCBC')

    useEffect(() => {
        (async() => {
            const data = await AsyncStorage.getItem('@username')
            if (data) return navigation.navigate('Timeline', { setLoad })
            setLoad(false)
        })()
    }, [])

    function handleOnFocus() {
        setBorderColor('#00ACEE')
    }

    async function handleOnPress() {
        if (!username) return
        Keyboard.dismiss()
        await AsyncStorage.setItem('@username', username)
        setUsername('')
        navigation.navigate('Timeline', { setLoad })
    }

    return (
        <View style={styles.container}>
            {load 
            ? <></>
            : <>
                <Image style={styles.image} source={require('../assets/logo.png')} />
                <TextInput 
                placeholder={'User'} 
                onFocus={handleOnFocus}
                style={[styles.input, { borderColor }]}
                value={username}
                onChangeText={setUsername}
                />
                <TouchableOpacity 
                style={styles.button} 
                onPress={handleOnPress}
                >
                    <Text style={styles.textButton}>LOGIN</Text>
                </TouchableOpacity>
            </>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: width * .2,
        height: width * .2
    },
    input: {
        color: '#333333',
        fontFamily: 'regular',
        width: width * .9,
        height: 58,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        paddingLeft: 10,
        marginTop: 20,
        marginBottom: 10
    },
    button: {
        height: 58,
        width: width * .9,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00ACEE',
        borderRadius: 5
    },
    textButton: {
        color: '#333333',
        fontFamily: 'bold',
        color: '#FFFFFF'
    }
})

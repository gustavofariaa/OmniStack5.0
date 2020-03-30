import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, View, Image, AsyncStorage } from 'react-native'
import io from 'socket.io-client'

import api from '../services/api'
import baseUrl from '../services/baseUrl'

const { width } = Dimensions.get('window')

import NewPost from '../components/NewPost'
import Post from '../components/Post'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

export default ({ navigation, route }) => {
    const [posts, setPosts] = useState([])
    const [socket] = useState(() => io(baseUrl))

    useEffect(() => {
        (async () => {
            await retrievePosts()
            socket.on('updatePosts', () => retrievePosts())
        })()
    }, [])

    async function retrievePosts() {
        const { data } = await api.get('/posts')
        setPosts(data)
    }

    function handleOnPress() {
        const { setLoad } = route.params
        setLoad(false)

        AsyncStorage.clear()
        navigation.navigate('Login')
    }

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleOnPress}>
                    <Image style={styles.image} source={require('../assets/logo.png')} />
                </TouchableOpacity>
                <NewPost />
                {posts.map((post, index) => 
                    <Post key={index} post={post} borderBottomWidth={posts.length - 1 !== index ? 1 : 0}/>
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingBottom: 20
    },
    image: {
        width: width * .14,
        height: width * .14,
        marginTop: 50
    }
})

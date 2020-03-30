import React, { useState } from 'react'
import { Dimensions, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import moment from 'moment'
import io from 'socket.io-client'

import api from '../services/api'
import baseUrl from '../services/baseUrl'

const { width } = Dimensions.get('window')

export default ({ post, borderBottomWidth }) => {
    const [socket] = useState(() => io(baseUrl))

    async function handleLikeOnPress(_id) {
        await api.post('/likes', { _id })
        socket.emit('like')
    }

    return (
        <View style={[styles.container, { borderBottomWidth }]}>
            <View style={styles.headerContainer}>
                <Text style={styles.author}>{post.author}</Text>
                <Text style={styles.timeAgo}>{moment(post.createdAt).fromNow()}</Text>
            </View>
            <Text style={styles.post}>{post.content}</Text>
            <View style={styles.infoContainer}>
                <TouchableOpacity onPress={() => handleLikeOnPress(post._id)}>
                    <Image style={styles.image} source={require('../assets/heart.png')} />
                </TouchableOpacity>
                <Text style={styles.like}>{post.likes}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width * .85,
        borderBottomColor: '#E4E4E4',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20
    },
    author: {
        color: '#333333',
        fontFamily: 'medium',
        fontSize: 20
    },
    timeAgo: {
        color: '#333333',
        fontFamily: 'light',
        fontSize: 14
    },
    post: {
        color: '#333333',
        fontFamily: 'regular',
        fontSize: 16,
        width: '100%',
    },
    infoContainer: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 20
    },
    image: {
        width: width * .05,
        height: width * .05,
        marginRight: 10
    },
    like: {
        color: '#333333',
        fontFamily: 'light',
        fontSize: 14
    }
})

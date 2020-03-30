import React, { useEffect, useState } from 'react'
import * as Font from 'expo-font'

console.disableYellowBox = true

import Routes from './src/routes'

export default () => {
    const [load, setLoad] = useState(false)

    useEffect(() => {
        (async () => {
            await Font.loadAsync({
                'light': require('./src/assets/fonts/Montserrat-Light.ttf'),
                'medium': require('./src/assets/fonts/Montserrat-Medium.ttf'),
                'regular': require('./src/assets/fonts/Montserrat-Regular.ttf'),
                'bold': require('./src/assets/fonts/Montserrat-Bold.ttf')
            })
            setLoad(true)
        })()
    }, [])

    return (
        <> 
            { load
            ? <Routes /> 
            : <></> } 
        </>
    )
}

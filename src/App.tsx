import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import BootSplash from "react-native-bootsplash"
import MainScreen from './MainScrean'
import SplashVideo from './SplashVideo'

const MINIMUM_SPLASH_TIME = 3000;

const App = () => {
  const [mainScreenReady, setMainScreenReady] = useState(false)
  const [splashTimeoutDone, setSplashTimeoutDone] = useState(false)
  const [splashVideoEnded, setSplashVideoEnded] = useState(false)

  useEffect(() => {
    BootSplash.hide({ fade: true })

    const timer = setTimeout(() => setSplashTimeoutDone(true), MINIMUM_SPLASH_TIME);

    return () => clearTimeout(timer);
  }, [])

  const shouldShowSplash = !splashVideoEnded && (!mainScreenReady || !splashTimeoutDone)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainScreen onLoaded={() => setMainScreenReady(true)} />
      {shouldShowSplash && <SplashVideo
        onVideoEnd={() => setSplashVideoEnded(true)}
      />}
    </SafeAreaView>
  )
}

export default App

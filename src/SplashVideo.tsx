import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Video from 'react-native-video'

type Props = {
  onVideoEnd?(): void
}

const SplashVideo = ({ onVideoEnd }: Props) => {

  const handleVideoEnd = () => {
    if (onVideoEnd) {
      onVideoEnd()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Video
        source={require('../assets/splash.mp4')}
        style={styles.video}
        resizeMode="cover"
        controls={false}
        onEnd={handleVideoEnd}
        onError={(error) => console.log('Video Error:', error)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export default SplashVideo;
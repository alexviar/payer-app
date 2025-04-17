import WebView from 'react-native-webview'
import { useFetchAppSettings } from './useFetchAppSettings'
import { WebViewError } from './WebViewError'
import { useEffect, useRef, useState } from 'react'
import { WebViewLoader } from './WebViewLoader'
import { StyleSheet, View } from 'react-native'

type Props = {
  onLoaded(): void
}

const APP_ID = 14

const MainScreen = ({ onLoaded }: Props) => {
  const webViewRef = useRef<WebView>(null)
  const [loadProgress, setLoadProgress] = useState(0)

  // Inicializamos isLoading en true para capturar únicamente la carga inicial.
  // onLoadStart se dispara en cada cambio de ruta interno, por lo que no es útil para este caso.
  const [isLoading, setIsLoading] = useState(true)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      const timeoutId = setTimeout(() => {
        setShowLoader(false)
        onLoaded()
      }, 300)
      return () => clearTimeout(timeoutId)
    }
    setShowLoader(true)
  }, [isLoading])
  console.log(isLoading, showLoader)

  const { data } = useFetchAppSettings(APP_ID)

  if (!data) return

  return (
    <>
      <WebView
        ref={webViewRef}
        source={{ uri: data?.webUrl }}
        onLoadProgress={(event) => {
          if (!isLoading) return
          const progress = event.nativeEvent.progress
          setLoadProgress(progress)
        }}
        onLoadEnd={(e) => {
          setIsLoading(false)
          setLoadProgress(1)
        }}
        renderError={() => <WebViewError onRetry={() => {
          setIsLoading(true)
          setLoadProgress(0)
          webViewRef.current?.reload()
        }} />}
      />

      {/* 
        Renderizamos el Loader condicionalmente en lugar de usar la prop `renderLoading` para prevenir el bug 
        reportado en https://github.com/react-native-webview/react-native-webview/issues/563#issuecomment-715503350 
      */}
      {showLoader && (
        <View style={StyleSheet.absoluteFillObject}>
          <WebViewLoader progress={loadProgress} />
        </View>
      )}
    </>
  )
}

export default MainScreen
import WebView from 'react-native-webview'
import { useFetchAppSettings } from './useFetchAppSettings'
import { WebViewError } from './WebViewError'
import { useRef } from 'react'

type Props = {
  onLoaded(): void
}

const APP_ID = 14

const MainScreen = ({ onLoaded }: Props) => {
  const webViewRef = useRef<WebView>(null)

  const { data } = useFetchAppSettings(APP_ID)

  if (!data) return

  return (
    <>
      <WebView
        ref={webViewRef}
        source={{ uri: data?.webUrl }}
        onLoadEnd={() => {
          onLoaded()
        }}
        renderError={() => <WebViewError onRetry={() => webViewRef.current?.reload()} />}
      />
    </>
  )
}

export default MainScreen
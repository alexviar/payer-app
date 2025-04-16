import WebView from 'react-native-webview'
import { useFetchAppSettings } from './useFetchAppSettings'

type Props = {
  onLoaded(): void
}

const APP_ID = 14

const MainScreen = ({ onLoaded }: Props) => {

  const { data } = useFetchAppSettings(APP_ID)

  if (!data) return

  return (
    <>
      <WebView
        source={{ uri: data?.webUrl }}
        onLoadEnd={() => {
          onLoaded()
        }}
      />
    </>
  )
}

export default MainScreen
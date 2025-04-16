import { useEffect } from "react"
import { Text } from "react-native"

type Props = {
  onLoaded(): void
}

const MainScreen = ({ onLoaded }: Props) => {
  useEffect(() => {
    setTimeout(onLoaded, 500)
  }, [])
  return null
}

export default MainScreen
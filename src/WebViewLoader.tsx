import { Animated, StatusBar, StyleSheet, Text, View } from 'react-native'
import { WifiOff } from './icons/WifiOff'
import { Bar } from 'react-native-progress'
import { Router } from './icons/Router'

type Props = {
  progress: number
}

export const WebViewLoader = ({ progress }: Props) => {


  // Animación de pulso
  const pulseAnimation = {
    transform: [{
      scale: new Animated.Value(1)
    }],
  }

  // Iniciar animación
  Animated.loop(
    Animated.sequence([
      Animated.timing(pulseAnimation.transform[0].scale, {
        toValue: 1.2,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(pulseAnimation.transform[0].scale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      })
    ])
  ).start()

  return (
    <View style={[StyleSheet.absoluteFill, styles.loadingContainer]} >
      <StatusBar backgroundColor='#F8F9FA' barStyle='dark-content' />

      {/* Contenedor de la animación */}
      < View style={styles.loadingContent} >
        {/* Icono animado */}
        < Animated.View style={[styles.loadingIcon, pulseAnimation]} >
          <Router width={60} height={60} color='#dc3545' />
        </Animated.View>

        {/* Barra de progreso */}
        <Bar
          progress={progress}
          width={200}
          color='#dc3545'
          borderWidth={0}
          unfilledColor='rgba(220, 53, 69, 0.2)'
          borderRadius={8}
          animated={true}
        />

        {/* Textos informativos */}
        <Text style={styles.loadingTitle} > Cargando aplicación </Text>
        <Text style={styles.loadingSubtitle} >
          {progress ? `${Math.round(progress * 100)}% completado` : 'Iniciando...'}
        </Text>
      </View>
    </View>
  )
}
// Estilos
const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    gap: 20,
  },
  loadingIcon: {
    marginBottom: 15,
  },
  loadingTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#343A40',
  },
  loadingSubtitle: {
    fontSize: 14,
    color: '#6C757D',
  },
});
import {StyleSheet, Text, View, Dimensions, SafeAreaView} from 'react-native';
import MediaCarousel from "./src/components/molecules/MediaCarousel";



export default function App() {
    const testAssets = [
      {
        uri: "https://media.istockphoto.com/id/2166782936/photo/students-doing-an-experiment-on-classroom-on-school.jpg?s=1024x1024&w=is&k=20&c=YuaeoDO2lHf1X4bXsOFO2-BiykU1YLTmxmsOHaBJ6m0=",
        type: "image"
      },
      {
        uri: "https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "image"
      }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <MediaCarousel assets={testAssets} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

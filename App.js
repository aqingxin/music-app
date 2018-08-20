import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading, Asset } from 'expo';

export default class App extends React.Component {
  state={
    isReady:false
  }
  async _loadAssetsAsync(){
    const imageAssets=cacheImages([
      require('./assets/next.png'),
      require('./assets/pause.png'),
      require('./assets/play.png'),
      require('./assets/prev.png'),
      require('./assets/loading.gif'),
      require('./assets/download.png'),
      require('./assets/delete.png'),
      require('./assets/return.png'),
    ]);
    await Promise.all([...imageAssets]);
  }
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
      // <AppLoading startAsync={this._loadResourcesAsync} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

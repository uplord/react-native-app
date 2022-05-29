import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import Constants from 'expo-constants';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ width:'100%', height:"100%"}}>
        <WebView
          source={{ uri: 'https://www.themichael.co.uk/projects/shop-test/' }}
          onShouldStartLoadWithRequest={event => {
            if (event.url == 'https://www.themichael.co.uk/projects/shop-test/checkout.php') {
              openBrowserAsync(event)
              return false
            } else {
              return true
            }
          }}
        >
        </WebView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

async function openBrowserAsync(event) {
  addLinkingListener()

  let result = await WebBrowser.openBrowserAsync(
    `${event.url}?linkingUri=${Linking.createURL("/?")}`
  );

  if (Constants.platform.ios) {
    removeLinkingListener()
  }
}

function handleRedirect(event) {
  if (Constants.platform.ios) {
    WebBrowser.dismissBrowser();
  } else {
    removeLinkingListener();
  }

  let data = Linking.parse(event.url);
  alert(data.queryParams.success)
}

function addLinkingListener() {
  window.testing = Linking.addEventListener("url", handleRedirect);
}

function removeLinkingListener() {
  window.testing.remove()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

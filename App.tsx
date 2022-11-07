import React from 'react';
import {StyleSheet, View} from 'react-native';

// import Teams from './components/Teams/Teams';
import {Colors} from './tools/colors';
import {ColorProvider} from './contexts/Color/colorContext';
import {UserIDProvider, useUserID} from './contexts/User/userContext';
import {TabIDProvider} from './contexts/Tab/tabIDContext';
import CurrentTabPage from './components/TabPage/CurrentTabPage';

export default function App() {
  const userID = useUserID();

  console.log('======================== App Start ========================');
  return (
    <ColorProvider>
      <UserIDProvider /* login page or children*/>
        <TabIDProvider>
          <View style={styles.pageWrap}>
            <View style={styles.body}>
              <CurrentTabPage />
            </View>
          </View>
        </TabIDProvider>
      </UserIDProvider>
    </ColorProvider>
  );
}

const styles = StyleSheet.create({
  pageWrap: {
    flex: 1,
    backgroundColor: 'black',
  },

  body: {
    flex: 1,
    // borderRadius: 30,
    backgroundColor: Colors.foreground.light,
  },

  currentPage: {
    flex: 20,
  },

  navBar: {
    flex: 1,
  },
});

export default interface INavButton {
  key?: number;
  name?: string;
  image?: any;
  color?: string;
  style?: object;
}

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

export function NavButton(props: {
  navButton: INavButton;
  callback: (key: number) => void;
}) {
  var image = props.navButton.image;
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        onPress={() => {
          props.callback(props.navButton.key ?? 0);
        }}>
        <View style={[props.navButton.style, styles.button]}>
          <Image style={styles.image} source={image} />
          <Text>{props.navButton.name}</Text>
          {/* <Image
            style={styles.image}
            source={require('../../assets/user-icon_default.png')}
          /> */}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    // padding: 10,
    // height: 100,
    height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: 100,
    // textAlignVertical: 'auto',
    // flex: 1,
    // fontStyle: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor: 'green',
    // margin: 10,
    // padding: 10,
    // backgroundColor: '#555555',
    // borderStyle: "solid",
    // borderWidth: 2,
    // borderColor: '#c3c3c3',
    // borderRadius: 10,
  },
  navbar: {
    // bottom: 0,
    // height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 1,
    flex: 1,
    // flexDirection: 'column',
  },
  image:{ 
    // justifyContent: 'center',
    width: 15,
    height: 15,
    // marginTop:10,
    // width: '100%',
    // height: '100%',
    // backgroundColor: 'blue',
  },
}) 
export default interface INavButton {
  key?: number;
  name?: string;
  image?: any;
  color?: string;
  style?: object;
}

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
  tabid: number;
}) {
  var image = props.navButton.image;
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        onPress={() => {
          props.callback(props.navButton.key ?? 0);
        }}>
        <View style={ props.navButton.key == props.tabid ?
          [props.navButton.style, styles.buttonFocused] :
          [props.navButton.style, styles.button]
          }>
          <Image style={styles.image} source={image} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonFocused: {
    display: 'flex',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'lightgray',
    justifyContent: 'center',
    borderRadius: 20,
    height: '100%',
    marginHorizontal: 5,
  },
  button: {

    display: 'flex',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    borderRadius: 20,
    height: '100%',
    marginHorizontal: 5,
  },
  navbar: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: 20,
    height: 20,
  },
}); 
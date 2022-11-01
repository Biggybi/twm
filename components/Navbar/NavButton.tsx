import {useColorUpdate} from '../../contexts/Color/colorContext';
export default interface INavButton {
  key: number;
  name: string;
  iconActive?: JSX.Element;
  iconInactive?: JSX.Element;
  color: string;
}

import {useTabID, useTabIDUpdate} from '../../contexts/Tab/tabIDContext';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useEffect} from 'react';
import {Colors} from '../../tools/colors';

const isActive = (tabid: number, activetabid: number) => activetabid == tabid;

const colorDark = (color: string) => {
  return Colors[color].light;
};
const colorLight = (color: string) => {
  return Colors[color].dark;
};

export function NavButton(props: {navButton: INavButton; width?: number}) {
  const tabID = useTabID();
  const toggleColor = useColorUpdate() as unknown as (s: string) => string;
  const toggleTabID = useTabIDUpdate() as unknown as (s: number) => string;;
  useEffect(() => {
    // apply color for current tab
    // console.log("key", props.navButton.key, "tabid", props.tabid)
    if (props.navButton.key === tabID) toggleColor(props.navButton.color);
  }, [tabID]);
  return (
    <TouchableOpacity
      style={{width: props.width}}
      onPress={() => {
        toggleColor(props.navButton.color);
        toggleTabID(props.navButton.key);
        // props.callback(props.navButton.key);
      }}>
      {isActive(tabID, props.navButton.key) ? (
        // Active
        <View
          style={[
            styles.buttonActive,
            {
              backgroundColor: colorDark(props.navButton.color),
              borderColor: colorLight(props.navButton.color),
            },
          ]}>
          {props.navButton.iconActive}
        </View>
      ) : (
        // Inactive
        <View style={[
            styles.buttonInactive ,
          ]}>
          {props.navButton.iconInactive}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonActive: {
    alignItems: 'center',
    borderTopWidth: 4,
    justifyContent: 'center',
    height: '100%',
  },

  buttonInactive: {
    borderColor: Colors.background.light,
    alignItems: 'center',
    borderTopWidth: 4,
    justifyContent: 'center',
    height: '100%',
  },
});

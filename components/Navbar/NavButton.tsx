import {useColorUpdate} from '../../contexts/Color/colorContext';
export default interface INavButton {
  key: number;
  name: string;
  iconActive: JSX.Element;
  iconInactive: JSX.Element;
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

interface Props {
  navButton: INavButton;
  width: number;
}

export function NavButton({navButton, width}: Props) {
  const tabID = useTabID();
  const toggleColor = useColorUpdate();
  const toggleTabID = useTabIDUpdate();

  const styles = StyleSheet.create({
    active: {
      backgroundColor: colorDark(navButton.color),
      borderColor: colorLight(navButton.color),
      borderTopWidth: 4,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },

    inactive: {
      paddingTop: 4,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
  });

  // apply color for current tab
  useEffect(() => {
    if (navButton.key === tabID) toggleColor(navButton.color);
  }, [tabID]);

  return (
    <TouchableOpacity
      style={{width: width}}
      onPress={() => {
        toggleColor(navButton.color);
        toggleTabID(navButton.key);
      }}>
      {isActive(tabID, navButton.key) ? (
        <View style={styles.active}>{navButton.iconActive}</View>
      ) : (
        <View style={[styles.inactive]}>{navButton.iconInactive}</View>
      )}
    </TouchableOpacity>
  );
}

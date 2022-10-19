import {StyleSheet, FlatList, View} from 'react-native';

import INavButton, {NavButton} from './NavButton';

type TNavBarList = Array<INavButton>;

// definition of navbar items
let navBarItems: TNavBarList = [
  {
    key: 0,
    name: 'home',
    image: require('../../assets/icons/home.png'),
    style: {
      // borderWidth: 4,
      // backgroundColor: 'red',
      // borderColor: 'darkred',
      // borderRadius: 20,
      // height: '100%',
    },
  },
  {
    key: 1,
    name: 'planning',
    image: require('../../assets/icons/calendar.png'),
    style: {
      // borderWidth: 4,
      // backgroundColor: 'pink',
      // borderColor: 'magenta',
      // borderRadius: 20,
      // height: '100%',
      // marginHorizontal: 5,
    },
  },
  {
    key: 2,
    name: 'teams',
    image: require('../../assets/icons/users-alt.png'),
    style: {
      // borderWidth: 4,
      // backgroundColor: 'blue',
      // borderColor: 'darkblue',
      // borderRadius: 20,
      // height: '100%',
      // marginHorizontal: 5,
    },
  },
  {
    key: 3,
    name: 'people',
    image: require('../../assets/icons/users.png'),
    style: {
      // borderWidth: 4,
      // backgroundColor: 'magenta',
      // borderColor: 'purple',
      // borderRadius: 20,
      // height: '100%',
      // marginHorizontal: 5,
    },
  },
  {
    key: 4,
    name: 'profile',
    image: require('../../assets/icons/settings.png'),
    style: {
      // borderWidth: 4,
      // backgroundColor: 'yellow',
      // borderColor: 'darkorange',
      // borderRadius: 20,
      // height: '100%',
      // marginHorizontal: 5,
    },
  },
];

export default function Navbar(props: {
  callback: (key: number) => void;
  tabid: number;
}) {
  return (
    <View>
      <FlatList
        // horizontal={true}
        // onViewableItemsChanged={onViewableItemsChanged}
        columnWrapperStyle={styles.listColumnWrapper}
        numColumns={navBarItems.length}
        // keyExtractor={navBarItems => navBarItems.key}
        data={navBarItems}
        renderItem={navBarItems => (
          <NavButton
            navButton={{...navBarItems.item}}
            callback={props.callback}
            tabid={props.tabid}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listColumnWrapper: {
    height: 50,
  },
});

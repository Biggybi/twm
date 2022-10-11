import {
  StyleSheet,
  FlatList,
} from 'react-native';

import INavButton, {NavButton } from './NavButton';

type TNavBarList = Array<INavButton>;

// definition of navbar items
let navBarItems: TNavBarList = [
  {
    key: 0,
    name: 'home',
    image: require('../../assets/icons/home.png'),
    style: {
      backgroundColor: 'red',
    },
  },
  {
    key: 1,
    name: 'planning',
    image: require('../../assets/icons/calendar.png'),
    style: {
      backgroundColor: 'pink',
    },
  },
  {
    key: 2,
    name: 'teams',
    image: require('../../assets/icons/users-alt.png'),
    style: {
      backgroundColor: 'blue',
    },
  },
  {
    key: 3,
    name: 'people',
    image: require('../../assets/icons/users.png'),
    style: {
      backgroundColor: 'purple',
    },
  },
  {
    key: 4,
    name: 'profile',
    image: require('../../assets/icons/settings.png'),
    style: {
      backgroundColor: 'orange',
    },
  },
];

export default function Navbar(props: {callback: (key: number) => void}) {
  return (
    <FlatList
      // horizontal={true}
      // onViewableItemsChanged={onViewableItemsChanged}
      columnWrapperStyle={styles.listColumnWrapper}
      numColumns={navBarItems.length}
      // keyExtractor={navBarItems => navBarItems.key}
      data={navBarItems}
      renderItem={navBarItems => {
        var item: INavButton = {...navBarItems.item};
        return <NavButton navButton={item} callback={props.callback} />;
      }}
    />
  );
}

const styles = StyleSheet.create({
  listColumnWrapper: {
    height: 70,
    margin: 0,
    padding: 0,
  },
});

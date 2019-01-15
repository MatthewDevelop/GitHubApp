/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import Icon from './js/common/IconFont';
import Hot from './js/page/Hot';
import Trending from './js/page/Trending';
import Collect from './js/page/Collect';
import UserProfile from './js/page/UserProfile';
import CustomTagPage from './js/page/CustomTagPage';
import SortKeyPage from './js/page/SortKeyPage';
import RepositoryDetailPage from './js/page/RepositoryDetailPage';
// import WebViewTest from './js/test/WebViewTest';
import { ThemeColor } from './js/utils/Consts';

const tabNavigator = createBottomTabNavigator({
  HotPage: {
    screen: Hot,
    navigationOptions: {
      tabBarLabel: '热门',
    }
  },
  TrendingPage: {
    screen: Trending,
    navigationOptions: {
      tabBarLabel: '趋势',
    }
  },
  CollectPage: {
    screen: Collect,
    navigationOptions: {
      tabBarLabel: '收藏',
    }
  },
  UserPage: {
    screen: UserProfile,
    navigationOptions: {
      tabBarLabel: '我的',
    }
  },
}, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({
        horizontal, tintColor
      }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'HotPage') {
          iconName = 'icon_hot';
        } else if (routeName === 'TrendingPage') {
          iconName = 'icon_trending';
        } else if (routeName === 'CollectPage') {
          iconName = 'icon_collect';
        } else if (routeName === 'UserPage') {
          iconName = 'icon_user';
        }
        return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: ThemeColor,
      inactiveTintColor: 'gray',
    },
  })

tabNavigator.navigationOptions = ({ navigation }) => {
  const { index } = navigation.state;
  const { routeName } = navigation.state.routes[index];
  headerTitle = '';

  switch (routeName) {
    case 'HotPage':
      headerTitle = '热门';
      break;
    case 'TrendingPage':
      headerTitle = '趋势';
      break;
    case 'CollectPage':
      headerTitle = '收藏';
      break;
    case 'UserPage':
      headerTitle = '我的';
      break;
    default:
      break
  }
  return {
    headerTitle,
  }
}
const stackNavigator = createStackNavigator(
  {
    tab: {
      screen: tabNavigator,
      navigationOptions: {
        header: null
      }
    },
    tagPage: {
      screen: CustomTagPage,
    },
    tagSortPage: {
      screen: SortKeyPage,
    },
    repoDetailPage: {
      screen: RepositoryDetailPage,
    }
  }
);

export default createAppContainer(stackNavigator);



/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from './js/common/IconFont';
import Hot from './js/page/Hot';
import Trending from './js/page/Trending';
import Collect from './js/page/Collect';
import UserProfile from './js/page/UserProfile';



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
      activeTintColor: 'lightgreen',
      inactiveTintColor: 'gray',
    },
  })

export default createAppContainer(tabNavigator);



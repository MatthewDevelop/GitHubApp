import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar';
import {ThemeColor} from '../utils/Consts';

class Trending extends Component {
    render() {
        return (
            <View style={styles.pageTrending}>
                <NavigationBar
                    title='Trending'
                    style={{
                        backgroundColor: ThemeColor,
                    }}
                    statusBar={{
                        backgroundColor: ThemeColor
                    }} />
            </View>
        );
    }
}
export default Trending;
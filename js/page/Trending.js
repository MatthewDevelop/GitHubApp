import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar'

class Trending extends Component {
    render() {
        return (
            <View style={styles.pageTrending}>
                <NavigationBar
                    title='Trending'
                    style={{
                        backgroundColor: 'lightgreen',
                    }}
                    statusBar={{
                        backgroundColor: 'lightgreen'
                    }} />
            </View>
        );
    }
}
export default Trending;
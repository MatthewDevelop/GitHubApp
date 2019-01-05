import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar';
import {ThemeColor} from '../utils/Consts';

class Collect extends Component {
    render() {
        return (
            <View style={styles.pageCollect}>
                <NavigationBar
                    title='Collect'
                    style={{
                        backgroundColor: ThemeColor,
                    }}
                    statusBar={{
                        backgroundColor: ThemeColor,
                    }} />
            </View>
        );
    }
}



export default Collect;
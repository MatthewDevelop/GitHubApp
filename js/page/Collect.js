import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar';

class Collect extends Component {
    render() {
        return (
            <View style={styles.pageCollect}>
                <NavigationBar
                    title='Collect'
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



export default Collect;
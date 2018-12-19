import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar';

class Hot extends Component {
    render() {
        return (
            <View style={styles.pageHot}>
                <NavigationBar
                    title='Hot'
                    style={{
                        backgroundColor: 'lightgreen',
                    }} 
                    statusBar={{
                        backgroundColor:'lightgreen'
                    }}/>
            </View>
        );
    }
}

export default Hot;
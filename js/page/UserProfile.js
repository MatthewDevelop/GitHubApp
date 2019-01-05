import React, { Component } from 'react';
import { View, Button } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar';

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }


    toCustomTagPage() {
        this.navigation.push('tagPage');
    }

    render() {
        return (
            <View style={styles.pageUserProfile}>
                <NavigationBar
                    title='我的'
                    style={{
                        backgroundColor: 'lightgreen',
                    }}
                    statusBar={{
                        backgroundColor: 'lightgreen'
                    }} />
                <View style={{ margin: 10 }}>
                    <Button title='自定义标签' onPress={() => this.toCustomTagPage()} />
                </View>
            </View>
        );
    }
}

export default UserProfile;
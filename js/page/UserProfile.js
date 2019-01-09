import React, { Component } from 'react';
import { View, Button } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar';
import { ThemeColor } from '../utils/Consts';

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }


    toCustomTagPage() {
        this.navigation.push('tagPage');
    }

    toTagSortPage() {
        this.navigation.push('tagSortPage');
    }

    render() {
        return (
            <View style={styles.pageUserProfile}>
                <NavigationBar
                    title='我的'
                    style={{
                        backgroundColor: ThemeColor,
                    }}
                    statusBar={{
                        backgroundColor: ThemeColor,
                    }} />
                <View style={{ margin: 10 }}>
                    <Button title='自定义标签' onPress={() => this.toCustomTagPage()} />
                </View>
                <View style={{ margin: 10 }}>
                    <Button title='标签排序' onPress={() => this.toTagSortPage()} />
                </View>
            </View>
        );
    }
}

export default UserProfile;
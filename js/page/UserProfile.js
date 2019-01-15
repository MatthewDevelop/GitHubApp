import React, { Component } from 'react';
import { View, Button } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar';
import { ThemeColor } from '../utils/Consts';
import { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }


    toCustomTagPage() {
        this.navigation.navigate('tagPage', {
            flag: FLAG_LANGUAGE.flag_key,
        });
    }

    toCustomLanguagePage() {
        this.navigation.navigate('tagPage', {
            flag: FLAG_LANGUAGE.flag_language,
        });
    }

    toTagSortPage() {
        this.navigation.navigate('tagSortPage');
    }

    toTagRemovePage() {
        this.navigation.navigate('tagPage', {
            isRemoveKey: true,
        });
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
                    <Button title='自定义语言' onPress={() => this.toCustomLanguagePage()} />
                </View>
                <View style={{ margin: 10 }}>
                    <Button title='标签排序' onPress={() => this.toTagSortPage()} />
                </View>
                <View style={{ margin: 10 }}>
                    <Button title='移除标签' onPress={() => this.toTagRemovePage()} />
                </View>
            </View>
        );
    }
}

export default UserProfile;
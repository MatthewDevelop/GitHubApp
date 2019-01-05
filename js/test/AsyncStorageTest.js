import React, { Component } from 'react';
import { View, TextInput, AsyncStorage, Button } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar';
import ToastUtil from '../utils/ToastUtil';

class AsyncStorageTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: "",
        }
    }

    onSave() {
        AsyncStorage.setItem('KEY', this.text, (error) => {
            if (!error) {
                ToastUtil.show('保存成功');
            } else {
                ToastUtil.show('保存失败');
            }
        })
    }

    onRemove() {
        AsyncStorage.removeItem('KEY', (error) => {
            if (!error) {
                ToastUtil.show('移除成功');
            } else {
                ToastUtil.show('移除失败');
            }
        })
    }

    onFetch() {
        AsyncStorage.getItem('KEY', (error, result) => {
            if (!error) {
                if (!result == '' && result != null) {
                    ToastUtil.show(`取出的内容为：${result}`);
                } else {
                    ToastUtil.show(`内容不存在`);
                }

            } else {
                ToastUtil.show('取出失败');
            }
        })
    }

    render() {
        return (
            <View style={styles.pageHot}>
                <NavigationBar
                    title='AsyncStorage'
                    style={{
                        backgroundColor: 'lightgreen',
                    }}
                    statusBar={{
                        backgroundColor: 'lightgreen'
                    }} />

                <TextInput style={{ margin: 10, height: 40, borderWidth: 1 }} onChangeText={(text) => this.text = text} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button title='保存' onPress={() => this.onSave()} />
                    <Button title='移除' onPress={() => this.onRemove()} />
                    <Button title='取出' onPress={() => this.onFetch()} />
                </View>

            </View>
        );
    }
}

export default AsyncStorageTest;
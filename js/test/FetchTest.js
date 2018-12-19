import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar';
import HttpUtils from '../utils/HttpUtils';

class FetchTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: "",
        }
    }


    get(url) {
        HttpUtils.get(url)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            });
    }

    post(url, data) {
        HttpUtils.post(url, data)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            });
    }

    render() {
        return (
            <View style={styles.pageHot}>
                <NavigationBar
                    title='Fetch'
                    style={{
                        backgroundColor: 'lightgreen',
                    }}
                    statusBar={{
                        backgroundColor: 'lightgreen'
                    }} />

                <Text onPress={() => this.get('http://rap2api.taobao.org/app/mock/121770/getData')}>获取数据</Text>
                <Text onPress={() => this.post('http://rap2api.taobao.org/app/mock/121770/submit',
                    { userName: 'Matthew', password: '123456' })}>提交数据</Text>
                <Text >{`请求结果:${this.state.result}`}</Text>
            </View>
        );
    }
}

export default FetchTest;
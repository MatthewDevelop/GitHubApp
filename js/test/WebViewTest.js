import React, { Component } from 'react';
import { View, TextInput, WebView, Text } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar';
import ToastUtil from '../utils/ToastUtil';


const URL = 'https://www.baidu.com';
class WebViewTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: URL,
            title: '',
            canGoBack: false,
        };
    }

    goBack() {
        if (this.state.canGoBack) {
            this.webview.goBack();
        } else {
            ToastUtil.show('到头了~');
        }
    }

    go() {
        console.log(this.text);
        this.setState({
            url: this.text,
        })
    }

    onNavigationStateChange(state) {
        this.setState({
            title: state.title,
            canGoBack: state.canGoBack,
        });
    }

    render() {
        return (
            <View style={styles.pageHot}>
                <NavigationBar
                    title={this.state.title}
                    style={{
                        backgroundColor: 'lightgreen',
                    }}
                    statusBar={{
                        backgroundColor: 'lightgreen'
                    }} />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 3
                }}>
                    <Text style={{ margin: 3 }} onPress={() => this.goBack()}>返回</Text>
                    <TextInput style={{
                        margin: 10,
                        height: 40,
                        borderWidth: 1,
                        flex: 1
                    }} defaultValue={URL} onChangeText={(text) => this.text = text} />
                    <Text style={{ margin: 3 }} onPress={() => this.go()}> 前往</Text>
                </View>
                <WebView
                    ref={webview => this.webview = webview}
                    source={{ uri: this.state.url }} onPress={() => this.go()}
                    onNavigationStateChange={state => this.onNavigationStateChange(state)} />

            </View>
        );
    }
}

export default WebViewTest;
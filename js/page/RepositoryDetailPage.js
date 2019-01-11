import React, { Component } from 'react';
import { View, TextInput, WebView, Text } from 'react-native';
import styles from '../utils/Styles';
import { ThemeColor } from '../utils/Consts';
import IconFont from '../common/IconFont';


const URL = 'https://www.baidu.com';
class RepositoryDetailPage extends Component {

    static navigationOptions = ({ navigation }) => {
        return ({
            headerTitle: navigation.getParam('title'),
            headerStyle: {
                backgroundColor: ThemeColor,
            },
            headerTitleStyle: {
                color: 'rgba(0,0,0,0.5)',
            },
            // headerRight: <Text
            //     style={{
            //         fontSize: 18,
            //         marginRight: 5,
            //     }}
            //     onPress={navigation.getParam('close')}
            // >关闭</Text>,
            headerLeft: <IconFont
                style={{
                    marginLeft: 10,
                }}
                size={30}
                name='icon_back'
                color='rgba(0,0,0,0.6)'
                onPress={navigation.getParam('back')}
            />,
        });
    }

    constructor(props) {
        super(props);
        this.item = this.props.navigation.getParam('item');
        let title = this.item.full_name;
        this.url = this.item.html_url;
        this.state = {
            url: this.url,
            canGoBack: false,
            title: title,
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            back: this.back,
            title: this.state.title,
            // close: this.close,
        });
    }

    // close = () => {
    //     this.props.navigation.pop();
    // }

    back = () => {
        if (this.state.canGoBack) {
            this.webview.goBack();
        } else {
            this.props.navigation.pop();
        }
    }

    onNavigationStateChange(state) {
        this.setState({
            canGoBack: state.canGoBack,
        });
    }

    render() {
        return (
            <View style={styles.pageHot}>
                <WebView
                    ref={webview => this.webview = webview}
                    source={{ uri: this.state.url }}
                    onNavigationStateChange={state => this.onNavigationStateChange(state)}
                    // 添加加载框
                    startInLoadingState={true} />
            </View>
        );
    }
}

export default RepositoryDetailPage;
import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import styles from '../utils/Styles';
import { ThemeColor } from '../utils/Consts';
import IconFont from '../common/IconFont';


const TRENDING_URL = 'https://github.com';
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
            headerRight: <IconFont
                name='icon_collect'
                size={25}
                color={navigation.getParam('isCollect') ? 'red' : 'gray'}
                style={{ marginRight: 10 }}
                onPress={navigation.getParam('collect')}
            />,
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
        this.collectDao = this.props.navigation.getParam('collectDao');
        this.item = this.props.navigation.getParam('projectModel').item;
        this.title = this.item.full_name ? this.item.full_name : this.item.fullName;
        this.url = this.item.html_url ? this.item.html_url : TRENDING_URL + this.item.url;
        this.isCollect = this.props.navigation.getParam('projectModel').isCollect;
        this.originCollectState = this.props.navigation.getParam('projectModel').isCollect
        this.state = {
            canGoBack: false,
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            back: this.back,
            collect: this.collect,
            title: this.title,
            isCollect: this.isCollect,
        });
    }

    collect = () => {
        this.isCollect = !this.isCollect;
        let key = this.item.id ? this.item.id.toString() : this.item.fullName;
        if (this.isCollect) {
            this.collectDao.collect(key, JSON.stringify(this.item));
        } else {
            this.collectDao.unCollect(key);
        }
        this.props.navigation.setParams({
            isCollect: this.isCollect,
        });
    }


    back = () => {
        if (this.state.canGoBack) {
            this.webview.goBack();
        } else {
            this.props.navigation.state.params.callback(!(this.originCollectState === this.isCollect));
            this.props.navigation.goBack();
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
                    source={{ uri: this.url }}
                    onNavigationStateChange={state => this.onNavigationStateChange(state)}
                    // 添加加载框
                    startInLoadingState={true} />
            </View>
        );
    }
}

export default RepositoryDetailPage;
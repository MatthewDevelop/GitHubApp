import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import DataRepository from '../expand/dao/DataRepository';
import RepositoryItem from '../common/RepositoryItem';
import Loading from '../common/Loading';
import { ThemeColor } from '../utils/Consts';
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';
import ToastUtil from '../utils/ToastUtil';


const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

class Hot extends Component {

    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language_key);
        this.state = {
            language: [],
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    language: result,
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        let content = this.state.language.length > 0 ?
            <ScrollableTabView
                tabBarBackgroundColor={ThemeColor}
                renderTabBar={() => <ScrollableTabBar />}>
                {this.state.language.map((result, i, arr) => {
                    let item = arr[i];
                    return item.checked ? <HotTab key={i} tabLabel={item.name} path={item.path} {...this.props} /> : null;
                })}
            </ScrollableTabView> : null;
        return (
            <View style={styles.pageHot}>
                <NavigationBar
                    title='热门'
                    style={{
                        backgroundColor: ThemeColor,
                    }}
                    statusBar={{
                        backgroundColor: ThemeColor
                    }} />
                {content}
            </View>
        );
    }
}


class HotTab extends Component {

    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.state = {
            result: [],
            loaded: false,
            isRefresh: false,
        }
    }

    componentDidMount() {
        this.fetchData(this.props.path);
    }

    fetchData(key) {
        this.setState({
            isRefresh: true
        })
        let url = URL + key + QUERY_STR;
        this.dataRepository.fetchRepository(url)
            .then(result => {
                let items = result && result.items ? result.items : result ? result : [];
                //首先将数据关联到组件
                this.setState({
                    loaded: true,
                    result: items,
                    isRefresh: false
                });
                //再判断数据是否过期
                // console.log(result);
                // console.log(result.update_date);
                if (result && result.update_date && !this.dataRepository.checkDate(result.update_date)) {
                    ToastUtil.show('数据过期');
                    this.setState({
                        isRefresh: true
                    });
                    return this.dataRepository.fetchNetRepository(url);
                } else {
                    ToastUtil.show('缓存数据');
                }
            })
            .then(items => {
                // console.log(items);
                if (!items || items.length === 0) return;
                ToastUtil.show('网络数据');
                this.setState({
                    result: items,
                    isRefresh: false
                });
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                });
            });
    }

    renderItem(item) {
        return (
            <RepositoryItem data={item} onSelect={() => this.onSelect(item)} />
        );
    }

    onSelect(item) {
        this.props.navigation.navigate('repoDetailPage', {
            item: item,
        });
    }

    onRefresh() {
        if (!this.state.isRefresh) {
            this.fetchData(this.props.path);
        }
    }


    render() {

        if (!this.state.loaded) {
            return (
                <Loading />
            );
        }

        return (
            <View>
                <FlatList
                    style={{ paddingTop: 5 }}
                    data={this.state.result}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={this.state.isRefresh}
                    onRefresh={() => this.onRefresh()}
                // ListEmptyComponent={() => this.createEmptyComponent()}
                // ListHeaderComponent={() => this.createHeaderComponent()}
                // ListFooterComponent={() => this.createFooterComponent()}
                />
            </View>
        );
    }
}

export default Hot;

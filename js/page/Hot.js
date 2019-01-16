import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import DataRepository, { FLAG_SOTRAGE } from '../expand/dao/DataRepository';
import RepositoryItem from '../common/RepositoryItem';
import Loading from '../common/Loading';
import { ThemeColor } from '../utils/Consts';
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';
import CollectDao from '../expand/dao/CollectDao';
import ProjectModel from '../model/ProjectModel';
import ToastUtil from '../utils/ToastUtil';
import Utils from '../utils/Utils';


const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
var collectDao = new CollectDao(FLAG_SOTRAGE.FLAG_HOT);
class Hot extends Component {

    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
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
        this.dataRepository = new DataRepository(FLAG_SOTRAGE.FLAG_HOT);
        this.state = {
            result: [],
            loaded: false,
            isRefresh: false,
        }
    }

    componentDidMount() {
        this.fetchData(this.props.path);
    }

    /**
     * 重构数组
     * @param {array} items 
     */
    flushResult(items) {
        let result = [];
        items.map(item => {
            result.push(new ProjectModel(item, Utils.checkIsCollected(item, this.state.collectKeys)));
        });
        this.setState({
            result: result,
            isRefresh: false
        });
    }

    getCollectKeys(items) {
        collectDao.getCollectKeys()
            .then(keys => {
                if (keys) {
                    this.setState({
                        collectKeys: keys,
                    })
                }
                this.flushResult(items);
            })
            .catch(error => {
                this.flushResult(items);
            })
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
                });
                this.getCollectKeys(items);
                //再判断数据是否过期
                // console.log(result);
                // console.log(result.update_date);
                if (result && result.update_date && !this.dataRepository.checkDate(result.update_date)) {
                    // ToastUtil.show('数据过期');
                    this.setState({
                        isRefresh: true
                    });
                    return this.dataRepository.fetchNetRepository(url);
                } else {
                    // ToastUtil.show('缓存数据');
                }
            })
            .then(items => {
                // console.log(items);
                if (!items || items.length === 0) return;
                // ToastUtil.show('网络数据');
                this.getCollectKeys(items);
            })
            .catch(error => {
                console.log(error)
            });
    }

    renderItem(projectModel) {
        return (
            <RepositoryItem
                key={projectModel.item.id}
                projectModel={projectModel}
                onSelect={() => this.onSelect(projectModel.item)}
                onCollect={(item, isCollect) => this.onCollect(item, isCollect)}
            />
        );
    }

    /**
     * 收藏按钮单击回调
     * @param {object} item 
     * @param {boolean} isCollect 
     */
    onCollect(item, isCollect) {
        if (isCollect) {
            collectDao.collect(item.id.toString(), JSON.stringify(item));
        } else {
            collectDao.unCollect(item.id.toString());
        }
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

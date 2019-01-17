import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import DataRepository, { FLAG_SOTRAGE } from '../expand/dao/DataRepository';
import Loading from '../common/Loading';
import IconFont from '../common/IconFont';
import { ThemeColor } from '../utils/Consts';
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';
import TrendingItem from '../common/TrendingItem';
import TimeSpan from '../model/TimeSpan';
import Popover from '../common/Popover';
import ProjectModel from '../model/ProjectModel';
import Utils from '../utils/Utils';
import CollectDao from '../expand/dao/CollectDao';


const URL = 'https://github.com/trending';
const timeSpanTextArray = [
    new TimeSpan('今 天', 'since=daily'),
    new TimeSpan('本 周', 'since=weekly'),
    new TimeSpan('本 月', 'since=monthly')]
var collectDao = new CollectDao(FLAG_SOTRAGE.FLAG_TRENDING);
var dataRepository = new DataRepository(FLAG_SOTRAGE.FLAG_TRENDING);
class Trending extends Component {

    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state = {
            language: [],
            isVisible: false,
            buttonRect: {},
            timeSpan: timeSpanTextArray[0],
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

    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: { x: px, y: py, width: width, height: height }
            });
        });
    }

    closePopover() {
        this.setState({
            isVisible: false,
        });
    }

    onSelect(timeSpan) {
        this.closePopover();
        this.setState({
            timeSpan: timeSpan,
        });
    }



    renderTitleView() {
        return <View>
            <TouchableOpacity ref='button' onPress={() => this.showPopover()}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{
                        fontSize: 20,
                        color: 'rgba(0,0,0,0.8)',
                        marginRight: 8
                    }}>{`趋势 ${this.state.timeSpan.showText}`}</Text>
                    <IconFont name='icon_down_trangle' size={16} color='black' />
                </View>
            </TouchableOpacity>
        </View>;
    }


    render() {
        let content = this.state.language.length > 0 ?
            <ScrollableTabView
                tabBarBackgroundColor={ThemeColor}
                renderTabBar={() => <ScrollableTabBar />}>
                {this.state.language.map((result, i, arr) => {
                    let item = arr[i];
                    return item.checked ? <TrendingTab key={i}
                        tabLabel={item.name}
                        path={item.path}
                        timeSpan={this.state.timeSpan}
                        {...this.props} /> : null;
                })}
            </ScrollableTabView> : null;
        let timeSpanView =
            <Popover
                isVisible={this.state.isVisible}
                fromRect={this.state.buttonRect}
                onClose={() => this.closePopover()}
                placement='bottom'
                contentStyle={{ backgroundColor: 'white' }}>
                {timeSpanTextArray.map((result, index, arr) => {
                    return <TouchableOpacity key={index} onPress={() => { this.onSelect(arr[index]) }}>
                        <Text style={{ fontSize: 18, color: 'black', fontWeight: '400', padding: 6 }}>{arr[index].showText}</Text>
                    </TouchableOpacity>;
                })}
            </Popover>;
        return (
            <View style={styles.pageHot}>
                <NavigationBar
                    titleView={this.renderTitleView()}
                    style={{
                        backgroundColor: ThemeColor,
                    }}
                    statusBar={{
                        backgroundColor: ThemeColor
                    }} />
                {content}
                {timeSpanView}
            </View>
        );
    }
}


class TrendingTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: [],
            loaded: false,
            isRefresh: false,
        }
    }

    componentDidMount() {
        this.fetchData(this.props.timeSpan, this.props.path, true);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.timeSpan !== this.props.timeSpan) {
            this.fetchData(nextProps.timeSpan, this.props.path);
        }
    }

    /**
     * 重构数组
     * @param {array} items 
     */
    flushResult(items) {
        let result = [];
        let keys = this.state.collectKeys;
        items.forEach((item) => {
            result.push(new ProjectModel(item, Utils.checkIsCollected(item, keys)));
        });
        this.setState({
            result: result,
            isRefresh: false
        });
    }


    /**
     * 获取收藏的key
     * @param {array} items 
     */
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


    fetchData(timeSpan, category) {
        if (this.state.loaded) {
            this.setState({
                isRefresh: true
            })
        }
        let url = URL + (category === '' ? category : `/${category}`)
            + `?${timeSpan.searchText}`;
        dataRepository.fetchRepository(url)
            .then(result => {
                let items = result && result.items ? result.items : result ? result : [];
                //首先将数据关联到组件
                this.setState({
                    loaded: true,
                });
                this.getCollectKeys(items);
                //再判断数据是否过期
                if (!items && result && result.update_date && !dataRepository.checkDate(result.update_date)) {
                    this.setState({
                        isRefresh: true
                    });
                    return dataRepository.fetchNetRepository(url);
                } else {
                }
            })
            .then(items => {
                if (!items || items.length === 0) return;
                this.getCollectKeys(items);
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                });
            });
    }

    renderItem(projectModel) {
        return (
            <TrendingItem
                key={projectModel.item.fullName}
                projectModel={projectModel}
                onSelect={() => this.onSelect(projectModel)}
                onCollect={(item, isCollect) => this.onCollect(item, isCollect, projectModel)} />
        );
    }

    /**
     * 收藏按钮单击回调
     * @param {object} item 
     * @param {boolean} isCollect 
     */
    onCollect(item, isCollect, projectModel) {
        //刷新时不会异常渲染
        projectModel.isCollect = isCollect;
        if (isCollect) {
            collectDao.collect(item.fullName, JSON.stringify(item));
        } else {
            collectDao.unCollect(item.fullName);
        }
    }



    callback = (isChanged) => {
        if (isChanged) {
            this.onRefresh();
        }
    }

    onSelect(projectModel) {
        this.props.navigation.navigate('repoDetailPage', {
            projectModel: projectModel,
            collectDao: collectDao,
            callback: this.callback
        });
    }

    onRefresh() {
        if (!this.state.isRefresh) {
            this.fetchData(this.props.timeSpan, this.props.path);
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

export default Trending;

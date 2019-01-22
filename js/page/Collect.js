import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { FLAG_SOTRAGE } from '../expand/dao/DataRepository';
import RepositoryItem from '../common/RepositoryItem';
import TrendingItem from '../common/TrendingItem';
import Loading from '../common/Loading';
import { ThemeColor } from '../utils/Consts';
import CollectDao from '../expand/dao/CollectDao';
import ProjectModel from '../model/ProjectModel';
import IconFont from '../common/IconFont';
import ListEmptyConponent from '../common/ListEmptyConponent';


class Collect extends Component {

    render() {
        let content =
            <ScrollableTabView
                tabBarBackgroundColor={ThemeColor}
                renderTabBar={() => <ScrollableTabBar />}>
                <CollectTab tabLabel='热门' flag={FLAG_SOTRAGE.FLAG_HOT} {...this.props} />
                <CollectTab tabLabel='趋势' flag={FLAG_SOTRAGE.FLAG_TRENDING} {...this.props} />
            </ScrollableTabView>;
        return (
            <View style={styles.pageHot}>
                <NavigationBar
                    title='收藏'
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


class CollectTab extends Component {

    constructor(props) {
        super(props);
        this.collectDao = new CollectDao(this.props.flag);
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
        items.forEach((item) => {
            result.push(new ProjectModel(item, true));
        })
        this.setState({
            result: result,
            isRefresh: false
        });
    }

    fetchData() {
        if (this.state.loaded) {
            this.setState({
                isRefresh: true
            })
        }
        this.collectDao.getAllCollectData()
            .then(result => {
                let items = result ? result : [];
                //首先将数据关联到组件
                this.setState({
                    loaded: true,
                });
                this.flushResult(items);
                //再判断数据是否过期
            })
            .catch(error => {
                console.log(error)
            });
    }



    renderItem(projectModel) {
        return this.props.flag === FLAG_SOTRAGE.FLAG_HOT ?
            <RepositoryItem
                key={projectModel.item.id}
                projectModel={projectModel}
                onSelect={() => this.onSelect(projectModel)}
                onCollect={(item, isCollect) => this.onCollect(item, isCollect, projectModel)}
            /> :
            <TrendingItem
                key={projectModel.item.fullName}
                projectModel={projectModel}
                onSelect={() => this.onSelect(projectModel)}
                onCollect={(item, isCollect) => this.onCollect(item, isCollect, projectModel)} />;
    }

    /**
     * 收藏按钮单击回调
     * @param {object} item 
     * @param {boolean} isCollect 
     */
    onCollect(item, isCollect, projectModel) {
        //防止刷新时异常渲染
        projectModel.isCollect = isCollect;
        let key = this.props.flag === FLAG_SOTRAGE.FLAG_HOT ? item.id.toString() : item.fullName;
        if (isCollect) {
            this.collectDao.collect(key, JSON.stringify(item));
        } else {
            this.collectDao.unCollect(key.toString());
        }
        this.onRefresh();
    }

    callback = (isChanged) => {
        if (isChanged) {
            this.onRefresh();
        }
    }

    onSelect(projectModel) {
        this.props.navigation.navigate('repoDetailPage', {
            projectModel: projectModel,
            collectDao: this.collectDao,
            callback: this.callback,
        });
    }

    onRefresh() {
        if (!this.state.isRefresh) {
            this.fetchData(this.props.path);
        }
    }


    // createEmptyComponent() {
    //     return <View style={{ height: this.state.height, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    //         <IconFont name='icon_empty' size={30} color='gray' />
    //         <Text>空空如也，点击刷新~</Text>
    //     </View>;
    // }

    // onLayout(e) {
    //     let height = e.nativeEvent.layout.height;
    //     if (this.state.height < height) {
    //         this.setState({ height: height });
    //     }
    // }



    render() {

        if (!this.state.loaded) {
            return (
                <Loading />
            );
        }

        if (this.state.result.length === 0) {
            return (
                <ListEmptyConponent message='空空如也，点击刷新~' onClick={() => this.onRefresh()} />);
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
                // onLayout={e => this.onLayout(e)}
                // ListHeaderComponent={() => this.createHeaderComponent()}
                // ListFooterComponent={() => this.createFooterComponent()}
                />
            </View>
        );
    }
}

export default Collect;

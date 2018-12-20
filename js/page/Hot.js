import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import DataRepository from '../expand/dao/DataRepository';
import RepositoryItem from '../common/RepositoryItem';
import Loading from '../common/Loading';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

class Hot extends Component {
    render() {
        return (
            <View style={styles.pageHot}>
                <NavigationBar
                    title='热门'
                    style={{
                        backgroundColor: 'lightgreen',
                    }}
                    statusBar={{
                        backgroundColor: 'lightgreen'
                    }} />

                <ScrollableTabView
                    tabBarBackgroundColor='lightgreen'
                    renderTabBar={() => <ScrollableTabBar />}>
                    <HotTab tabLabel='Java'>Java</HotTab>
                    <HotTab tabLabel='JavaScript'>JavaScript</HotTab>
                    <HotTab tabLabel='IOS'>IOS</HotTab>
                    <HotTab tabLabel='Android'>Android</HotTab>
                </ScrollableTabView>
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
        this.fetchData(this.props.tabLabel);
    }

    fetchData(key) {
        this.setState({
            isRefresh: true
        })
        let url = URL + key + QUERY_STR;
        this.dataRepository.fetchNetRepository(url)
            .then(result => {
                console.log(result);
                this.setState({
                    loaded: true,
                    result: result.items,
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
        console.log(item)
        return (
            <RepositoryItem data={item} />
        );
    }

    onRefresh() {
        if (!this.state.isRefresh) {
            this.fetchData(this.props.tabLabel);
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
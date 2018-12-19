import React, { Component } from 'react';
import { View, ListView, Text, StyleSheet, Image, TouchableOpacity, RefreshControl } from 'react-native';
import styles from '../utils/Styles';
import NavigationBar from '../common/NavigationBar';
import Toast from 'react-native-root-toast';

const DATA = {
    data: [
        {
            title: 'test',
            email: 'guocheng0816@163.com'
        },
        {
            title: 'test',
            email: 'guocheng0816@163.com'
        },
        {
            title: 'test',
            email: 'guocheng0816@163.com'
        },
        {
            title: 'test',
            email: 'guocheng0816@163.com'
        },
        {
            title: 'test',
            email: 'guocheng0816@163.com'
        },
        {
            title: 'test',
            email: 'guocheng0816@163.com'
        },
        {
            title: 'test',
            email: 'guocheng0816@163.com'
        },
        {
            title: 'test',
            email: 'guocheng0816@163.com'
        },
        {
            title: 'test',
            email: 'guocheng0816@163.com'
        },
        {
            title: 'test',
            email: 'guocheng0816@163.com'
        },
        {
            title: 'test',
            email: 'guocheng0816@163.com'
        },
        {
            title: 'test',
            email: 'guocheng0816@163.com'
        },
        {
            title: 'test',
            email: 'guocheng0816@163.com'
        },
        {
            title: 'test',
            email: 'guocheng0816@163.com'
        },
    ]
}


const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ListViewTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows([]),
            isLoading: true,
        }
    }

    renderRow(item) {
        return (
            <TouchableOpacity
                onPress={() => {
                    return Toast.show(`Clicked ${item.title}`, {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: false,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    })
                }}>
                <View style={STYLES.itemContainer}>
                    <Text style={STYLES.text}>{item.title}</Text>
                    <Text style={STYLES.text}>{item.email}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View key={rowID} style={STYLES.line}></View>;
    }

    renderFooter() {
        return <View style={{ alignItems: 'center' }}><Image style={{ width: 200, height: 80 }} source={{ uri: 'https://www.baidu.com/img/bd_logo1.png?where=super' }}></Image></View>;
    }

    onRefresh() {
        this.setState({
            isLoading: true,
        })
        setTimeout(() => {
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(DATA.data),
            })
        }, 2000);
    }
    
    componentDidMount(){
        this.onRefresh();
    }

    render() {
        return (
            <View style={styles.pageHot}>
                <NavigationBar
                    title='ListViewTest'
                    style={{
                        backgroundColor: 'lightgreen',
                    }}
                    statusBar={{
                        backgroundColor: 'lightgreen'
                    }} />

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(item) => this.renderRow(item)}
                    renderSeparator={
                        (sectionID, rowID, adjacentRowHighlighted) => { return this.renderSeparator(sectionID, rowID, adjacentRowHighlighted) }}
                    renderFooter={() => this.renderFooter()}
                    refreshControl={<RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={() => this.onRefresh()}
                    />}
                />
            </View>
        );
    }
}

const STYLES = StyleSheet.create({
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 18
    },
    line: {
        height: 0.5,
        backgroundColor: 'rgba(0,0,0,0.6)',
    }
});

export default ListViewTest;
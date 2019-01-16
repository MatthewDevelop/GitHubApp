import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from './IconFont';
import { ThemeColor } from '../utils/Consts';

export default class RepositoryItem extends Component {

    constructor(props) {
        super(props);
        this.projectModel = this.props.projectModel;
        this.state = {
            isCollect: this.projectModel.isCollect,
        }
    }

    collect() {
        this.props.onCollect(this.props.projectModel.item, !this.state.isCollect);
        this.setState({
            isCollect: !this.state.isCollect,
        });
    }

    render() {
        const data = this.projectModel.item;
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onSelect}>
                <View style={styles.itemContainer}>
                    <Text style={styles.title}>{data.full_name}</Text>
                    <Text style={styles.description}>{data.description}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>Author: </Text>
                            <Image source={{ uri: data.owner.avatar_url }} style={{ width: 22, height: 22 }} />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>Stars: </Text>
                            <Text>{data.stargazers_count}</Text>
                        </View>
                        <Icon
                            name='icon_collect'
                            size={22}
                            color={this.state.isCollect ? ThemeColor : 'gray'}
                            style={{ marginRight: 5 }}
                            onPress={() => this.collect()} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 17,
        marginBottom: 2,
        color: 'rgba(0,0,0,1)',
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: 'rgba(0,0,0,0.6)',
    },
    itemContainer: {
        backgroundColor: 'white',
        padding: 5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 5,
        // IOS
        shadowColor: 'gray',
        shadowOffset: {
            width: 0.5,
            height: 0.5
        },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        //Android
        elevation: 2
    }
});
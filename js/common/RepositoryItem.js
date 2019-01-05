import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from './IconFont';

export default class RepositoryItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        return (
            <TouchableOpacity style={styles.container}>
                <View style={styles.itemContainer}>
                    <Text style={styles.title}>{data.full_name}</Text>
                    <Text style={styles.description}>{data.description}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>Author: </Text>
                            <Image source={{ uri: data.owner.avatar_url }} style={{ width: 22, height: 22 }} />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>Stars: </Text>
                            <Text>{data.stargazers_count}</Text>
                        </View>
                        <Icon name='icon_collect' size={16} color='gray' />
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
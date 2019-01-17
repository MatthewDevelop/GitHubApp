import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from './IconFont';
import HtmlView from 'react-native-htmlview';

export default class TrendingItem extends Component {

    constructor(props) {
        super(props);
        this.projectModel = this.props.projectModel;
        this.state = {
            isCollect: this.projectModel.isCollect,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.projectModel !== this.projectModel) {
            this.setState({
                isCollect: nextProps.projectModel.isCollect,
            });
        }
    }

    collect() {
        this.props.onCollect(this.props.projectModel.item, !this.state.isCollect);
        this.setState({
            isCollect: !this.state.isCollect,
        });
    }

    render() {
        const data = this.props.projectModel.item;
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onSelect}>
                <View style={styles.itemContainer}>
                    <Text style={styles.title}>{data.fullName}</Text>
                    <HtmlView
                        value={data.description}
                        onLinkPress={(url) => { }}
                    />
                    <Text style={styles.description}>{data.meta}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>Build By: </Text>
                            {data.contributors.map((result, index, arr) => {
                                return <Image source={{ uri: arr[index] }} style={{ width: 22, height: 22 }} key={index} />
                            })}
                        </View>
                        <Icon
                            name='icon_collect'
                            size={22}
                            color={this.state.isCollect ? 'red' : 'gray'}
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
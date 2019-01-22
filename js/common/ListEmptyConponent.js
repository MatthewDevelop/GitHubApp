import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconFont from './IconFont';

class ListEmptyComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={this.props.onClick}>
                <View style={styles.container}>
                    <IconFont name='icon_empty' size={40} color='gray' />
                    <Text>{this.props.message}</Text>
                </View>
            </TouchableOpacity>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export { ListEmptyComponent as default };
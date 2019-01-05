import React, { Component } from 'react';
import { View, Text } from 'react-native';

class CustomTagPage extends Component {

    static navigationOptions=({navigation})=>{
        return({
            headerTitle:'自定义标签'
        });
    }

    render() {
        return (
            <View style={{ padding: 10 }}>
                <Text>自定义标签</Text>
            </View>
        );
    }
}

export default CustomTagPage;
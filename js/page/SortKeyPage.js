import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Alert, DeviceEventEmitter } from 'react-native';
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';
import ArrayUtil from '../utils/ArrayUtil';
import SortableListView from 'react-native-sortable-listview';
import IconFont from '../common/IconFont';
import { ThemeColor } from '../utils/Consts';
import Loading from '../common/Loading';

class SortKeyPage extends Component {

    save = async (checked = false) => {
        if (!checked && ArrayUtil.isEqual(this.originalCheckedArray, this.state.dataArray)) {
            this.props.navigation.pop();
            return;
        }
        this.getSortResult();
        await this.languageDao.save(this.sortResultArray);
        if (this.flag === FLAG_LANGUAGE.flag_key) {
            DeviceEventEmitter.emit('hot-tab-changed');
        } else {
            DeviceEventEmitter.emit('trending-tab-changed');
        }
        this.props.navigation.pop();
    }

    /**
     * 获取排序之后的数据
     */
    getSortResult() {
        this.sortResultArray = ArrayUtil.clone(this.originDataArray);
        for (let i = 0, len = this.originalCheckedArray.length; i < len; i++) {
            let item = this.originalCheckedArray[i];
            let index = this.originDataArray.indexOf(item);
            this.sortResultArray.splice(index, 1, this.state.dataArray[i]);
        }
    }

    back = () => {
        if (ArrayUtil.isEqual(this.originalCheckedArray, this.state.dataArray)) {
            this.props.navigation.pop();
            return;
        }
        Alert.alert(
            '提示',
            '需要保存修改的信息吗？',
            [
                { text: '取消', onPress: () => { this.props.navigation.pop() }, style: 'cancel' },
                { text: '确定', onPress: () => { this.save(true) } },
            ],
            { cancelable: false }
        )
    }

    static navigationOptions = ({ navigation }) => {
        let title = navigation.getParam('flag') === FLAG_LANGUAGE.flag_language ? '语言排序' : '标签排序';
        return ({
            headerTitle: title,
            headerStyle: {
                backgroundColor: ThemeColor,
            },
            headerTitleStyle: {
                color: 'rgba(0,0,0,0.5)',
            },
            headerRight: <Text
                style={{
                    fontSize: 18,
                    marginRight: 5,
                }}
                onPress={navigation.getParam('save')}
            >保存</Text>,
            headerLeft: <IconFont
                style={{
                    marginLeft: 10,
                }}
                size={30}
                name='icon_back'
                color='rgba(0,0,0,0.6)'
                onPress={navigation.getParam('back')}
            />,
        });
    }

    constructor(props) {
        super(props);
        this.flag = this.props.navigation.getParam('flag');
        console.log(this.flag);
        this.originDataArray = [];
        this.sortResultArray = [];
        this.originalCheckedArray = [];
        this.state = {
            isLoaded: false,
            dataArray: [],
        }
        console.log('constructor');
    }

    componentDidMount() {
        this.props.navigation.setParams({
            save: this.save,
            back: this.back,
            flag: this.flag,
        });
        this.languageDao = new LanguageDao(this.flag);
        this.loadData();
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.getCheckedItem(result);
            })
            .catch(error => {
                console.log('获取数据失败');
                console.log(error);
            });
    }


    render() {
        if (!this.state.isLoaded) return <Loading />;
        return (
            <SortableListView
                style={{ flex: 1 }}
                data={this.state.dataArray}
                order={Object.keys(this.state.dataArray)}
                onRowMoved={(e) => {
                    this.state.dataArray.splice(e.to, 0,
                        this.state.dataArray.splice(e.from, 1)[0]);
                    this.forceUpdate();
                }}
                renderRow={row => <SortItem data={row} {...this.props} />}
            />
        );
    }

    getCheckedItem(data) {
        this.originDataArray = data;
        let checkedArray = [];
        let len = data.length;
        for (let i = 0; i < len; i++) {
            if (data[i].checked) {
                checkedArray.push(data[i]);
            }
        }
        this.setState({
            isLoaded: true,
            dataArray: checkedArray,
        });
        this.originalCheckedArray = ArrayUtil.clone(checkedArray);
    }
}


class SortItem extends Component {
    render() {
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                style={{
                    flex: 1,
                    padding: 15,
                    backgroundColor: '#F8F8F8',
                    borderBottomWidth: 1,
                    borderColor: '#eee',
                }}
                {...this.props.sortHandlers}>
                <View style={styles.item}>
                    <IconFont name='icon_sort' size={30} color={ThemeColor} style={{ marginRight: 10 }} />
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default SortKeyPage;
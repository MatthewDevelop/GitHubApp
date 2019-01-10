import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ThemeColor } from '../utils/Consts';
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';
import CheckBox from 'react-native-check-box';
import ArrayUtil from '../utils/ArrayUtil';
import IconFont from '../common/IconFont';

//自定义标签页面
class CustomTagPage extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.isRemoveKey = this.navigation.getParam('isRemoveKey', false);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language_key);
        this.changedValues = [];
        this.originDataArray = [];
        this.state = {
            dataArray: [],
        }
    }
    /**
     * 保存
     */
    save = () => {
        if (this.changedValues.length === 0) {
            this.props.navigation.pop();
            return;
        }
        if (this.isRemoveKey) {
            //移除重复元素
            this.changedValues.map(item => {
                for (let i = 0; i < this.originDataArray.length; i++) {
                    if (item.name === this.originDataArray[i].name) {
                        //删除元素
                        this.originDataArray.splice(i, 1)
                        i = i - 1;
                    };
                }
            });
            this.languageDao.save(this.originDataArray);
            this.props.navigation.pop();
        } else {
            this.languageDao.save(this.state.dataArray);
            this.props.navigation.pop();
        }
    }
    /**
     * 返回
     */
    back = () => {
        if (this.changedValues.length === 0) {
            this.props.navigation.pop();
            return;
        }
        Alert.alert(
            '提示',
            '需要保存修改的信息吗？',
            [
                { text: '取消', onPress: () => { this.props.navigation.pop() }, style: 'cancel' },
                { text: '确定', onPress: () => { this.save() } },
            ],
            { cancelable: false }
        )
    }

    static navigationOptions = ({ navigation }) => {
        let title = navigation.getParam('isRemoveKey') ? '移除标签' : '自定义标签';
        let rightText = navigation.getParam('isRemoveKey') ? '移除' : '保存';
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
            >{rightText}</Text>,
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

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                if (this.isRemoveKey) {
                    this.originDataArray = ArrayUtil.deepCopy(result);
                    result.map((item) => {
                        item.checked = false;
                        return item;
                    })
                }
                this.setState({
                    dataArray: result,
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.loadData();
        this.navigation.setParams({
            save: this.save,
            back: this.back,
            isRemoveKey: this.isRemoveKey,
        })
    }



    onClick(data) {
        data.checked = !data.checked;
        this.setState({
            dataArray: this.state.dataArray
        });
        ArrayUtil.updateArray(data, this.changedValues);
    }

    renderCheckBox(data) {
        let leftText = data.name;
        let isChecked = data.checked;
        return (
            <CheckBox
                isChecked={isChecked}
                style={{ flex: 1, padding: 6 }}
                onClick={() => this.onClick(data)}
                leftText={leftText}
                checkBoxColor={ThemeColor}
            />
        );
    }

    renderView() {
        if (!this.state.dataArray || this.state.dataArray.length === 0) return null;
        let len = this.state.dataArray.length;
        let views = [];
        for (let i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.line}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.underline}></View>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.line}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
                <View style={styles.underline}></View>
            </View>
        );
        return views;
    }

    render() {
        return (
            <View style={{ padding: 10 }}>
                {this.renderView()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    underline: {
        height: 0.3,
        backgroundColor: 'darkgray',
    },
    line: {
        flexDirection: 'row',
    }
});

export default CustomTagPage;
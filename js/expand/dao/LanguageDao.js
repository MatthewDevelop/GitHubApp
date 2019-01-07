
import { AsyncStorage } from 'react-native';
import {DefaultTag as keys} from '../../utils/Consts';
import ToastUtil from '../../utils/ToastUtil'


export var FLAG_LANGUAGE = {
    flag_language_language: 'flag_language_language',
    flag_language_key: 'flag_language_key',
};
/**
 * 标签数据管理
 */
export default class LanguageDao {
    constructor(flag) {
        this.flag = flag;
    }
    /**
     * 获取数据
     */
    fetch() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if (result) {
                        try {
                            resolve(JSON.parse(result));
                        } catch (e) {
                            reject(e);
                        }
                    } else {
                        var data = this.flag === FLAG_LANGUAGE.flag_language_key ? keys : null;
                        this.save(data);
                        resolve(data);
                    }
                }
            });
        })
    }
    /**
     * 保存数据
     * @param {*} data 数据
     */
    save(data) {
        AsyncStorage.setItem(this.flag, JSON.stringify(data), (error) => {
            if(error){
                ToastUtil.show('保存失败');
            }else{
                // ToastUtil.show('保存成功');
                console.log('保存成功');
            }
        })
    }
}
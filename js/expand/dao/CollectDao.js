
import { AsyncStorage } from 'react-native';
import ToastUtil from '../../utils/ToastUtil'


const COLLECT_KEY_PREFIX = 'collect_'
/**
 * 标签数据管理
 */
export default class CollectDao {

    constructor(flag) {
        this.flag = flag;
        this.collectKeys = COLLECT_KEY_PREFIX + flag
    }

    /**
     * 收藏
     * @param {string} key 项目id或名称
     * @param {string} value 项目
     * @param {func} callback 
     */
    collect(key, value, callback) {
        AsyncStorage.setItem(key, value, (error) => {
            if (!error) {
                this.updateCollectKeys(key, true);
            }
        })
    }

    /**
     * 移除已经收藏的项目
     * @param {string} key 
     */
    unCollect(key) {
        AsyncStorage.removeItem(key, error => {
            if (!error) {
                this.updateCollectKeys(key, false);
            }
        })
    }

    /**
     * 获取收藏的所有key
     */
    getCollectKeys() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.collectKeys, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            })
        });
    }

    /**
     * 
     * @param {string} key 
     * @param {boolean} isAdd true:添加 false:移除
     */
    updateCollectKeys(key, isAdd) {
        AsyncStorage.getItem(this.collectKeys, (error, result) => {
            if (!error) {
                let collectKeys = [];
                if (result) {
                    collectKeys = JSON.parse(result);
                }
                let index = collectKeys.indexOf(key);
                if (isAdd) {
                    if (index === -1) {
                        collectKeys.push(key);
                    }
                } else {
                    if (index !== -1) {
                        collectKeys.splice(index, 1);
                    }
                }
                AsyncStorage.setItem(this.collectKeys, JSON.stringify(collectKeys));
            }
        })
    }

}
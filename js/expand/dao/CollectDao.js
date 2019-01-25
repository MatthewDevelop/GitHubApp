
import { AsyncStorage } from 'react-native';


const COLLECT_KEY_PREFIX = 'collect_'
/**
 * 标签数据管理
 */
export default class CollectDao {

    constructor(flag) {
        this.collectKeys = COLLECT_KEY_PREFIX + flag
    }

    /**
     * 收藏
     * @param {string} key 项目id或名称
     * @param {string} value 项目
     */
    async collect(key, value) {
        try {
            await AsyncStorage.setItem(key, value)
            await this.updateCollectKeys(key, true);
        } catch (error) {
            console.log(error);
        };
    }

    /**
     * 移除已经收藏的项目
     * @param {string} key 
     */
    async unCollect(key) {
        try {
            await AsyncStorage.removeItem(key);
            await this.updateCollectKeys(key, false);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 获取收藏的所有key
     */
    getCollectKeys() {
        return AsyncStorage.getItem(this.collectKeys);
    }

    /**
     * 
     * @param {string} key 
     * @param {boolean} isAdd true:添加 false:移除
     */
    async updateCollectKeys(key, isAdd) {
        await AsyncStorage.getItem(this.collectKeys)
            .then(result => {
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
                return AsyncStorage.setItem(this.collectKeys, JSON.stringify(collectKeys));
            })
            .then(() => {
                console.log('更新成功');
            })
            .catch((error) => {
                console.log('更新出错');
            });
    }


    /**
     * 获取所有收藏的数据
     */
    getAllCollectData() {
        return new Promise((resolve, reject) => {
            this.getCollectKeys()
                .then(result => {
                    let keys = [];
                    if (result) {
                        keys = JSON.parse(result);
                    }
                    return AsyncStorage.multiGet(keys);
                })
                .then(results => {
                    let items = [];
                    if (results) {
                        results.forEach(item => {
                            let value = item[1];
                            if (value) {
                                items.push(JSON.parse(value));
                            }
                        });
                    }
                    return resolve(items);
                })
                .catch(e => {
                    reject(e);
                });

        });
    }
}
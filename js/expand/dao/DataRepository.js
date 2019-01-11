import { AsyncStorage } from 'react-native';
export default class DataRepository {

    /**
     * 从网络获取数据
     * @param {string} url 
     */
    fetchNetRepository(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    if (!result) {
                        reject(new Error('response data is null'));
                        return;
                    }
                    resolve(result.items);
                    //缓存数据到本地
                    this.saveRepository(url, result.items);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }

    /**
     *  从本地获取数据
     * @param {string} url 
     */
    fetchLocalRepository(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            });
        });
    }


    /**
     * 获取数据
     * @param {string} url 
     */
    fetchRepository(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalRepository(url)
                .then(result => {
                    if (result) {
                        resolve(result);
                    } else {
                        this.fetchNetRepository(url)
                            .then(result => {
                                resolve(result);
                            })
                            .catch(error => {
                                reject(error);
                            })
                    }
                })
                .catch(() => {
                    this.fetchNetRepository(url)
                        .then(result => {
                            resolve(result);
                        })
                        .catch(error => {
                            reject(error);
                        })
                })
        });
    }

    /**
     * 将网络数据保存到本地
     * @param {string} url key
     * @param {object} items data
     * @param {func} callback 
     */
    saveRepository(url, items, callback) {
        if (!url || !items) return;
        //将数据包装添加时间戳
        let wrapData = { items: items, update_date: new Date().getTime()};
        // console.log(wrapData);
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callback);
    }

    /**
     * 判断缓存数据是否过期
     * @param {long} longTime 数据时间戳
     * @returns {boolean} true:数据有效 false:数据过期
     */
    checkDate(longTime) {
        //当前时间
        let currentDate = new Date();
        //保存时间
        let saveDate = new Date();
        saveDate.setDate(longTime);
        if (currentDate.getMonth() !== saveDate.getMonth()) return false;
        if (currentDate.getDay() !== saveDate.getDay()) return false;
        if (currentDate.getHours() - saveDate.getHours() > 4) return false;
        return true;
    }

}
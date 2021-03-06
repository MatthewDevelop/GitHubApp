/**
 * 数组工具类
 */
export default class ArrayUtil {
    /**
     * 更新数组，若item已经存在则移除，不存在则加入
     * @param {item} data item
     * @param {array} array array
     */
    static updateArray(data, array) {
        let len = array.length;
        for (let i = 0; i < len; i++) {
            let temp = array[i];
            if (temp === data) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(data);
    }


    /**
     * 浅拷贝
     * @param {array} from 源数组
     */
    static clone(from) {
        if (!from) {
            return [];
        }
        let newArray = [];
        let len = from.length;
        for (let i = 0; i < len; i++) {
            newArray[i] = from[i];
        }
        return newArray;
    }

    /**
     * 深拷贝
     * @param {array} from 
     */
    static deepCopy(from) {
        return JSON.parse(JSON.stringify(from))
    }

    /**
     * 判断两个数组的数据元素是否一一对应
     * @param {array} arr1 
     * @param {array} arr2 
     * @returns {boolean} 
     */
    static isEqual(arr1, arr2) {
        if (!(arr1 && arr2)) return false;
        if (arr1.length !== arr2.length) return false;
        for (let len = arr1.length, i = 0; i < len; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
    /**
     * 从数组中指定元素移除
     * @param {array} arr 
     * @param {item} item 
     */
    static remove(arr, item) {
        if (!arr) return;
        for (let i = 0, len = arr.length; i < len; i++) {
            if (item === arr[i]) arr.splice(i, 1);
        }
    }
}
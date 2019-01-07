/**
 * 数组工具类
 */
export default class ArrayUtil {
    /**
     * 更新数组，若item已经存在则移除，不存在则加入
     * @param {*} data item
     * @param {*} array array
     */
    static updateArray(data,array){
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
}
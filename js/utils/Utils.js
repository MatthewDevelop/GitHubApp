
export default class Utils {
    /**
     * 检查item是否被收藏过
     * @param {object} item 
     * @param {array} items keys
     */
    static checkIsCollected(item, items) {
        for (let i = 0, len = items.length; i < len; i++) {
            if (item.id.toString() === items[i]) {
                return true;
            }
        }
        return false;
    }
}
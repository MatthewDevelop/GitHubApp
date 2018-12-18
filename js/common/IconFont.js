import createIconSet from 'react-native-vector-icons/lib/create-icon-set';

const glyphMap = {
    'icon_user': 58979,
    'icon_collect': 58928,
    'icon_hot':59222,
    'icon_trending':60788,
}

//映射表，fontFamily，字体文件
const IconFont = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

export default IconFont;
import createIconSet from 'react-native-vector-icons/lib/create-icon-set';

const glyphMap = {
    'icon_user': 58979,
    'icon_collect': 58918,
    'icon_hot':59222,
    'icon_trending':60788,
    'icon_checked':59127,
    'icon_unchecked':58905,
    'icon_back':58903,
    'icon_sort':60417,
    'icon_down_trangle':58887,
    'icon_empty':59158,
}

//映射表，fontFamily，字体文件
const IconFont = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

export default IconFont;
import Toast from 'react-native-root-toast';

export default class ToastUtil {
    static show(message) {
        Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: false,
            animation: true,
            hideOnPress: true,
            delay: 0,
        })
    }
}
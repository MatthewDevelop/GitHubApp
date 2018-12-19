import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ViewPropTypes,
    Platform,
    StatusBar
} from 'react-native';
import PropTypes from 'prop-types';

const NAV_BAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 50;
const STATUS_BAR_HEIGHT = 20;
const StatusBarShape = {
    backgroundColor: PropTypes.string,
    //状态栏样式ios
    barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    hidden: PropTypes.bool,
};


class NavigationBar extends React.Component {
    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        hide: PropTypes.bool,
        leftButton: PropTypes.element,
        rightButton: PropTypes.element,
        statusBar: PropTypes.shape(StatusBarShape),
    }

    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false,
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            hide: false,
        }
    }

    render() {
        //状态栏
        let statusBar =
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar} />
            </View>;
        //标题栏
        let titleView = this.props.titleView ?
            this.props.titleView : <Text style={styles.title}>{this.props.title}</Text>;
        //整个导航栏   
        let content = <View style={styles.navBar}>
            {this.props.leftButton}
            <View style={styles.titleViewContainer}>
                {titleView}
            </View>
            {this.props.rightButton}
        </View>;
        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray'
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    titleViewContainer: {
        justifyContent: "center",
        alignItems: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
    },
    title: {
        fontSize: 20,
        color: 'rgba(0,0,0,0.8)'
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
    }
});

export { NavigationBar as default };
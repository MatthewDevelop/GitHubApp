import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

function Loading() {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='lightgreen' />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export { Loading as default, styles as loading };
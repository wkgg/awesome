'use strict';

var React = require('react-native');

var {
    View,
    Text,
    StyleSheet
    } = React;

var FAKE_INSIGHT = {
    title: "this is title of insight",
    content: "i am the body of a real insight which should be very long."
};

var InsightDetail = React.createClass({
    render: function () {
        var insight = FAKE_INSIGHT;
        return (
            <View style={styles.insightDetail}>
                <Text style={styles.title}>{insight.title}</Text>
                <Text style={styles.content}>{insight.content}</Text>
            </View>
        )
    }
});

var styles = StyleSheet.create({
    insightDetail: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    content: {
        marginTop: 10
    }
});

module.exports = InsightDetail;
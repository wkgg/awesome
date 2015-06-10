/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    } = React;

var MOCKED_EVENTS_DATA = [
    {
        title: '2015 China Blogging Competition',
        basicInfo: {
            time: '2015/06/01-2015/06/30',
            region: 'China'
        },
        posters: {
            thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm-j3fQmP3i6CIBVc_N6WsIYl6Ol4MvMRUqDOO9AqmFyFiAasI'
        },
        description: "ThoughtWorkers in China are smart and passionate about technology. We’re out there everyday solving some of our clients’ toughest problems through technology and we’re motivated to better humanity through software. We’re involved in a huge range of initiatives and are driving technical excellence and social change. So why not share your thoughts, experiences and lessons learnt with the outside world?"

    },
];

var EventDetail = React.createClass({
    render: function () {
        var event = MOCKED_EVENTS_DATA[0];
        return (
            <View style={styles.eventDetail}>
                <Image
                    source={{uri: event.posters.thumbnail}}
                    style={styles.thumbnail}
                    />
                <View style={styles.basicInfo}>
                    <Text style={styles.title}>{event.title}</Text>
                    <Text style={styles.time}>Time: {event.basicInfo.time}</Text>
                    <Text style={styles.time}>Region: {event.basicInfo.region}</Text>
                </View>
                <View style={styles.description}>
                    <Text style={styles.description}>{event.description}</Text>
                </View>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    eventDetail: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    time: {
        textAlign: 'left',
    },
    thumbnail: {
        width: 200,
        height: 200,
    },
    basicInfo: {
        paddingBottom: 10

    },
    description: {
        padding: 10,
        borderTopWidth: 1
    }

});

module.exports = EventDetail;
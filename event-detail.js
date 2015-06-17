'use strict';

var React = require('react-native');
var ActivityRepository = require('./activityRepository')
var {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    } = React;

var EventDetail = React.createClass({
    getInitialState: function() {
        return {
            event: ""
        };
    },

    componentDidMount: function() {
        ActivityRepository.getById(this.props.id, function (data) {
            this.setState({event: data});
        }.bind(this));
    },

    render: function () {
        var event = this.state.event;
        if(event !== ""){
             console.log("date==========", event.get("eventDate"))
            event= {
                title: event.get("title"),
                eventDate: event.get("eventDate"),
                location: event.get("location"),
                content: event.get("content"),
                imageUrl: event.get("imageUrl")
            };
        }

        return (
            <View style={styles.eventDetail}>
                <Image
                    source={{uri: event.imageUrl}}
                    style={styles.thumbnail}
                    />
                <View style={styles.basicInfo}>
                    <Text style={styles.title}>{event.title}</Text>
                    <Text style={styles.time}>Time: {event.eventDate}</Text>
                    <Text style={styles.time}>Region: {event.location}</Text>
                </View>
                <View style={styles.description}>
                    <Text style={styles.description}>{event.content}</Text>
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
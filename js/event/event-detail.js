'use strict';

var React = require('react-native');
var ActivityRepository = require('./activity-repository');
var moment = require('moment');
var {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    WebView,
    ScrollView,
    AsyncStorage
} = React;

var EventDetailStorageKey = "";

var EventDetail = React.createClass({
    getInitialState: function () {
        return {
            event: {}
        };
    },
    componentDidMount: function () {
        EventDetailStorageKey = "event-detail-" + this.props.id;
        ActivityRepository.getById(this.props.id, function (data) {
            AsyncStorage.setItem(EventDetailStorageKey, JSON.stringify(data)).then(() => {
                this.getDataFromStorage();
            });
        }.bind(this));

        this.getDataFromStorage();
    },
    getDataFromStorage: function () {
        AsyncStorage.getItem(EventDetailStorageKey).then((value) => {
            var parsedData = JSON.parse(value);
            this.setState({event: parsedData});
        });
    },
    getHtml: function (title, content) {
        var cssStyle = '<style>h1{font-size: 20px;}img{width:100%;height:200px;}</style>';
        return '<!DOCTYPE html><html><body>' + cssStyle + '<h1>' + title + '</h1>' + content + '</body></html>';
    },
    render: function () {
        var event = this.state.event;
        return (
            <View style={styles.eventDetail}>
                <Image
                    source={{uri: event.imageUrl}}
                    style={styles.thumbnail}
                    />
                <View style={styles.basicInfo}>
                    <Text style={styles.title}>{event.title}</Text>
                    <Text style={styles.time}>Time: {moment(event.eventDate).format("MMMM D, YYYY")}</Text>
                    <Text style={styles.time}>Region: {event.location}</Text>
                </View>

                <WebView
                    style={styles.webView}
                    ref={'webview'}
                    html={this.getHtml('', event.content)}
                    scrollEnabled={true}
                    automaticallyAdjustContentInsets={false}/>

            </View>
        );
    }
});

var styles = StyleSheet.create({
    eventDetail: {
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center'
    },
    time: {
        textAlign: 'left'
    },
    thumbnail: {
        marginTop: 75,
        paddingLeft: 10,
        width: 200,
        height: 200
    },
    basicInfo: {
        paddingBottom: 10

    },
    description: {
        backgroundColor: 'rgba(255,123,123,0.8)',
        height: 500
    }

});

module.exports = EventDetail;
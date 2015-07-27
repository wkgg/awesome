'use strict';

var React = require('react-native');
var ActivityRepository = require('./activity-repository');
var moment = require('moment');
var HTMLWebView = require('react-native-html-webview');

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
    getHtml: function () {
        var event = this.state.event;
        var title = event.title;
        var time = event.eventDate;
        var location = event.location;
        var content = event.content;
        var imageUrl = event.imageUrl;

        var cssStyle = '<style>h1{font-size: 20px;}h2{font-size: 17px;}img{width:100%;height:200px;}</style>';
        var imageElement = '<img src=\"' + imageUrl + '\" />';
        var titleElement = '<h1>' + title + '</h1>';
        var timeElement = '<h2>Time: ' + moment(time).format("MMMM D, YYYY") + '</h2>';
        var locationElement = '<h2>Location: ' + location + '</h2>';
        return '<!DOCTYPE html><html><body>' + cssStyle + titleElement + timeElement +
            locationElement + content + '</body></html>';
    },
    render: function () {
        return (
            <ScrollView>
                <View>
                    <HTMLWebView
                        html={this.getHtml()}
                        makeSafe={false}
                        autoHeight={true}/>
                </View>
            </ScrollView>
        );
    }
});

var styles = StyleSheet.create({});

module.exports = EventDetail;
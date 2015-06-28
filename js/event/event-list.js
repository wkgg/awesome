'use strict';

var React = require('react-native');
var EventDetail = require('./event-detail');
var eventRepository = require('./activity-repository');
var moment = require('moment');

var {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    } = React;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var EventList = React.createClass({
    getInitialState: function () {
        return {dataSource: ds.cloneWithRows([])};
    },
    rowPressed(eventId) {
        this.props.navigator.push({
            title: "Event Detail",
            component: EventDetail,
            passProps: {id: eventId}
        });
    },
    componentDidMount(){
        eventRepository.getList(function (data) {
            this.setState({dataSource: ds.cloneWithRows(data)});
        }.bind(this));
    },
    _renderRow: function (rowData) {
        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData.id)}
                                underlayColor='#dddddd'>
                <View style={styles.row}>
                    <Image style={styles.image} source={{uri: rowData.imageUrl}}/>
                    <Text style={styles.title}>{rowData.title}</Text>
                    <Text style={styles.address}>{rowData.location}</Text>
                    <Text
                        style={styles.eventDate}>{moment(rowData.eventDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Text>
                </View>
            </TouchableHighlight>
        );
    },
    render: function () {
        return (
            <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}/>
        );
    }
});

var styles = StyleSheet.create({
    row: {
        padding: 10,
        marginBottom: 10
    },
    image: {
        height: 200,
        marginBottom: 5
    },
    title: {
        fontSize: 18,
        marginBottom: 5
    },
    address: {
        marginBottom: 5
    },
    eventDate: {
        marginBottom: 5
    }
});

module.exports = EventList;
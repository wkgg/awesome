'use strict';

var React = require('react-native');
var EventDetail = require('./event-detail');
var eventRepository = require('./activity-repository');
var moment = require('moment');
var Icon = require('FAKIconImage');

var {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    AsyncStorage
} = React;

var EventListStorageKey = "event-list";
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
            AsyncStorage.setItem(EventListStorageKey, JSON.stringify(data)).then(() => {
                this.getDataFromStorage();
            });
        }.bind(this));

        this.getDataFromStorage();
    },
    getDataFromStorage: function () {
        AsyncStorage.getItem(EventListStorageKey).then((value) => {
            this.setState({dataSource: ds.cloneWithRows(JSON.parse(value))});
        });
    },
    _renderRow: function (rowData) {
        return (
            <TouchableHighlight 
                underlayColor='#F5F5F5'
                onPress={() => this.rowPressed(rowData.id)}>
                <View style={styles.row}>
                    <Image style={styles.image} source={{uri: rowData.imageUrl}}/>
                    <Text style={styles.title}>{rowData.title}</Text>
                    <View style={styles.line}>
                        <Icon name='fontawesome|map-marker' size={13} color='green' style={styles.icons}/>
                        <Text style={styles.address}>{rowData.location}</Text>
                    </View>
                    <View style={styles.line}>
                        <Icon name='fontawesome|clock-o' size={13} color='green' style={styles.icons}/>
                        <Text style={styles.eventDate}>{moment(rowData.eventDate).format("dddd, MMMM Do YYYY, h:mm a")}</Text>
                    </View>
                    <View style={styles.separator}/>
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
        padding: 5
    },
    line: {
        flexDirection: 'row'
    },
    separator: {
        height: 1,
        backgroundColor: '#F5F5F5',
        marginTop: 5
    },
    image: {
        borderRadius: 10,
        height: 195,
        marginBottom: 5
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    address: {
        fontSize: 13,
        marginBottom: 5
    },
    eventDate: {
        fontSize: 13,
        marginBottom: 5
    },
    icons: {
        width: 13,
        height: 13,
        marginRight: 5
    }
});

module.exports = EventList;
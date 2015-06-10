'use strict';

var React = require('react-native');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = React;

var EventDetail = require('./event-detail')

var EventList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([
         {
          imageUri: "https://download.unsplash.com/photo-1430760814266-9c81759e5e55",
          title: "WWDC 2015",
          address: "apple",
          time: "2015-01-01"
        },
        {
          imageUri: "https://download.unsplash.com/photo-1429032021766-c6a53949594f",
          title: "hello world!",
          address: "world map",
          time: "2015-01-01"
        },
        {
          imageUri: "https://download.unsplash.com/photo-1431184052543-809fa8cc9bd6",
          title: "hello world!",
          address: "world map",
          time: "2015-01-01"
        }
      ]),
    };
  },
  rowPressed(rowData) {
    this.props.navigator.push({
      title: "Event Detail",
      component: EventDetail
    });
  },
  _renderRow: function(rowData) {
    return (  
      <TouchableHighlight onPress={() => this.rowPressed(rowData)}
          underlayColor='#dddddd'>       
        <View style={styles.row}>
            <Image style={styles.image} source={{uri: rowData.imageUri}} />
            <Text style={styles.title}>{rowData.title}</Text>
            <Text style={styles.address}>{rowData.address}</Text>
            <Text style={styles.time}>{rowData.time}</Text>
        </View>
      </TouchableHighlight>
    );
  },
  render: function() {
    return(
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
    }
});

module.exports = EventList;
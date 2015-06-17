var React = require('react-native');
var insightRepo = require('./insightRepository');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = React;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var ListViewSimpleExample = React.createClass({
  statics: {
    title: '<ListView> - Simple',
    description: 'Performant, scrollable list of data.'
  },

  getInitialState: function () {
    return {
      dataSource: ds.cloneWithRows([]),
    };
  },

  componentWillMount: function () {
    this._pressData = {};
  },

  componentDidMount: function() {
    insightRepo.getAll(function(data){
      this.setState({dataSource: ds.cloneWithRows(data)});
    }.bind(this));
  },

  render: function () {
    return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}/>
    );
  },

  _renderRow: function (rowData, sectionID, rowID) {
    return (
        <TouchableHighlight onPress={() => this._pressRow(rowID)}>
          <View>
            <Text>
            {rowData.get('title')}
            </Text>
          </View>
        </TouchableHighlight>
    );
  }

})

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
});

module.exports = ListViewSimpleExample;
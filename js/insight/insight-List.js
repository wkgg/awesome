var React = require('react-native');
var insightRepo = require('./insight-repository');
var {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    } = React;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var InsightDetail = require('./insight-detail.js');

var ListViewSimpleExample = React.createClass({
    statics: {
        title: '<ListView> - Simple',
        description: 'Performant, scrollable list of data.'
    },

    getInitialState: function () {
        return {
            dataSource: ds.cloneWithRows([])
        };
    },

    componentDidMount: function () {
        insightRepo.getList(function (data) {
            this.setState({dataSource: ds.cloneWithRows(data)});
        }.bind(this));
    },

    render: function () {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                style={styles.listView}/>
        );
    },

    _renderRow: function (rowData, sectionID, rowID) {

        return (
            <TouchableHighlight onPress={() => this._pressRow(rowData.id)} underlayColor='white'>
                <View>
                    <Text style={styles.title}>
                        {rowData.title}
                    </Text>
                    <Text style={styles.text}>
                        {rowData.description}
                    </Text>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    },

    _pressRow: function (objectID) {
        this.props.navigator.push({
            title: "insight Detail",
            component: InsightDetail,
            passProps: {id: objectID}
        });
    }
});


var styles = StyleSheet.create({

    listView: {
        backgroundColor: '#F6F6F6'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6'
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC'
    },
    thumb: {
        width: 64,
        height: 64
    },
    title: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },

    text: {
        padding: 10,
        flex: 1
    }
});

module.exports = ListViewSimpleExample;
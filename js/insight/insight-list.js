var React = require('react-native');
var insightRepo = require('./insight-repository');
var InsightDetail = require('./insight-detail.js');

var {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    AsyncStorage
} = React;

const InsightListStorageKey = "insight-list";
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var ListViewSimpleExample = React.createClass({
    stripHTML: function(html){
        var regex = /(<([^>]+)>)/ig;
        return html.replace(regex, "");
    },
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
            AsyncStorage.setItem(InsightListStorageKey, JSON.stringify(data)).then(() => {
                this.getDataFromStorage();
            });
        }.bind(this));

        this.getDataFromStorage();
    },
    getDataFromStorage: function () {
        AsyncStorage.getItem(InsightListStorageKey).then((value) => {
            this.setState({dataSource: ds.cloneWithRows(JSON.parse(value))});
        });
    },
    _renderRow: function (rowData, sectionID, rowID) {

        return (
            <TouchableHighlight onPress={() => this._pressRow(rowData.id)} underlayColor='white'>
                <View>
                    <Text style={styles.title}>
                        {rowData.title}
                    </Text>
                    <Text style={styles.text}>
                        {this.stripHTML(rowData.description)}
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
    },
    render: function () {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                style={styles.listView}/>
        );
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

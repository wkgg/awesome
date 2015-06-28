'use strict';

var React = require('react-native');
var insightRepository = require('./insight-repository')

var {
    View,
    Text,
    StyleSheet,
    ScrollView,
    WebView,
    AsyncStorage
    } = React;

var InsightDetailStorageKey = "";

var InsightDetail = React.createClass({
    getHtml: function (title, content) {
        var cssStyle = '<style>h1{font-size: 20px;}img{width:100%;height:200px;}</style>';
        return '<!DOCTYPE html><html><body>' + cssStyle + '<h1>' + title + '</h1>' + content + '</body></html>';
    },
    getInitialState: function () {
        return ({
            insight: ""
        });
    },
    componentDidMount: function () {
        InsightDetailStorageKey = "insight-detail-" + this.props.id;

        insightRepository.getById(this.props.id, function (data) {
            AsyncStorage.setItem(InsightDetailStorageKey, JSON.stringify(data)).then(() => {
                this.getDataFromStorage();
            });
        }.bind(this));

        this.getDataFromStorage();
    },
    getDataFromStorage: function () {
        AsyncStorage.getItem(InsightDetailStorageKey).then((value) => {
            this.setState({insight: JSON.parse(value)});
        });
    },
    render: function () {
        if (this.state.insight != "") {
            var insight = this.state.insight;
            return (
                <View>
                    <ScrollView>
                        <Text style={styles.title}>{insight.title}</Text>
                        <WebView
                            style={styles.webView}
                            ref={'webview'}
                            html={this.getHtml('', insight.content)}
                            scrollEnabled={true}
                            automaticallyAdjustContentInsets={false}/>
                    </ScrollView>
                </View>
            )
        }
        return null;
    }
});

var styles = StyleSheet.create({
    insightDetail: {
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center'
    },
    content: {
        marginTop: 10
    },
    webView: {
        marginTop: 10,
        backgroundColor: 'white',
        height: 500
    }
});

module.exports = InsightDetail;
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
var HTMLWebView = require('react-native-html-webview');

var InsightDetail = React.createClass({
    getHtml: function (title, content) {
        var cssStyle = '<style>h1{font-size: 20px;}img{width:100%;height:200px;}</style>';

        var allImageLink = content.match(/<a href=".*\.[jpg|png|jpeg]+">/i);
        if(allImageLink !== null){
            allImageLink.forEach(function(row){
                content = content.replace(row, '<a>');
            });
        }
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
                <ScrollView>
                    <View>
                        <HTMLWebView
                            style={styles.webView}
                            html={this.getHtml(insight.title, insight.content)}
                            makeSafe={false}
                            autoHeight={true}
                            />
                    </View>
                </ScrollView>
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
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center'
    },
    content: {
        marginTop: 10
    },
    webView: {
        backgroundColor: 'white'
    }
});

module.exports = InsightDetail;
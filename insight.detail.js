'use strict';

var React = require('react-native');
var insightRepository = require('./insightRepository')

var {
    View,
    Text,
    StyleSheet,
    WebView
    } = React;

var FAKE_INSIGHT = {
    title: "this is title of insight",
    content: "i am the body of a real insight which should be very long."
};

var InsightDetail = React.createClass({
    getInitialState: function(){
        return({
            insight: ""
        }
        );
    },
    componentDidMount: function(){
        insightRepository.getById(this.props.id, function(data){
            this.setState({insight: data})
        }.bind(this));
    },
    render: function () {
        if(this.state.insight != ""){
            var insight = this.state.insight;
            return (
              <View>
                <Text style={styles.title}>{insight.get("title")}</Text>
                <WebView
                    style={styles.webView}
                    ref={'webview'}
                    html={insight.get("content")}
                    automaticallyAdjustContentInsets={false} />
              </View>
            )
        }
        /* need improve later*/
        return null;       
    }
});

var styles = StyleSheet.create({
    insightDetail: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    content: {
        marginTop: 10
    },
    webView: {
        marginTop: 10,
        height: 500,
        backgroundColor: 'white',
    },
});

module.exports = InsightDetail;
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var InsightDetail = require('insight.detail.js');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TabBarIOS,
  View,
} = React;

var awesome = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.'
  },
  getInitialState: function() {
    return {
      selectedTab: 'InsightsTab'
    };
  },
  _renderContent: function() {
    return (
      <View style={[styles.tabContent, {backgroundColor: 'white'}]}>
        <Text style={styles.tabText}>{this.state.selectedTab}</Text>
      </View>
    );
  },
  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Insights"
          selected={this.state.selectedTab === 'InsightsTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'InsightsTab',
            });
          }}>
          {this._renderContent()}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Events"
          selected={this.state.selectedTab === 'EventsTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'EventsTab',
            });
          }}>
          {this._renderContent()}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'blue',
    margin: 40,
  },
});


AppRegistry.registerComponent('awesome', () => awesome);

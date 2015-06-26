/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var InsightDetail = require('./js/insight/insight-detail');
var EventList = require('./js/event/event-list')
var EventDetail = require('./js/event/event-detail')
var InsightList = require('./js/insight/insight-list')

var {
  AppRegistry,
  StyleSheet,
  Text,
  TabBarIOS,
  View,
  NavigatorIOS
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
  _renderEventList: function() {
    return (
      <NavigatorIOS
       style={styles.container}
       initialRoute={{
         title: 'Event List',
         component: EventList,
       }}/>
    );
  },
    _renderInsightList: function() {
    return (
      <NavigatorIOS
       style={styles.container}
       initialRoute={{
         title: 'Insight List',
         component: InsightList,
       }}/>
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
          {this._renderInsightList()}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Events"
          selected={this.state.selectedTab === 'EventsTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'EventsTab',
            });
          }}>
          {this._renderEventList()}
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
  container: {
    flex: 1
  }
});


AppRegistry.registerComponent('awesome', () => awesome);

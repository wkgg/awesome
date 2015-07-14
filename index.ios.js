'use strict';

var React = require('react-native');
var HTMLWebView = require('react-native-html-webview');
var InsightDetail = require('./js/insight/insight-detail');
var EventList = require('./js/event/event-list')
var EventDetail = require('./js/event/event-detail')
var InsightList = require('./js/insight/insight-list')
var Icon = require('FAKIconImage');
var SMXTabBarIOS = require('SMXTabBarIOS');
var SMXTabBarItemIOS = SMXTabBarIOS.Item;

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
         title: 'Events',
         component: EventList,
       }}/>
    );
  },
    _renderInsightList: function() {
    return (
      <NavigatorIOS
       style={styles.container}
       initialRoute={{
         title: 'Insights',
         component: InsightList,
       }}/>
    );
  },
  render: function() {
    return (
        <SMXTabBarIOS>
          <SMXTabBarItemIOS
              name="insight"
              iconName={'fontawesome|lightbulb-o'}
              title={'Insights'}
              iconSize={32}
              accessibilityLabel="Home Tab"
              selected={this.state.selectedTab === 'InsightsTab'}
              onPress={() => {
            this.setState({
              selectedTab: 'InsightsTab',
            });
          }}>
            {this._renderInsightList()}
          </SMXTabBarItemIOS>
          <SMXTabBarItemIOS
              name="insight"
              iconName={'fontawesome|users'}
              title={'Events'}
              iconSize={32}
              accessibilityLabel="Home Tab"
              selected={this.state.selectedTab === 'EventsTab'}
              onPress={() => {
            this.setState({
              selectedTab: 'EventsTab',
            });
          }}>
            {this._renderEventList()}
          </SMXTabBarItemIOS>

      </SMXTabBarIOS>
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

'use strict';

var React = require('react-native');
var appconfig = require('./appconfig');
var AV = require('avoscloud-sdk').AV;

var activityRepo = {};

AV.initialize(appconfig.appId, appconfig.appKey);

var Activity = AV.Object.extend("Activity");
var query = new AV.Query(Activity);

activityRepo.getAll = function(success, error){
    query.find({
        success: function(activity) {
            success(activity);
        },
        error: function(object, error) {
            error(error);
        }
    });
}

module.exports = activityRepo;


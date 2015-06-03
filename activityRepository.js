'use strict';

var React = require('react-native');
var appconfig = require('./appconfig');
var AV = require('avoscloud-sdk').AV;

var activityRepo = {};

AV.initialize(appconfig.appId, appconfig.appKey);

var Activity = AV.Object.extend("Activity");

activityRepo.getAll = function(success, error){
	var query = new AV.Query(Activity);
    query.find({
        success: success,
        error: error
    });
}

activityRepo.getById = function(activityId, success, error){
	var query = new AV.Query(Activity);

    query.get(activityId, {
        success: success,
        error: error
    });
}

activityRepo.getList = function(success, error){
	var query = new AV.Query.doCloudQuery('select title, publishDate from Activity', {
	success: success,
	  error: error
	});
}

module.exports = activityRepo;


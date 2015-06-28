'use strict';

var React = require('react-native');
var appconfig = require('../../appconfig');
var AV = require('avoscloud-sdk').AV;

var activityRepo = {};

AV.initialize(appconfig.appId, appconfig.appKey);

var Activity = AV.Object.extend("Activity");

activityRepo.getById = function (activityId, success, error) {
    var query = new AV.Query(Activity);

    query.get(activityId, {
        success: function (data) {
            success(getActivityObject(data));
        },
        error: error
    });
};

activityRepo.getList = function (success, error) {
    var query = new AV.Query.doCloudQuery('select title, imageUrl, eventDate, location from Activity', {
        success: function (data) {
            var resultObj = data.results.map(function (row) {
                return getActivityObject(row);
            });
            success(resultObj);
        },
        error: error
    });
};

var getActivityObject = function (data) {
    var activityObj = {};
    activityObj.id = data.id;
    activityObj.content = data.get('content');
    activityObj.eventDate = data.get('eventDate');
    activityObj.imageUrl = data.get('imageUrl');
    activityObj.location = data.get('location');
    activityObj.tags = data.get('tags');
    activityObj.title = data.get('title');
    return activityObj;
};

module.exports = activityRepo;


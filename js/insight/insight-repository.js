'use strict';

var React = require('react-native');
var appconfig = require('../../appconfig');
var AV = require('avoscloud-sdk').AV;

var insightRepo = {};

AV.initialize(appconfig.appId, appconfig.appKey);

var Post = AV.Object.extend("Post");

insightRepo.getById = function (insightId, success, error) {
    var query = new AV.Query(Post);

    query.get(insightId, {
        success: function (data) {
            success(getInsightObject(data));
        },
        error: error
    });
};

insightRepo.getList = function (success, error) {
    var query = new AV.Query.doCloudQuery('select title, description, tags, publishDate from Post', {
        success: function (data) {
            var resultObj = data.results.map(r => getInsightObject(r));
            success(resultObj);
        },
        error: error
    });
};

function getInsightObject(data) {
    var insightObj = {};
    insightObj.id = data.id;
    insightObj.content = data.get('content');
    insightObj.description = data.get('description');
    insightObj.guid = data.get('guid');
    insightObj.publishDate = data.get('publishDate');
    insightObj.tags = data.get('tags');
    insightObj.title = data.get('title');
    return insightObj;
}

module.exports = insightRepo;


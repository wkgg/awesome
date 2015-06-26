'use strict';

var React = require('react-native');
var appconfig = require('../../appconfig');
var AV = require('avoscloud-sdk').AV;

var insightRepo = {};

AV.initialize(appconfig.appId, appconfig.appKey);

var Post = AV.Object.extend("Post");

insightRepo.getAll = function(success, error){
	var query = new AV.Query(Post);
    query.find({
        success: success,
        error: error
    });
}

insightRepo.getById = function(insightId, success, error){
	var query = new AV.Query(Post);

    query.get(insightId, {
        success: success,
        error: error
    });
}

insightRepo.getList = function(success, error){
	var query = new AV.Query.doCloudQuery('select title, description, tags, publishDate from Post', {
	success: success,
	  error: error
	});
}

module.exports = insightRepo;


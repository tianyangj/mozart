
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function (request, response) {
  response.success("Hello world!!");
});

Parse.Cloud.define('likeComposition', function (req, res) {
  var composition = new Parse.Object('Composition');
  composition.id = req.params.compositionId;
  var query = new Parse.Query('Activity');
  query.equalTo('type', req.params.type);
  query.equalTo('fromUser', req.user);
  query.equalTo('composition', composition);
  query.first().then(function (activity) {
    if (activity) {
      res.error('likeComposition already exists');
    } else {
      activity = new Parse.Object('Activity');
      activity.save({
        type: req.params.type,
        fromUser: req.user,
        composition: composition
      }).then(function (activity) {
        res.success(activity);
      }, function () {
        res.error('likeComposition save failed');
      });
    }
  }, function () {
    res.error('likeComposition lookup failed');
  });
});

Parse.Cloud.define('unlikeComposition', function (req, res) {
  var composition = new Parse.Object('Composition');
  composition.id = req.params.compositionId;
  var query = new Parse.Query('Activity');
  query.equalTo('type', req.params.type);
  query.equalTo('fromUser', req.user);
  query.equalTo('composition', composition);
  query.first().then(function (activity) {
    if (activity) {
      activity.destroy().then(function (activity) {
        res.success(activity);
      }, function (error) {
        res.error('likeComposition destroy failed');
      });
    } else {
      res.error('likeComposition does not exist');
    }
  }, function () {
    res.error('likeComposition lookup failed');
  });
});

Parse.Cloud.define('rateDifficulty', function (req, res) {
  if (typeof req.params.difficulty !== 'number') {
    res.error('Difficulty is not valid number.');
  }
  if (req.params.difficulty < 1 || req.params.difficulty > 10) {
    res.error('Difficulty out of range.');
  }
  var composition = new Parse.Object('Composition');
  composition.id = req.params.compositionId;
  var query = new Parse.Query('Activity');
  query.equalTo('type', req.params.type);
  query.equalTo('fromUser', req.user);
  query.equalTo('composition', composition);
  query.first().then(function (activity) {
    if (activity) {
      activity.set('difficulty', req.params.difficulty);
      activity.save().then(function (activity) {
        res.success(activity);
      }, function () {
        res.error('rateDifficulty update failed');
      });
    } else {
      activity = new Parse.Object('Activity');
      activity.save({
        type: req.params.type,
        fromUser: req.user,
        composition: composition,
        difficulty: req.params.difficulty
      }).then(function (activity) {
        res.success(activity);
      }, function () {
        res.error('rateDifficulty save failed');
      });
    }
  }, function () {
    res.error('rateDifficulty lookup failed');
  });
});

Parse.Cloud.define('getDifficulty', function (req, res) {
  var composition = new Parse.Object('Composition');
  composition.id = req.params.compositionId;
  var query = new Parse.Query('Activity');
  query.equalTo('type', req.params.type);
  query.equalTo('composition', composition);
  query.find().then(function (activities) {
    res.success(activities);
  }, function () {
    res.error('getDifficulty lookup failed');
  });
});
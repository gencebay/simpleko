/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('simpleko generator', function () {

  var simpleko;

  var mockPrompts = {
    longName: "Simple Ko Generator App",
    slugName: "SimpleKoGenerator",
    includeTests: true,
    compass: true,
    bootstrap: true,
    compassBootstrap: true,
    modules: []
  };

  var genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  var deps = [
                '../../app',
                // [createDummyGenerator(), 'karma:app']
            ];

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        done(err);
      }
      simpleko = helpers.createGenerator(
        'ko:app',
        deps,
        false,
        genOptions
      );
      helpers.mockPrompt(simpleko, mockPrompts);
      done();
    });
  });

  it('creates expected files', function (done) {
      var expected = [
        // add files you expect to exist here.
        'index.js'
      ];
      simpleko.run({}, function() {
        helpers.assertFile(expected);
        done();
      });
  });
});

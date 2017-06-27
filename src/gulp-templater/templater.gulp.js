'use strict';

var Stream = require('stream');
var Path = require('path');
var DomParser = require('dom-parser');
var parser = new DomParser();
var fs = require('fs');

function gulpTemplater(options) {
  var stream = new Stream.Transform({objectMode: true});

  stream._transform = function(file, unused, callback) {
    var parsedfile = file.contents.toString();
    //imports('../templater.js');
    options.document = parser.parseFromString(parsedfile);
    var base64data = new Buffer(Templater(options), 'binary').toString('base64');
    file.contents = new Buffer(base64data, 'base64');
    callback(null, file);
  };

  return stream;
}

module.exports = gulpTemplater;
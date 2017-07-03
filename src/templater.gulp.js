'use strict';

import Stream from 'stream';
import Path from 'path';
import DomParser from 'dom-parser';
import fs from 'fs';
const parser = new DomParser();

function gulpTemplater(options) {
  const stream = new Stream.Transform({objectMode: true});

  stream._transform = (file, unused, callback) => {
    const parsedfile = file.contents.toString();
    options.document = parser.parseFromString(parsedfile);
    //import("./templater.js");
    const base64data = new Buffer(Templater.run(options), 'binary').toString('base64');
    file.contents = new Buffer(base64data, 'base64');
    callback(null, file);
  };

  return stream;
}

module.exports = gulpTemplater;
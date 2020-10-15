#!/usr/bin/env node
"use strict";
const { getFiles } = require('./src/getFiles.js');
const { compressFile } = require('./src/compressFile.js');

let enableBrotli = false;
const args = process.argv.slice(2);

if (['-b', '--brotli'].includes(args[0])) {
  enableBrotli = true;
}

console.log(`Will compress files to .gz ${enableBrotli ? 'and .br' : ''}`);

/**
 * Method to gzip the script and stylesheet files
 *
 * @param enableBrotli { boolean } The CLI argument
 *
 * @returns { void }
 */
getFiles(`${process.cwd()}/`)
  .then(async files => {
    for (const file of files) {
      compressFile(file, enableBrotli);
    }
  })
  .then(_ => { console.log('Done 👍');})
  .catch(err => process.exit(err ? 1 : 0));

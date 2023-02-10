#!/usr/bin/env node
"use strict";
import { getFiles } from './src/getFiles.js';
import { compressFile } from './src/compressFile.js';

console.log('Will compress files to .gz');

/**
 * Method to gzip the script and stylesheet files
 *
 * @param enableBrotli { boolean } The CLI argument
 *
 * @returns { void }
 */
getFiles(`${process.cwd()}/`).then(files => files.forEach(file => compressFile(file))).catch(err => process.exit(err ? 1 : 0));

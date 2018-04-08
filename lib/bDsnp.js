/*!
 * bDSNP.js - decentralized session negotiation for bcoin
 * Copyright (c) 2017, QwertyPie (MIT License).
 * https://github.com/Patrickdlg/bDSNP
 */

'use strict';

const Plugin = require('./plugin');
const DSNP = require('./dsnp');

exports = Plugin;

exports.Plugin = Plugin;
exports.DSNP = DSNP;

module.exports = exports;

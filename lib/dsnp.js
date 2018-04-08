/*!
 * dsnp.js - decentralized session negotiation plugin for bcoin
 * Copyright (c) 2017, QwertyPie (MIT License).
 * https://github.com/Patrickdlg/bDsnp
 */

'use strict';

const EventEmitter = require('events');

class Dsnp extends EventEmitter{
  /**
   * Create a plugin.
   * @constructor
   * @param {Options} options
   */
  constructor(options) {
    super();
    this.network = options.network
    this.init();
  }

  init(){
     console.log('connecting to: %s', this.network);
  }
}

module.exports = Dsnp

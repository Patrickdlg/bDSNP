/*!
 * dsmp.js - dsmp plugin for bcoin
 * Copyright (c) 2017, QwertyPie (MIT License).
 * https://github.com/Patrickdlg/dsmp
 */

'use strict';

const EventEmitter = require('events');

class Dsmp extends EventEmitter{
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

module.exports = Dsmp

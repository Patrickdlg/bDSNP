/*!
 * dsnp.js - decentralized session negotiation plugin for bcoin
 * Copyright (c) 2017, QwertyPie (MIT License).
 * https://github.com/Patrickdlg/bDSNP
 */

'use strict';

const EventEmitter = require('events');

class DSNP extends EventEmitter{
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
     console.log('initializing DSNP server over network: %s', this.network);

  }
}

module.exports = DSNP

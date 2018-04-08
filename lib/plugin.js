/*!
 * plugin.js - decentralized session negotiation plugin for bcoin
 * Copyright (c) 2017, QwertyPie (MIT License).
 * https://github.com/Patrickdlg/bDSNP
 */

'use strict';

const DSNP = require('./dsnp');

/**
 * @exports plugin
 */

const plugin = exports;

/**
 * Plugin
 * @extends DSNP
 */

class Plugin extends DSNP {
  /**
   * Create a plugin.
   * @constructor
   * @param {Node} node
   */

  constructor(node) {
    const options = {
      network: node.network
    };

    super(options);
  }
}

/**
 * Plugin name.
 * @const {String}
 */

plugin.id = 'bDSNP';

/**
 * Plugin initialization.
 * @param {Node} node
 * @returns {Plugin}
 */

plugin.init = function init(node) {
  return new Plugin(node);
};

/*!
 * plugin.js - dsmp plugin for bcoin
 * Copyright (c) 2017, QwertyPie (MIT License).
 * https://github.com/Patrickdlg/dsmp
 */

'use strict';

const Index = require('./dsmp');

/**
 * @exports plugin
 */

const plugin = exports;

/**
 * Plugin
 * @extends Dsmp
 */

class Plugin extends Dsmp {
  /**
   * Create a plugin.
   * @constructor
   * @param {Node} node
   */

  constructor(node) {
    const options = {
      network: node.network,
      logger: node.logger,
      chain: node.chain,
      prefix: node.config.filter('index').prefix,
      memory: node.config.filter('index').bool('memory', node.memory),
      maxFiles: node.config.filter('index').uint('max-files'),
      cacheSize: node.config.filter('index').mb('cache-size'),
      indexTX: node.config.filter('index').bool('tx'),
      indexAddress: node.config.filter('index').bool('address'),
      indexFilters: node.config.filter('index').bool('filters')
    };

    super(options);
  }
}

/**
 * Plugin name.
 * @const {String}
 */

plugin.id = 'dsmp';

/**
 * Plugin initialization.
 * @param {Node} node
 * @returns {Plugin}
 */

plugin.init = function init(node) {
  return new Plugin(node);
};

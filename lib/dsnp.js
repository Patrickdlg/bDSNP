/*!
 * dsnp.js - decentralized session negotiation plugin for bcoin
 * Copyright (c) 2017, QwertyPie (MIT License).
 * https://github.com/Patrickdlg/bDSNP
 */

'use strict';

const EventEmitter = require('events');
const NodeStatic = require('node-static');
const WebSocketServer = require('websocket').server;
const HTTP = require('http');

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
     this.initHttpServer();
     this.initWebSocketServer();
  }

  initHttpServer(){
    console.log('creating DSNP HTTP endpoint');
    var file = new NodeStatic.Server('./public');
    this.httpApp = HTTP.createServer(function(request, response) {
      request.addListener('end', function() {
        file.serve(request, response);
      }).resume();
    });
  }

  initWebSocketServer(){
    console.log('creating DSNP Web Socket server');
    this.wsApp = new WebSocketServer({
      httpServer: this.httpApp,
      autoAcceptConnections: false
    }).on('request', this.onRequest);
  }

  onRequest(){
    this.hasReceivedRequest = true;
  }
}

module.exports = DSNP

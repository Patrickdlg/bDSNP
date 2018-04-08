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

  /**
   * initialize signaling services
   */
  init(){
     console.log('initializing DSNP server over network: %s', this.network);
     this.clients = []
     this.initHttpServer();
     this.initWebSocketServer();
     this.httpApp.listen(12034);
  }

  /**
   * initialize the http server for healthcheck/static content
   */
  initHttpServer(){
    console.log('creating DSNP HTTP endpoint');
    var file = new NodeStatic.Server(__dirname.replace('lib', 'www'));
    this.httpApp = HTTP.createServer(function(request, response) {
      request.addListener('end', function() {
        file.serve(request, response);
      }).resume();
    });
  }

  /**
   * initialize the web socket server for signaling
   */
  initWebSocketServer(){
    console.log('creating DSNP Web Socket server');
    this.wsApp = new WebSocketServer({
      httpServer: this.httpApp,
      autoAcceptConnections: false
    }).on('request', this.onRequest.bind(this));
  }

  onRequest(socket){
    var origin = socket.origin + socket.resource;
    console.log('received request from: %s', origin)
    var websocket = socket.accept(null, origin);
    this.clients.push(websocket);
    var self = this;
    websocket.on('message', function(message) {
      self.handleMessage(websocket, message)});
    websocket.on('close', function() {
      self.removeClient(websocket);});
  }

  handleMessage(websocket, message){
    if (message.type === 'utf8') {
      console.log('broadcasting utf8 data', message.utf8Data);
      this.clients.forEach(function(previousSocket) {
        if (previousSocket != websocket) previousSocket.sendUTF(message.utf8Data);
    });}
    else if (message.type === 'binary') {
      console.log('broadcasting binary data', message.binaryData);
      this.clients.forEach(function(previousSocket) {
        if (previousSocket != websocket) previousSocket.sendBytes(message.binaryData);
      });
    }
  }

  removeClient(websocket){
    var newClientsArray = [];
    for (var i = 0; i < this.clients.length; i++) {
      var previousSocket = this.clients[i];
      if (previousSocket != websocket) newClientsArray.push(previousSocket);
    }
    this.clients = newClientsArray;
  }



}

module.exports = DSNP

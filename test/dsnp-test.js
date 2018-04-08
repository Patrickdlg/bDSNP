/* eslint-env mocha */
/* eslint prefer-arrow-callback: "off" */

'use strict';
const DSNP = require('../lib/dsnp');
const assert = require('assert');
const EventEmitter = require('events');

describe('DSNP initialization', function () {
  var options = {'network': 'unittest'}
  var dsnp = new DSNP(options)

  it('gets the network', async () =>{
    assert.equal(dsnp.network, options['network'])
  });

  it('creates http and ws servers', async () =>{
    assert(dsnp.httpApp)
    assert(dsnp.wsApp)
  });
  dsnp.httpApp.close();
});

class FakeSocket extends EventEmitter{
  constructor(options){
    super();
    this.origin = options.origin;
    this.resource = options.resource;
  }
  accept(placeholder, origin){
    return new FakeAcceptedSocket(this);
  }

}

class FakeAcceptedSocket extends EventEmitter{
  constructor(fakeSocket){
    super();
    this.origin = fakeSocket.origin
    this.resource = fakeSocket.resource
  }
  sendUTF(data){
    this.utfData = data;
  }
  sendBytes(data){
    this.byteData = data;
  }
}

describe('DSNP messaging', function () {
  var options = {'network': 'unittest'};
  var socket_alice = new FakeSocket({'origin': 'aliceorig/', 'resource': 'alice'});
  var socket_bob = new FakeSocket({'origin': 'boborig/', 'resource': 'bob'});
  it('registers users', async () =>{
    var dsnp = new DSNP(options);
    dsnp.wsApp.emit('request', socket_alice);
    dsnp.wsApp.emit('request', socket_bob);
    assert.equal(dsnp.clients[0].origin, socket_alice.origin);
    assert.equal(dsnp.clients[1].origin, socket_bob.origin);
    assert.equal(dsnp.clients[0].resource, socket_alice.resource);
    assert.equal(dsnp.clients[1].resource, socket_bob.resource);
    dsnp.httpApp.close();
  });

  it('removes users', async () =>{
    var dsnp = new DSNP(options);
    dsnp.wsApp.emit('request', socket_alice);
    dsnp.wsApp.emit('request', socket_bob);
    var bob = dsnp.clients[1];
    bob.emit('close');
    assert.equal(dsnp.clients.length, 1);
    assert.equal(dsnp.clients[0].origin, socket_alice.origin);
    assert.equal(dsnp.clients[0].resource, socket_alice.resource);
    var alice = dsnp.clients[0];
    alice.emit('close');
    assert.equal(dsnp.clients.length, 0);
    dsnp.httpApp.close();
  });

  var specialData = 'arethesebytesorutf8?'
  it('handles utf messages', async () =>{
    var dsnp = new DSNP(options);
    dsnp.wsApp.emit('request', socket_alice);
    dsnp.wsApp.emit('request', socket_bob);
    var alice = dsnp.clients[0];
    alice.emit('message', {'type': 'utf8', 'utf8Data': specialData});
    dsnp.httpApp.close();
  });

  it('handles binary messages', async () =>{
    var dsnp = new DSNP(options);
    dsnp.wsApp.emit('request', socket_alice);
    dsnp.wsApp.emit('request', socket_bob);
    var alice = dsnp.clients[0];
    alice.emit('message', {'type': 'binary', 'binaryData': specialData});
    dsnp.httpApp.close();
  });
});

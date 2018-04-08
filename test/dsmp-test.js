/* eslint-env mocha */
/* eslint prefer-arrow-callback: "off" */

'use strict';
const assert = require('assert');
const FullNode = require('')

const node = new FullNode({
  network: 'regtest',
  apiKey: 'foo',
  walletAuth: true,
  memory: true,
  workers: true,
  plugins: [require('../lib/wallet/plugin')]
});
describe('Dsmp', function () {
  it('dummy', async () =>{
    assert.equal(1,1)
  });
});

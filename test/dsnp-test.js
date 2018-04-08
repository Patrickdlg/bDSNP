/* eslint-env mocha */
/* eslint prefer-arrow-callback: "off" */

'use strict';
const DSNP = require('../lib/dsnp');
const assert = require('assert');

describe('DSNP', function () {
  it('gets the network', async () =>{
    var options = {'network': 'unittest'}
    var dsnp = new DSNP(options)
  });
});

/**
 * @license Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const NoWebSQLAudit = require('../../../audits/dobetterweb/no-websql.js');
const assert = require('assert');

/* eslint-env mocha */

describe('No websql audit', () => {
  it('passes when no database is created', () => {
    assert.equal(NoWebSQLAudit.audit({
      WebSQL: null,
    }).rawValue, true);
  });

  it('fails when database is created', () => {
    const auditResult = NoWebSQLAudit.audit({
      WebSQL: {
        id: '1',
        domain: 'example.com',
        name: 'db-name',
        version: '1.0',
      },
    });

    assert.equal(auditResult.rawValue, false);
    assert.ok(auditResult.displayValue.match(/db-name.*1.0/));
  });
});

// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const path = require('path');
const {Storage} = require('@google-cloud/storage');
const cp = require('child_process');
const {assert} = require('chai');
const {describe, it, before, after} = require('mocha');
const uuid = require('uuid');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const storage = new Storage();
const bucketName = `nodejs-docs-samples-test-${uuid.v4()}`;
const cmd = 'node async-batch-annotate-images.js';

const files = ['pdf-ocr.pdf', 'landmark.jpg'].map(name => {
  return {
    name,
    localPath: path.resolve(path.join(__dirname, `../resources/${name}`)),
  };
});

describe('detect v1 p4 beta1', () => {
  before(async () => {
    const [bucket] = await storage.createBucket(bucketName);
    await Promise.all(files.map(file => bucket.upload(file.localPath)));
  });

  after(async () => {
    const bucket = storage.bucket(bucketName);
    await bucket.deleteFiles({force: true});
    await bucket.delete();
  });

  it('should annotate the remote landmark.jpg sample', async () => {
    const output = execSync(
      `${cmd} gs://${bucketName}/${files[1].name} gs://${bucketName}/out/`
    );
    assert.match(output, /Output written to GCS with prefix: gs:\/\//);
  });
});

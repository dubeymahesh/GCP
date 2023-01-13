// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const {assert} = require('chai');
const {describe, it} = require('mocha');
const sinon = require('sinon');
const uuid = require('uuid');
const speech = require('@google-cloud/speech').v2;

const {createCustomClassV2} = require('../adaptationCustomClassReference.v2');

const text = 'how old is the Brooklyn Bridge';

let recognizerName, projectId, customClassName, phraseSetName;

describe('Creates a custom class reference (v2)', () => {
  const stubConsole = function () {
    sinon.stub(console, 'error');
    sinon.stub(console, 'log');
  };

  const restoreConsole = function () {
    console.log.restore();
    console.error.restore();
  };

  before(async () => {
    const client = new speech.SpeechClient();
    projectId = await client.getProjectId();

    const recognizerRequest = {
      parent: `projects/${projectId}/locations/global`,
      recognizerId: `rec-${uuid.v4()}`,
      recognizer: {
        languageCodes: ['en-US'],
        model: 'latest_short',
      },
    };

    const operation = await client.createRecognizer(recognizerRequest);
    const recognizer = operation[0].result;
    recognizerName = recognizer.name;
  });

  beforeEach(stubConsole);
  afterEach(restoreConsole);

  it('should create a custom class reference and phrase set', async () => {
    const customClassId = `cls-${uuid.v4()}`;
    const phraseSetId = `phrase-${uuid.v4()}`;
    await createCustomClassV2(
      projectId,
      customClassId,
      phraseSetId,
      recognizerName
    );

    customClassName = console.log.firstCall.args[0].replace(
      'CustomClass name: ',
      ''
    );
    phraseSetName = console.log.secondCall.args[0].replace(
      'PhraseSet name: ',
      ''
    );

    assert.include(customClassName, customClassId);
    assert.include(phraseSetName, phraseSetId);
    assert.include(console.log.thirdCall.args[0], text);
  });

  after(async () => {
    const client = new speech.SpeechClient();
    await client.deleteRecognizer({name: recognizerName});
    await client.deleteCustomClass({name: customClassName});
    await client.deletePhraseSet({name: phraseSetName});
  });
});
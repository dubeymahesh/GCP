// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

function main(
  projectId = 'YOUR_PROJECT_ID',
  location = 'us-central1',
  operationId = 'YOUR_OPERATION_ID'
) {
  // [START automl_get_operation_status_beta]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const projectId = 'YOUR_PROJECT_ID';
  // const location = 'us-central1';
  // const operationId = 'YOUR_OPERATION_ID';

  // Imports the Google Cloud AutoML library
  const {AutoMlClient} = require('@google-cloud/automl').v1beta1;

  // Instantiates a client
  const client = new AutoMlClient();

  async function getOperationStatus() {
    // Construct request
    const request = {
      name: `projects/${projectId}/locations/${location}/operations/${operationId}`,
    };

    const [response] = await client.operationsClient.getOperation(request);

    console.log(`Name: ${response.name}`);
    console.log('Operation details:');
    console.log(response);
  }

  getOperationStatus();
  // [END automl_get_operation_status_beta]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));

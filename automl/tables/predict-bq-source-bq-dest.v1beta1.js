// Copyright 2020 Google LLC
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

async function main(
  projectId = 'YOUR_PROJECT_ID',
  computeRegion = 'YOUR_REGION_NAME',
  modelId = 'MODEL_ID',
  inputUri = 'BIGQUERY_PATH',
  outputUri = 'BIGQUERY_DIRECTORY'
) {
  // [START automl_tables_batch_predict_bq]

  /**
   * Demonstrates using the AutoML client to request prediction from
   * automl tables using bigQuery.
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = '[PROJECT_ID]' e.g., "my-gcloud-project";
  // const computeRegion = '[REGION_NAME]' e.g., "us-central1";
  // const modelId = '[MODEL_ID]' e.g., "TBL4704590352927948800";
  // const inputUri = '[BIGQUERY_PATH]'
  // e.g., "bq://<project_id>.<dataset_id>.<table_id>",
  // `The Big Query URI containing the inputs`;
  // const outputUri = '[BIGQUERY_PATH]' e.g., "bq://<project_id>",
  // `The destination Big Query URI for storing outputs`;

  const automl = require('@google-cloud/automl');

  // Create client for prediction service.
  const automlClient = new automl.v1beta1.PredictionServiceClient();

  // Get the full path of the model.
  const modelFullId = automlClient.modelPath(projectId, computeRegion, modelId);

  async function batchPredict() {
    // Construct request
    // Get the Big Query input URI.
    const inputConfig = {
      bigquerySource: {
        inputUri: inputUri,
      },
    };

    // Get the Big Query output URI.
    const outputConfig = {
      bigqueryDestination: {
        outputUri: outputUri,
      },
    };

    const [, operation] = await automlClient.batchPredict({
      name: modelFullId,
      inputConfig: inputConfig,
      outputConfig: outputConfig,
    });

    // Get the latest state of long-running operation.
    console.log(`Operation name: ${operation.name}`);
  }

  batchPredict();
  // [END automl_tables_batch_predict_bq]
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err.message);
  process.exitCode = 1;
});
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

async function main(batchPredictionJobId, project, location = 'us-central1') {
  // [START aiplatform_cancel_batch_prediction_job_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.\
   * (Not necessary if passing values as arguments)
   */

  // const batchPredictionJobId = 'YOUR_BATCH_PREDICTION_JOB_ID';
  // const project = 'YOUR_PROJECT_ID';
  // const location = 'YOUR_PROJECT_LOCATION';

  // Imports the Google Cloud Job Service Client library
  const {JobServiceClient} = require('@google-cloud/aiplatform');

  // Specifies the location of the api endpoint
  const clientOptions = {
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  };

  // Instantiates a client
  const jobServiceClient = new JobServiceClient(clientOptions);

  async function cancelBatchPredictionJob() {
    // Configure the name resource
    const name = `projects/${project}/locations/${location}/batchPredictionJobs/${batchPredictionJobId}`;
    const request = {
      name,
    };

    // Cancel batch prediction job request
    await jobServiceClient.cancelBatchPredictionJob(request);
    console.log('Cancel batch prediction job response :');
  }

  cancelBatchPredictionJob();
  // [END aiplatform_cancel_batch_prediction_job_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

main(...process.argv.slice(2));

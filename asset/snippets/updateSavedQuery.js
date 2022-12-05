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

// sample-metadata:
//   title: Update Saved Query
//   description: Update Saved Query.

async function main(fullQueryName, description) {
  // [START asset_quickstart_update_feed]
  const util = require('util');
  const {AssetServiceClient} = require('@google-cloud/asset');

  const client = new AssetServiceClient();
  // example inputs:
  // const fullQueryName = 'folders/<FOLDER_NUMBER>/savedQueries/<QUERY_ID>';
  // const description = 'a new description';
  async function updateSavedQuery() {
    const request = {
      savedQuery: {
        name: fullQueryName,
        description: `${description}`,
      },
      updateMask: {
        paths: ['description'],
      },
    };

    // Handle the operation using the promise pattern.
    const [query] = await client.updateSavedQuery(request);
    // Do things with with the response.
    console.log("Query name:", query.name);
    console.log("Query description:", query.description);
    console.log("Created time:", query.createTime);
    console.log("Updated time:", query.lastUpdateTime);
    console.log("Query type:", query.content.queryContent);
    console.log("Query content:", JSON.stringify(query.content, null, 4));
    // [END asset_quickstart_update_feed]
  }
  await updateSavedQuery();
}

exports.updateSavedQuery = main

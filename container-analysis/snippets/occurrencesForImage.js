// Copyright 2019 Google LLC
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

// sample-metadata:
//   title: Occurrences for Image
//   description: Retrieves all Occurrences attached to the metadata of a specified image
//   usage: node occurrencesForImage.js "project-id" "image-url"
async function main(
  projectId = 'your-project-id', // Your GCP Project ID
  imageUrl = 'https://gcr.io/my-project/my-image@sha256:123' // Image to attach metadata to
  // If you are using Google Artifact Registry
  // imageUrl = 'https://LOCATION-docker.pkg.dev/my-project/my-repo/my-image@sha256:123' // Image to attach metadata to
) {
  // [START containeranalysis_occurrences_for_image]
  /**
   * TODO(developer): Uncomment these variables before running the sample
   */
  // const projectId = 'your-project-id', // Your GCP Project ID
  // If you are using Google Container Registry
  // const imageUrl = 'https://gcr.io/my-project/my-repo/my-image@sha256:123' // Image to attach metadata to
  // If you are using Google Artifact Registry
  // const imageUrl = 'https://LOCATION-docker.pkg.dev/my-project/my-repo/my-image@sha256:123' // Image to attach metadata to

  // Import the library and create a client
  const {ContainerAnalysisClient} = require('@google-cloud/containeranalysis');
  const client = new ContainerAnalysisClient();

  const formattedParent = client.getGrafeasClient().projectPath(projectId);

  // Retrieves all the Occurrences associated with a specified image
  const [occurrences] = await client.getGrafeasClient().listOccurrences({
    parent: formattedParent,
    filter: `resourceUrl = "${imageUrl}"`,
  });

  if (occurrences.length) {
    console.log(`Occurrences for ${imageUrl}`);
    occurrences.forEach(occurrence => {
      console.log(`${occurrence.name}:`);
    });
  } else {
    console.log('No occurrences found.');
  }
  // [END containeranalysis_occurrences_for_image]
}

main(...process.argv.slice(2));

// Copyright 2020, Google LLC.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/**
 * List Game Server clusters
 * @param {string} projectId string project identifier
 * @param {string} location Compute Engine region
 * @param {string} realmId the realm to use
 */
async function main(
  projectId = 'YOUR_PROJECT_ID',
  location = 'LOCATION_ID',
  realmId = 'REALM_ID'
) {
  // [START cloud_game_servers_cluster_list]
  const {
    GameServerClustersServiceClient,
  } = require('@google-cloud/game-servers');

  const client = new GameServerClustersServiceClient();

  async function listGameServerClusters() {
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const projectId = 'Your Google Cloud Project ID';
    // const location = 'A Compute Engine region, e.g. "us-central1"';
    // const realmId = 'The ID of the realm to locate this cluster in';
    const request = {
      // Provide full resource name of a Game Server Realm
      parent: client.realmPath(projectId, location, realmId),
      view: 'FULL',
    };

    const results = await client.listGameServerClusters(request);
    const [clusters] = results;

    for (const cluster of clusters) {
      console.log('Game Server Cluster:');
      console.log(`\tCluster name: ${cluster.name}`);
      console.log(`\tCluster description: ${cluster.description}`);
      console.log(
        `\tCluster installed Agones version: ${cluster.clusterState.agonesVersionInstalled}`
      );
      console.log(
        `\tCluster installed Kubernetes version: ${cluster.clusterState.kubernetesVersionInstalled}`
      );
      console.log(
        `\tCluster installation state: ${cluster.clusterState.installationState}`
      );
      console.log(
        `\tGKE cluster: ${cluster.connectionInfo.gkeClusterReference.cluster}`
      );
    }
  }

  listGameServerClusters();
  // [END cloud_game_servers_cluster_list]
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err.message);
  process.exitCode = 1;
});
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

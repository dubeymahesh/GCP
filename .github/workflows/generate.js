// Copyright 2021 Google LLC
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

const nunjucks = require('nunjucks');
const workflows = require('./workflows.json');
const fs = require('fs').promises;

async function main() {
  nunjucks.configure('.github/workflows', {autoescape: true});

  // Optional filter to generate one workflow
  const specificWorkflowPath = process.argv.slice(2)[0];

  for (const workflow of workflows) {
    if (!specificWorkflowPath || specificWorkflowPath === workflow) {
      const path = workflow;
      const name = workflow.split('/').join('-');
      const suite = name.split('-').join('_');
      const data = nunjucks.render('ci.yaml.njk', {path, name, suite});
      await fs.writeFile(`.github/workflows/${name}.yaml`, data);
    }
  }
}

main();

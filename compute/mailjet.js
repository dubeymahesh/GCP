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

// sample-metadata:
//  title: Mailjet
//  usage: node mailjet

'use strict';

// [START compute_send]
const mailer = require('nodemailer');
const smtp = require('nodemailer-smtp-transport');

async function mailjet() {
  const transport = mailer.createTransport(
    smtp({
      host: 'in.mailjet.com',
      port: 2525,
      auth: {
        user: process.env.MAILJET_API_KEY || '<your-mailjet-api-key',
        pass: process.env.MAILJET_API_SECRET || '<your-mailjet-api-secret>',
      },
    })
  );

  const json = await transport.sendMail({
    from: 'ANOTHER_EMAIL@ANOTHER_EXAMPLE.COM', // From address
    to: 'EMAIL@EXAMPLE.COM', // To address
    subject: 'test email from Node.js on Google Cloud Platform', // Subject
    text: 'Hello!\n\nThis a test email from Node.js.', // Content
  });
  console.log(json);
}
mailjet();
// [END compute_send]

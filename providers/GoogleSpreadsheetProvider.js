'use strict';

const path = require('path');
const fs = require('fs');
const {google} = require('googleapis');
const { 
  client_id,
  client_secret,
  redirect_uris 
} = require("../config/google").credentials;

const scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/spreadsheets',
];

const TOKEN_PATH = path.join(__dirname, '..', 'config', 'token.json');

// Open an http server to accept the oauth callback. In this
// simple example, the only request to our webserver is to
// /oauth2callback?code=<code>
function googleSpreadsheetProvider() {
  // Create an oAuth2 client to authorize the API call
  const client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris
  );

  // Generate the url that will be used for authorization
  const authorizeUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  google.options({auth:client})
  const sheets = google.sheets("v4");

  return {
    init() {
      return authorizeUrl;
    },
    async authenticate(code, callback) {
      // Check if we have previously stored a token.
      try {
        const token = await fs.promises.readFile(TOKEN_PATH); 
        console.log(`Set Token from file: ${token}`)
        client.setCredentials(JSON.parse(token));
        callback();
      } catch {
        getNewToken();
      }
      async function getNewToken() {
        client.getToken(code, async (err, tokens) => {
          if (err) {
            console.error('Error getting oAuth tokens:');
            throw err;
          }
          console.log(`Set new Token: ${tokens}`)
          client.setCredentials(tokens);
          // Store the token to disk for later program executions
          await fs.promises.writeFile(TOKEN_PATH, JSON.stringify(tokens));
          console.log('Token stored to', TOKEN_PATH);

          callback();
        })
      }
    },
    async create() {
      const resource = {
        properties: {
          title: "Relatório de vendas"
        }
      }

      const response = await sheets.spreadsheets.create({
        resource,
        fields: 'spreadsheetId'
      })

      console.log(response.data);
    },
    async append(spreadsheetId, data) {
      const res = await sheets.spreadsheets.values.append({
        spreadsheetId,
        requestBody: {
          values: data,
        },
      });
      console.log(res.data);
    }
  }
}

module.exports = googleSpreadsheetProvider;
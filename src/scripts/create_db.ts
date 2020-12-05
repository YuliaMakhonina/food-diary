import { Client } from 'pg';
import * as config from 'config';

(async () => {
  const client = new Client({
    port: config.get('db.port'),
    user: config.get('db.user'),
    password: config.get('db.pass')
  });

  await client.connect();
  await client.query(`CREATE DATABASE "${config.get('db.name')}"`);
  await client.end();
})().catch(err => {
  console.error(err);
});
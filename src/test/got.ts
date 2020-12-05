import got from 'got';
import * as config from 'config';

export const testGot = got.extend({
  prefixUrl: `http://localhost:${config.get('app.port')}/`,
  hooks: {
    beforeError: [
      error => {
        const {response} = error;
        if (response && response.body && response.body) {
          error.message = `(${response.statusCode}) ${JSON.parse(response.body as string).message.join(', ')}`;
        }

        return error;
      }
    ]
  }
});

import got from 'got';
import * as config from 'config';

export const testGot = got.extend({
  prefixUrl: `http://localhost:${config.get('app.port')}/`,
  hooks: {
    beforeError: [
      error => {
        const { response } = error;
        if (response && response.body) {
          const json = JSON.parse(response.body as string);

          error.message = `(${response.statusCode}) ${json.error}: ${
            Array.isArray(json.message) ? json.message.join(', ') : json.message
          }`;
        }

        return error;
      },
    ],
  },
});

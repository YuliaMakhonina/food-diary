import { bootstrap } from '../bootstrap';

export default async function() {
  const app = await bootstrap();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.app = app;
};

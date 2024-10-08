import 'reflect-metadata';

import { Container } from 'inversify';
import { RestConfig } from './shared/libs/config/index.js';
import { PinoLogger } from './shared/libs/logger/index.js';
import { RestApplication } from './shared/libs/rest/index.js';
import { Component } from './shared/types/index.js';
import { Logger } from './shared/libs/logger/types.js';
import { Config } from './shared/libs/config/types.js';
import { RestSchema } from './shared/libs/config/schema.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();

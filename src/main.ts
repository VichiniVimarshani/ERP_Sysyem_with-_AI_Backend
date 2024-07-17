import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const express = require("express");
import bodyParser from "body-parser";
const cors = require("cors");
import * as process from "process"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.use(cors());
  await app.listen(process.env.PORT,'0.0.0.0');
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const express = require("express");
import bodyParser from "body-parser";
const cors = require("cors");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.use(cors());
  await app.listen(8090);
}
bootstrap();

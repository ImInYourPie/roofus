import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { orm } from "infrastructure";

dotenv.config();

const app: Express = express();

export default app;

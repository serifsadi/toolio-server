import express from "express";

export interface CommonRoutesConfig {
  app: express.Application;
  name: string;
  configureRoutes(): void;
  getName(): string;
}

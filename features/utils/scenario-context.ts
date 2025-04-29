import { setWorldConstructor, World } from '@cucumber/cucumber';

export class ScenarioContext extends World {
  public testData: any;
  public runtimeData: Record<string, any>;

  constructor(options: any) {
    super(options);
    this.testData = {};
    this.runtimeData = {}; // This will store data like order number, session token etc.
  }
}

setWorldConstructor(ScenarioContext);

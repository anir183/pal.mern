import { config as envConfig } from "@dotenvx/dotenvx";
import { validateEnvs } from "./utils/env_vars.js";

// environement variables
envConfig();
validateEnvs(process.env);

console.log("Hello, world");

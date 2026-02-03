import assert from "node:assert";

/** interface that defines expected environment variables */
type EnvVarsKey = keyof EnvVars;
type EnvVarsValue = string | null;
export interface EnvVars {
	NODE_ENV: EnvVarsValue;

	PORT: EnvVarsValue;
	API_ENDPOINT: EnvVarsValue;

	// mongodb[+srv]?://anir183:2006%402286%402886%40arc@localhost:27017/?authSource=admin
	MONGO_HOST: EnvVarsValue;
	MONGO_USERNAME: EnvVarsValue;
	MONGO_PASSWORD: EnvVarsValue;
	MONGO_COLLECTION: EnvVarsValue;
	MONGO_OPTS: EnvVarsValue;
}

// NOTE : null values are expected to be filled from the env file
//        non-null values are optional and have default values
const envVars: EnvVars = {
	NODE_ENV: "development",

	PORT: "8080",
	API_ENDPOINT: "/api",

	MONGO_HOST: "localhost:27017",
	MONGO_USERNAME: null,
	MONGO_PASSWORD: null,
	MONGO_COLLECTION: null,
	MONGO_OPTS: "authSource=admin",
};
let envValidated = false;

/**
 * validates environment variables in the env object
 * ---
 * @param env - the environment object to validate
 */
export const validateEnvs = (env: object) => {
	type UnverifiedVarsKey = keyof typeof env;

	// assumes non-null keys are optional and null keys are expected
	Object.keys(envVars).forEach((key) => {
		if (envVars[key as EnvVarsKey] === null) {
			assert(
				env[key as UnverifiedVarsKey] !== undefined,
				`${key} was not found in env object`
			);
			envVars[key as EnvVarsKey] = env[key as UnverifiedVarsKey];
		} else if (env[key as UnverifiedVarsKey] !== undefined) {
			envVars[key as EnvVarsKey] = env[key as UnverifiedVarsKey];
		}
	});

	envValidated = true;
};

/**
 * get environment variables after validation
 * ---
 *  @returns validated environement variables
 */
export const getEnv = (): EnvVars => {
	assert(envValidated, "environment variables not validated yet");

	return envVars;
};

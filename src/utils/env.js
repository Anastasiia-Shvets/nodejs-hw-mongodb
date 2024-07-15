import dotenv from 'dotenv';

dotenv.config();

const checkEnvFor = (port, defaultPort) => {
    const portFromEnv = process.env[port];

    if (portFromEnv) return portFromEnv;
    if (defaultPort) return defaultPort;

    throw new Error(`Missing: process.env['${port}'].`);
};

export default checkEnvFor;

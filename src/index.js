import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/index.js";
import initMongoCollection from "./db/initMongoCollection.js";
import setupServer from "./server.js";
import { createDirIfNotExists } from "./utils/createDirIfNotExists.js";

const bootstrap = async () => {
    await initMongoCollection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
    setupServer();
};

bootstrap();

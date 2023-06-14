import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://felipe:${encodeURIComponent('@FIBRINO288')}@node-api.vjarhzp.mongodb.net/alura-node`);

const db = mongoose.connection;

export default db;
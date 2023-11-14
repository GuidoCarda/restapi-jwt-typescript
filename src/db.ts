import { createPool } from "mysql2/promise";
import config from "./config/config";

const pool = createPool(config.DB);

export default pool;

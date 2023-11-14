import { PoolOptions, createPool } from "mysql2/promise";
import config from "./config/config";

const access: PoolOptions = config.DB;
const pool = createPool(access);

export default pool;

import { Pool } from 'pg';

const connectionString = 'postgres://oizzpqhl:C-yJ69ZzlVFgtTHwOHc0DFbZ_gqRsogP@kesavan.db.elephantsql.com/oizzpqhl';

const db = new Pool({ connectionString });

export default db;


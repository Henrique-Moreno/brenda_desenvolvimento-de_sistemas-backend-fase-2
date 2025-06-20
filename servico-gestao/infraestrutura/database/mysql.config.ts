import { createPool } from 'mysql2/promise';

export const mysqlConfig = {
  pool: createPool({
    host: 'localhost',
    user: 'root',
    password: 'SUA_SENHA',
    database: 'servico_gestao',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }),
};
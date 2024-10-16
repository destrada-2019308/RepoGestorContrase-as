import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'gestor_usuarios',
    connectionLimit: 50
});

export default pool;
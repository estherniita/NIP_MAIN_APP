const env = process.env;

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    connectionLimit: 10,
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '',
    database: env.DB_NAME || 'national_internship_programme',
    //db password: !w9(ykMKMora
  },
  listPerPage: env.LIST_PER_PAGE || 10,
  secret: 'your secret'
};


module.exports = config;



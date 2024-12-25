import { Knex } from 'knex'

const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: './data.sqlite',
    },
    useNullAsDefault: true,
    migrations: {
        directory: './migrations',
    }
}

export default config;
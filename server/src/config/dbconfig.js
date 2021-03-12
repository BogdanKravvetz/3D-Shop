module.exports =  { 
    port: 8081,
    db: {
        // database: process.env.DB_NAME || '3dshop',
        // user: process.env.DB_USER || 'root',
        // password: process.env.DB_PASS || 'root',
        // options:{
        //     dialect: process.env.DIALECT || 'sqlite',
        //     host: process.env.HOST || 'localhost',
        //     storage: './3dshop.sqlite'
        // }
        database: '3dshop',
        user: 'root',
        password: 'root',
        options:{
            dialect: 'sqlite',
            host: 'localhost',
            storage: './3dshop.sqlite'
        }
    },
    authentication: {
        jwtSecert: process.env.JWT_SECRET || 'secret'
    }
}

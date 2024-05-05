console.log("Hello world");
const sql = require('mssql');

const config = {
    user: 'impulseAdmin',
    password: 'Impulse123',
    server: 'impulse-server.database.windows.net',
    database: 'impulse-database',
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

async function connectToDatabase() {
    try {
        // Make a connection to the database
        connection = await sql.connect(config);
        console.log('Connected to database.');

        // Now you can execute SQL queries or perform other database operations
        // For example:
        const result = await sql.query`SELECT TOP 2 * FROM dbo.Animals`;
        console.dir(result);
        await connection.close();
    } catch (err) {
        //console.error('Error connecting to database:', err);
    }
}

// Call the function to connect to the database
connectToDatabase();
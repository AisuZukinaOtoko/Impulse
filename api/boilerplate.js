const sql = require('mssql');

// Configuration object for your database connection
const config = {
    user: 'impulseAdmin',
    password: 'Impulse123',
    server: 'impulse-server.database.windows.net',
    database: 'impulse-database',
    options: {
        encrypt: true, // Use encryption
        enableArithAbort: true
    }
};

// Function to query the database
async function dbRequest(dbQuery) {
    try {
        // Establish a connection to the database
        let pool = await sql.connect(config);

        // Perform a query
        let result = await pool.request().query(dbQuery);

        // Log the results
        //console.log(result);

        // Close the connection
        sql.close();
        return result;
    } catch (err) {
        console.error('SQL error', err);
        sql.close();
    }
}

module.exports = dbRequest;
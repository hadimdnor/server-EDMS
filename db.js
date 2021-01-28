// Database

const pg = require('pg');

let pool = new pg.Pool({
    database: 'employee_management',
    username: 'hadimdnor'
})

// Making request to the Database
function run_sql(sql,values = [], cb){
    pool.query(sql, values, (err, response) => {
        cb(response)
    })
}


module.exports = run_sql
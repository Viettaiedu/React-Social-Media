import mysql from 'mysql2';
export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Reo.2640441",
    database:"social"
})
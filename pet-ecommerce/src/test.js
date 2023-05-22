const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'senha',
  database: 'nome_do_banco'
});

connection.connect();

const produto = 'nome_do_produto';
let quantidade = 0;

connection.query('SELECT quantidade FROM produtos WHERE nome = ?', [produto], (error, results, fields) => {
  if (error) return error.message
    return error.message
  quantidade = results[0].quantidade;
  console.log(`A quantidade do produto ${produto} é ${quantidade}.`);
  
  connection.end();
});
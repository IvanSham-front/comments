const { Client } = require('pg');
require('dotenv').config();


const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});

const getComments = () => {
  return new Promise(function(resolve, reject) {
    client.query('SELECT * FROM comments_table', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createComment = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, comment, date, id} = body

    client.query('INSERT INTO comments_table (id, name, comment, date) VALUES ($1, $2, $3, $4) RETURNING *', [id, name, comment, date], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new comment has been added added: ${JSON.stringify(results.rows[0])}`)
    })
  })
}

const deleteComment = (merchantId) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(merchantId)

    client.query('DELETE FROM comments_table WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Merchant comment with ID: ${id}`)
    })
  })
}

module.exports = {
  getComments,
  createComment,
  deleteComment,
}
const express = require('express');

const port = process.env.PORT || 8081;
const comments_table_models = require('./comments_table_model')

const app = express();

app.use(express.json())
app.use(
  function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
  }
);


app.get('/', (req, res) => {
  comments_table_models.getComments()
  .then(responce => {
    res.status(200).send(JSON.stringify(responce))
  })
  .catch(error => {
    res.status(500).send(error)
  })
});



app.post('/comments_table', (req, res) => {
  comments_table_models.createComment(req.body)
  .then(responce => {
    res.status(200).send(responce)
  })
  .catch(error => {
    res.status(500).send(error)
  })
})

app.delete('/comments_table/delete/:id', (req, res) => {
  comments_table_models.deleteComment(req.params.id)
  .then(responce => {
    res.status(200).send(responce)
  })
  .catch(error => {
    res.status(500).send(error)
  })

})

app.listen(port, () => {
  console.log(port);
  console.log(process.env.DATABASE_URL);
});

const express = require('express')
const axios = require('axios')
const app = express()
const PORT = 8000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/search', (req, res) => {
  axios.get(`http://omdbapi.com/?s=${req.query.title}&apikey=2f6435d9`)
    .then((omdbResponse) => {
      const { Search: movies } = omdbResponse.data
      res.render('results', { movies })
    })
})

app.get('/movie', (req, res) => {
  axios.get(`http://omdbapi.com/?i=${req.query.id}&apikey=2f6435d9`)
    .then(omdbResponse => {
      res.render('movie', omdbResponse.data)
    })

})

app.get('/about', (req, res) => {
  res.end('about run CMD')
})

app.get('/*', (req, res) => {
  res.send('404 not found')
})






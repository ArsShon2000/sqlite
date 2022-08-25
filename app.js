// import List from './List'

require('dotenv').config()

const express = require('express')
const app = express()
// const articles = [{number: 'a777aa77'}, {number: 'a777aa99'}, {number: 'a777aa11'}]
const Article = require('./db').Article
const bodyParser = require('body-parser')
const read = require('node-readability')

app.set('port', process.env.PORT || 3001)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/articles', (req, res, next) => {
    Article.all((err, articles) =>{
        if (err) return next(err)

        res.format({
            html: () => {
                res.render('articles.ejs', {articles: articles})
            },
            json: () => {
                res.send(articles)
            }
        })
        // res.send(articles)
    })
})

app.post('/articles', (req, res, next) => {
    const url = req.body.url
    read(url, (err, result) => {
        if(err || !result) res.status(500).send('БД не был загружен')
        Article.create(
            {numCar: result.numCar, function: result.function},
            (err, article) => {
                if (err) return next(err)
                res.send('OK')
            }
        )
    })

    // const article = {number: req.body.number}
    // articles.push(article)
    // res.send(article)
})

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id
    Article.find(id, (err) =>{
        if (err) return next(err)
        res.send(articles)
    })
})

app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id
    Article.delete(id, (err) =>{
        if (err) return next(err)
        res.send({message: 'Deleted'})
    })
})

app.listen(app.get('port'), () => {
    console.log(`Наш порт http://127.0.0.1:${app.get('port')}`)
})

module.exports = app

// const App = (props) => {
//     return(
//         <div>
//             <List />
//         </div>
//     )
// }
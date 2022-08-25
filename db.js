// const { keyboard } = require('@testing-library/user-event/dist/keyboard')

const sqlite3 = require('sqlite3').verbose()
const dbName = 'later.sqlite'
const db = new sqlite3.Database(dbName)

db.serialize( () =>{
    const sql = `
        CREATE TABLE IF NOT EXISTS articles
        (id integer primary key, numCar, function TEXT)    
        `
        db.run(sql)
} )


class Article {
    static all(cb){
        db.all('SELECT * FROM articles', cb)
    }
    static find(id, cb) {
        db.get('SELECT * FROM articles id = ?', id, cb) 
    }
    static create(data, cb) {
        const sql = 'INSERT INTO articles(numCar, function) VALUES (?, ?)'
        db.run(sql, data.numCar, data.function, cb)
    }
    static delete(id, cb) {
        if(!id) return cb (new Error('Пж, введите id!'))
        db.run('DELETE FROM articles WHERE id = ?', id, cb)
    }
}

module.exports = db
module.exports.Article = Article
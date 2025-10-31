const path = require('path')
const sqlite3 = require('sqlite3')
let util

const db = {
    sqlite3: new sqlite3.Database(path.join(__dirname, '../database.sqlite3')),
    async run(sql, ...args) {
        return await new Promise((resolve, reject) => {
            db.sqlite3.run(sql, ...args, function(error) {
                if (error) {
                    reject(error)
                    return
                }
                resolve(this)
            })
        })
    },
    async get(sql, ...args) {
        return await new Promise((resolve, reject) => {
            db.sqlite3.get(sql, ...args, (error, row) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(row)
            })
        })
    },
    async all(sql, ...args) {
        return await new Promise((resolve, reject) => {
            db.sqlite3.all(sql, ...args, (error, rows) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(rows)
            })
        })
    },
    async exists(partialSql, ...args) {
        return (await db.get(
            `SELECT EXISTS(SELECT 1 FROM ${partialSql}) as row_exists;`,
            ...args
        ))['row_exists']
    },
    async insert(tableName, object) {
        const entries = Object.entries(object)
        return await db.run(
            `INSERT INTO ${
                tableName
            } (${
                entries.map(([columnName]) => columnName).join(', ')
            }) VALUES (${
                entries.map(() => '?').join(', ')
            });`,
            ...entries.map(([, columnValue]) => columnValue)
        )
    },
    async insertSession(agentId) {
        const id = (await db.insert('session', {
            agent: agentId,
            time: Date.now()
        }))['lastID']
        const key = util.genKey(id)
        await db.run(
            'UPDATE session SET key = ? WHERE rowid = ?;',
            key,
            id
        )
        return key
    },
    or(entries) {
        return [
            entries
                .map(([column]) => `${column} = ?`)
                .join(' OR '),
            entries.map(([, value]) => value)
        ]
    }
}

module.exports = db
util = require('./util')
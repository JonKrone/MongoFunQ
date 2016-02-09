var DB   = require('../db/db')

var Char = module.exports

Char.all = function() {
  return DB('characters').find({}).toArray()
}

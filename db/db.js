var PMONGO = require('promised-mongo')
var DB     = PMONGO('DnD_DB')

module.exports = function(collectionName) {
  return DB.collection(collectionName)
}

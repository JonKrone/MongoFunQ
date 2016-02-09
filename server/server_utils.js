"use strict"
// Here we build the components that we string together to make a query
var ram = require('ramda')


const insert = function(attrs, key, collection) {
  if (key && collection !== null && typeof collection === 'object') {
    // WHAT DO IF OBJ PROPERTY EXISTS?
    collection[key] = attrs
    return collection
  }

  if (!Array.isArray(collection))
    throw new Error("error in insert: collection must be an object or array")

  collection.push(attrs)
  return collection
}

/*
  mapBy ([props], collection)
    maps 'by' with each property over the collection
    same as whitelisting?
*/


/*
  destructive update to an object

  update (prop, value, collection)
    input:   string, *, object
    output:  object
*/
const update = function (prop, value, object) {
  if (object === null && typeof object !== 'object')
    throw new Error('error in update: can not update non-object types.')

  object[prop] = value

  return object
}

/*
  destructive remove key from collection
    if array, splice out
    if object, delete

  remove (key, collection)
    input:  *, object OR [*]
    output: * OR null

*/
const remove = function(key, collection) {
  if (Array.isArray(collection)) {
    const idx = collection.indexOf(key)
    if (idx < 0) return null
    return collection.splice(idx, 1)[0]
  }

  if (collection !== null && typeof collection === 'object') {
    const tmp = collection[key]
    delete collection[key]

    return collection[key] === undefined ? tmp : null
  }

  throw new Error('error in remove: collection must be an object or array')
}



/*
  return property of obj

  by (property, obj)
    input:   string, object
    output:  object

    // ramda
*/
const by = function(property, object) {
  if (Array.isArray(property))
    throw new Error('error in by: can not search for multiple properties with by. Use map(by) instead!')
  if (Array.isArray(object))
    throw new Error('error in by: can not search an array. use map(by) instead!')

  return object[property]
}

/*
  filter: search an object array for a property:value match
  return null or the matching object

  of (predicate, arr)
    input:  function, [object]
    out:    object

    // ramda pickBy implementation
*/
const where = function(test, collection) {
  if (!Array.isArray(collection))
    throw new Error('error in where: passed non-array to where; just check test against property')
  if (typeof test !== 'function')
    throw new Error("error in where: can not evaluate a non-function test; pass identity if that's what you're looking for")

  let result = []
  for (let obj of collection) {
    if ( test(obj) ) result.push(obj)
  }
  return result
}

const first = function(collection) {
  if (!Array.isArray(collection))
    throw new Error('error in first: must pass an array')
  return collection[0]
}

/*
  log input with some tag and pass it along
  useful for testing composed functions.
*/
const trace = function(tag, x) {
  console.log('')
  console.log(tag, '<::>', x)
  return x
}


const utils = module.exports;

utils.by     = ram.curry(by)
utils.where  = ram.curry(where)

utils.insert = ram.curry(insert)
utils.update = ram.curry(update)
utils.remove = ram.curry(remove)

utils.first  = ram.curry(first)
utils.trace  = ram.curry(trace)





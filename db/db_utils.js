"use strict"
// Here we build the components that we string together to make a query

var ram = require('ramda')

var utils = module.exports;

/*
  mapBy ([props], collection)
    maps 'by' with each property over the collection
    same as whitelisting?
*/

const update = function (prop, value, collection) {
  if (collection === null && typeof colelction !== 'object')
    throw new Error('error in update: can not update non-object types.')

  collection[prop] = value

  return collection
}

/*
  return properties of obj in [obj]

  by (property, obj)
    input:   obj
    output:  obj

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

  of (property, value)
    input: [obj]
    out:    obj

    // ramda pickBy implementation
*/
const where = function(test, arr) {
  if (!Array.isArray(arr))
    throw new Error('error in where: passed non-array to where; just check test against property')
  if (typeof test !== 'function')
    throw new Error("error in where: can not evaluate a non-function test; pass identity if that's what you're looking for")

  let result = []
  for (let obj of arr) {
    if ( test(obj) ) result.push(obj)
  }
  return result
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


utils.by     = ram.curry(by)
utils.where  = ram.curry(where)
utils.update = ram.curry(update)
utils.trace  = ram.curry(trace)


var ram = require('ramda')

// Here we build the components that we string together to make a query


var utils = module.exports;

/*
  return properties of obj in [obj]

  by (property, obj)
    input:   obj
    output:  obj

    // ramda
*/
var by = function(property, object) {
  // convert non-array 'property' param to array
  if (Array.isArray(property)) throw new Error('can not search for multiple properties with by. Use map(by) instead!')
  if (Array.isArray(object)) throw new Error('can not search an array. use map(by) instead!')
  // console.log('\nproperty to pluck:', property)
  // console.log('object to pluck from', objects)

  return object[property]
}

/*
  search an object array for a property:value match
  return null or the matching object

  of (property, value)
    input: [obj]
    out:    obj

    // ramda pickBy implementation
*/
var where = function(test, arr) {
  if (!Array.isArray(arr)) throw new Error('passed non-array to where; just check test against property')

  var result = []
  for (var obj of arr) {
    if ( test(obj) ) result.push(obj)
  }

  return result
}


var trace = function(tag, x) {
  console.log('')
  console.log(tag, '<::>', x)
  return x
}


utils.by    = ram.curry(by)
utils.where = ram.curry(where)
utils.trace = ram.curry(trace)


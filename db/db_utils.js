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
var by = function(property, objects) {
  // convert non-array 'property' param to array
  if (Array.isArray(property)) throw new Error('can not search for multiple properties with by. Use map(by) instead')
  // Pass along object if we're not looking for anything
  if (property.length === 0)    return objects

  if (!Array.isArray(objects)) objects = [objects]

  // console.log('\nproperty to pluck:', property)
  // console.log('object to pluck from', objects)

  var result = []
  for (var obj of objects) {
    // console.log('')
    result.push( obj[property] )
  }

  return result;
}

      // c_id:    001,
      // profile: { name: 'Dnin', age: 51, history: 'stringy stringy' },
      // stats:   { hp: 32, prof: 3, level: 6 },
      // items:   [ { _id: 0237, name: 'Gold', value: 1, quant: 89 },
      //            { _id: 0181, name: 'Potion', value: 12, quant: 2 }]



/*
  search an object array for a property:value match
  return null or the matching object

  of (property, value)
    input: [obj]
    out:    obj

    // ramda pickBy implementation
*/

var trace = function(tag, x) {
  console.log('')
  console.log(tag, '<::>', x)
  return x
}


utils.by = ram.curry(by)

utils.trace = ram.curry(trace)

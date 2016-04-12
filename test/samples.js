/**
  A suite of examples used to demo the project
*/

const Dnin = {
  c_id:    1,
  profile: { name: 'Dnin', age: 51, history: 'stringy stringy' },
  stats:   { hp: 32, prof: 3, level: 6 },
  items:   [ { id: 237, name: 'Gold', value: 1, quant: 89 },
             { id: 181, name: 'Potion', value: 12, quant: 2 }]
}
const Dangah = {
  c_id:    2,
  profile: { name: 'Dangah', age: 43, history: 'flingy thingy' },
  stats:   { hp: 72, prof: 4, level: 13 },
  items:   [ { id: 237, name: 'Gold', value: 1, quant: 163 },
             { id: 181, name: 'Potion', value: 12, quant: 3 }]
}
const characters  = [Dnin, Dangah]


const by = function(property, object) { return object[property] }

const where = function(test, collection) {
  let result = []
  for (let obj of collection) {
    if ( test(obj) ) result.push(obj)
  }
  return result
}


const stats  = by('stats')
  stats(Dangah) //=> { hp: 72, prof: 4, level: 13 }

const health = ram.compose(by('hp'), stats)
  health(Dangah) //=> 72

const partyHp = ram.map(health)
  partyHp(characters) //=> 32, 75

notDead     = (character) => health(character) >= 0
aliveOnes   = util.where(notDead, characters)

const nameMatch = ram.curry( (name, character) => charName(character) === name )
const byName    = (name) => where(nameMatch(name))
const findDangah  = ram.compose( first, byName('Dangah'))

const stealItem = ram.curry( (itemId, character) => {
        let removeFrom = ram.compose(remove, itemById(itemId), inventory) (character)
        removeFrom( inventory(character) )
      })

const stealGold = stealItem(237)
ram.map(stealGold) (characters) // take everyone's gold

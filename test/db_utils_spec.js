"use strict"

var expect = require('chai').expect

var DB    = require('../db/db')
var utils = require('../db/db_utils')
var ram   = require('ramda')

describe('DB utility functions', function() {

  var Dnin = {
    c_id:    1,
    profile: { name: 'Dnin', age: 51, history: 'stringy stringy' },
    stats:   { hp: 32, prof: 3, level: 6 },
    items:   [ { _id: 237, name: 'Gold', value: 1, quant: 89 },
               { _id: 181, name: 'Potion', value: 12, quant: 2 }]
  }
  var Dangah = {
    c_id:    2,
    profile: { name: 'Dangah', age: 43, history: 'flingy thingy' },
    stats:   { hp: 72, prof: 4, level: 13 },
    items:   [ { _id: 237, name: 'Gold', value: 1, quant: 163 },
               { _id: 181, name: 'Potion', value: 12, quant: 3 }]
  }
  var characters = [Dnin, Dangah]

  describe('by', function() {
    it ('should pluck properties from objects', function() {
      let charName = utils.by('name', Dnin.profile)

      expect(charName).to.deep.equal('Dnin')
    })

    it ('should pluck properties from an array of objects', function() {
      let charNames = ram.map(utils.by('c_id'))(characters)
      expect(charNames).to.deep.equal( [1, 2] )
    })

    it ('should compose', function() {
      let characterName = ram.compose(utils.by('name'), utils.by('profile'))
      let partyNames = ram.compose(ram.map(characterName))

      let characterHealth = ram.compose(utils.by('hp'), utils.by('stats'))
      let partyHealth = ram.compose(ram.sum, ram.map(characterHealth))

      expect( characterName(Dangah) ).to.deep.equal('Dangah')
      expect( characterName(Dnin) ).to.deep.equal('Dnin')

      expect( partyNames(characters) ).to.deep.equal(['Dnin', 'Dangah'])
      expect( partyHealth(characters) ).to.equal(104)
    })

  })

})

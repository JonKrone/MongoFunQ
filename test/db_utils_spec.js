"use strict"

let expect = require('chai').expect

let DB     = require('../db/db')
let util   = require('../db/db_utils')
let ram    = require('ramda')

describe('DB utility functions', function() {

  const Dnin = {
    c_id:    1,
    profile: { name: 'Dnin', age: 51, history: 'stringy stringy' },
    stats:   { hp: 32, prof: 3, level: 6 },
    items:   [ { _id: 237, name: 'Gold', value: 1, quant: 89 },
               { _id: 181, name: 'Potion', value: 12, quant: 2 }]
  }
  const Dangah = {
    c_id:    2,
    profile: { name: 'Dangah', age: 43, history: 'flingy thingy' },
    stats:   { hp: 72, prof: 4, level: 13 },
    items:   [ { _id: 237, name: 'Gold', value: 1, quant: 163 },
               { _id: 181, name: 'Potion', value: 12, quant: 3 }]
  }
  const characters  = [Dnin, Dangah]

  const stats       = util.by('stats')
  const charName    = ram.compose( util.by('name'), util.by('profile') )
  const charHP      = ram.compose( util.by('hp'), util.by('stats') )

  const partyNames  = ram.compose(ram.map(charName))
  const partyHealth = ram.compose(ram.sum, ram.map(charHP))

  const notDead     = (character) => charHP(character) >= 0
  const aliveOnes   = util.where(notDead, characters)

  const isDnin      = (character) => charName(character) === 'Dnin'
  const findDnin    = util.where(isDnin)

  describe('by', function() {
    /*
      where and by allow us to compose searches and filters and filtered searches and searched filters

      let name = ram.compose(util.by('name'), util.by('profile'))
      let byName = (targetName, char) => name(char) === targetName

      let findDangah = util.where(byName('Dangah'))
      let findDnin   = util.where(byName('Dnin'))

      let Dangah = findDangah(characters) //=> We can alway find Dangah with this method
    */

    it ('should pluck properties from objects', function() {
      expect(charName(Dnin)).to.deep.equal('Dnin')
    })

    it ('should pluck properties from an array of objects', function() {
      expect(partyNames(characters)).to.deep.equal( ['Dnin', 'Dangah'] )
    })

    it ('should compose', function() {
      expect( charName(Dangah) ).to.deep.equal('Dangah')
      expect( charName(Dnin) ).to.deep.equal('Dnin')

      expect( partyNames(characters) ).to.deep.equal(['Dnin', 'Dangah'])
      expect( partyHealth(characters) ).to.equal(104)
    })
  })

  describe('where', function() {
    it ('should return a list of matched objects', function() {
      expect(findDnin(characters)).to.deep.equal([Dnin])
    })

    it ('should include all truthy test results', function() {
      expect(aliveOnes).to.deep.equal( [Dnin, Dangah] )
    })

    it ('should compose', function() {
      expect(partyHealth(aliveOnes)).to.equal(104)
    })

    // it ('should map multiple args', function() {
    //   const cIdProfile = ram.map( util.by('c_id'), util.by('profile') )

    //   console.log('cIdProfile dnin:', cIdProfile(Dnin))
    // })

  })

  describe('update', function() {
    it ('should update the value of an object', function() {
      let ricky = { name: 'Rickshaw' }
      util.update('name', 'Randy', ricky)

      expect(ricky).to.deep.equal({ name: 'Randy' })
      try {
        util.update('name', 'Rosie', "Sanders")
      } catch (e) { expect(e).to.be.ok }
    })

    it.only('should work well with other utilities', function() {
      let charDnin = findDnin(characters)[0]
      console.log('dnin:', charDnin)

      let dealDmg = ram.compose( util.update('hp', charHP(charDnin) - 6), stats)
      dealDmg(charDnin)

      expect(charHP(charDnin)).to.equal(32 - 6)
    })


  })

})








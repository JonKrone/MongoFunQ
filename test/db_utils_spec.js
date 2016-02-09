"use strict"

let expect = require('chai').expect

let DB     = require('../db/db')
let util   = require('../server/server_utils')
let ram    = require('ramda')

describe('DB utility functions', function() {

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

  const all         = () => true
  const stats       = util.by('stats')
  const profile     = util.by('profile')

  const charName    = ram.compose( util.by('name'), profile )
  const charHP      = ram.compose( util.by('hp'), stats )

  const nameMatch   = ram.curry( (name, character) => charName(character) === name )
  const byName      = (name) => util.where(nameMatch(name))

  const partyNames  = ram.map(charName)
  const partyHealth = ram.compose(ram.sum, ram.map(charHP))

  const notDead     = (character) => charHP(character) >= 0
  const aliveOnes   = util.where(notDead, characters)

  const findDnin    = byName('Dnin')

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
    //   const cIdProfile = ram.map( util.by('cid'), util.by('profile') )

    //   console.log('cIdProfile dnin:', cIdProfile(Dnin))
    // })

  })

  describe('update', function() {
    it ('should update the value of an object', function() {
      const ricky = { name: 'Rickshaw' }
      util.update('name', 'Randy', ricky)

      expect(ricky).to.deep.equal({ name: 'Randy' })
      try {
        util.update('name', 'Rosie', "Sanders")
      } catch (e) { expect(e).to.be.ok }
    })

    it('should work well with other utilities', function() {
      const charDnin = findDnin(characters)[0]

      const dealDmg = ram.compose( util.update('hp', charHP(charDnin) - 6), stats)
      dealDmg(charDnin)

      expect(charHP(charDnin)).to.equal(32 - 6)
    })

    it.only ('should compose well pt. 2', function() {
      const isItem     = ram.curry( (targetId, item) => item.id === targetId )

      const party      = util.where(all)(characters)
      const inventory  = ram.map(util.by('items'))(party)

      const gold       = util.where(isItem(237))
      const foundGold  = ram.map(ram.compose( util.first, gold )) (inventory)

      expect(foundGold[0]).to.equal(Dnin.items[0]) // still working with the _same_ object

      // const goldCounts = ram.compose(ram.map((gold)ram.map(util.by('quant')) (foundGold)

        (update('quant'), map(value + newValue)) // leaves us with an update ready to accepts its collections


      // ram.map(util.update('quant', newValue, ))

      console.log('findGold:', foundGold)

    })

    // it ('should compose', function() {
    //   // let givePartyGold = update, charactersInParty
    // })
  })

  describe('insert', function() {
    const Darinth = {
      c_id: 3,
      profile: { name: 'Darinth', age: 31, history: 'ting tang' },
      stats:   { hp: 47, prof: 3, level: 6 },
      items:   [ { id: 237, name: 'Gold', value: 1, quant: 89 },
                 { id: 113, name: 'carrots', value: 0.25, quant: 37}]
    }
    const father = "bilo"

    it ('should insert into an array', function() {
      util.insert(Darinth, null, characters)
      expect(characters.length).to.equal(3)
    })

    it ('should insert a property into an object', function() {
      util.insert(father, 'father', Darinth.profile)

      let dad = ram.compose(util.by('father'), profile, util.first, byName('Darinth'))
          dad = dad(characters)

      expect(dad).to.equal('bilo')
    })


  })

})








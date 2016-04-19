import { expect } from 'chai'
import { List, Map } from 'immutable'
import { setEntries, next, vote } from '../src/core'

describe( 'Application logic', () => {

 describe( 'setEntries', () => {
  it( 'adds the entries to the state', () => {
   const state = Map()
   const entries = List.of('Friday', 'Next Friday')
   const nextState = setEntries( state, entries )
   expect(nextState).to.equal( Map({ entries: List.of( 'Friday', 'Next Friday' ) }) )
  })

  it( 'converts to immutable', () => {
   const state = Map()
   const entries = ['Friday', 'Next Friday']
   const nextState = setEntries( state, entries )
   expect(nextState).to.equal( Map({ entries: List.of( 'Friday', 'Next Friday' ) }) )
  })
 })

 describe( 'next', () => {

   it('takes the next two entries under vote', () => {
     const state = Map({ entries: List.of( 'Friday', 'Next Friday', 'Friday After Next' ) })
     const nextState = next(state)
     expect(nextState).to.equal(
      Map({
       vote: Map({ pair: List.of( 'Friday', 'Next Friday' ) }),
       entries: List.of('Friday After Next')
     }))
   })

   it('puts winner of current vote back into entries', () => {
    const state = Map({
     vote: Map({ pair: List.of( 'Friday', 'Next Friday' ), tally: Map({ 'Friday': 4, 'Next Friday': 2}) }),
     entries: List.of('Friday After Next', 'Rush Hour', 'Rush Hour 2')
    })
    const nextState = next(state)
    expect(nextState).to.equal( Map({
     vote: Map({ pair: List.of( 'Friday After Next', 'Rush Hour' ) }),
     entries: List.of( 'Rush Hour 2', 'Friday' )
    }))
   })

   it('puts both from tied vote back to entries', () => {
    const state = Map({
     vote: Map({ pair: List.of( 'Friday', 'Next Friday' ), tally: Map({ 'Friday': 3, 'Next Friday': 3 }) }),
     entries: List.of('Friday After Next', 'Rush Hour', 'Rush Hour 2')
    })
    const nextState = next(state)
    expect(nextState).to.equal( Map({
     vote: Map({ pair: List.of( 'Friday After Next', 'Rush Hour' ) }),
     entries: List.of( 'Rush Hour 2', 'Friday', 'Next Friday'  )
    }))
   })

   it( 'marks a winner when just one entry is left', () => {
    const state = Map({
     vote: Map({ pair: List.of( 'Friday', 'Next Friday'), tally: Map({ 'Friday': 4, 'Next Friday': 2 }) }),
     entries: List()
    })
    const nextState = next(state)
    expect(nextState).to.equal( Map({
     winner: 'Friday'
    }))
   })
 })

describe( 'vote', () => {

 it( 'creates a tally for the voted entry', () => {
  const state = Map({
   vote: Map({ pair: List.of( 'Friday', 'Next Friday')} ),
   entries: List()
  })
  const nextState = vote( state, 'Friday')
  expect(nextState).to.equal( Map({
   vote: Map({ pair: List.of( 'Friday', 'Next Friday' ), tally: Map({ 'Friday': 1 }) }),
   entries: List()
  }))
 })

 it( 'adds to existing tally for the voted tally', () => {
  const state = Map({
   vote: Map({ pair: List.of( 'Friday', 'Next Friday' ), tally: Map({ 'Friday': 3, 'Next Friday': 2 }) }),
   entries: List()
  })
  const nextState = vote( state, 'Friday' )
  expect(nextState).to.equal( Map({
   vote: Map({ pair: List.of( 'Friday', 'Next Friday' ), tally: Map({ 'Friday': 4, 'Next Friday': 2}) }),
   entries: List()
  }))
 })
})

})

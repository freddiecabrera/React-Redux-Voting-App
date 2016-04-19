import { Map, fromJS } from 'immutable'
import { expect } from 'chai'
import reducer from '../src/reducer.js'

describe( 'reducer', () => {

 it('has an initialState', () => {
  const action = { type: 'SET_ENTRIES', entries: ['Friday']}
  const nextState = reducer( undefined, action )
  expect(nextState).to.equal( fromJS({ entries: ['Friday'] }) )
 })

 it('handles SET_ENTRIES', () => {
  const initialState = Map()
  const action = { type: 'SET_ENTRIES', entries: ['Friday'] }
  const nextState = reducer( initialState, action )
  expect(nextState).to.equal( fromJS({
   entries: ['Friday']
  }))
 })

 it('handles NEXT', () => {
  const initialState = fromJS({ entries: ['Friday', 'Next Friday'] })
  const action = { type: 'NEXT' }
  const nextState = reducer( initialState, action )
  expect(nextState).to.equal( fromJS({
   vote: { pair: ['Friday', 'Next Friday'] },
   entries: []
  }))
 })

 it('handles VOTE', () => {
  const initialState = fromJS({
   vote: { pair: ['Friday', 'Next Friday'] },
   entries: []
  })
  const action = { type: 'VOTE', entry: 'Friday'}
  const nextState = reducer( initialState, action )
  expect(nextState).to.equal( fromJS({
   vote: {
    pair: ['Friday', 'Next Friday'],
    tally: {'Friday': 1}
   },
   entries: []
  }))
 })

 it('can be used with reduce', () => {
   const actions = [
     {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
     {type: 'NEXT'},
     {type: 'VOTE', entry: 'Trainspotting'},
     {type: 'VOTE', entry: '28 Days Later'},
     {type: 'VOTE', entry: 'Trainspotting'},
     {type: 'NEXT'}
   ];
   const finalState = actions.reduce(reducer, Map());

   expect(finalState).to.equal(fromJS({
     winner: 'Trainspotting'
   }));
 }); 

})

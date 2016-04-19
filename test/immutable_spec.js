import { expect } from 'chai'
import { List, Map } from 'immutable'

describe( 'immutabilaty', () => {

 describe( 'A number', () => {
  const increment = currentState => currentState + 1
  it( 'is immutable', () => {
   const state = 42
   const nextState = increment(state)
   expect(nextState).to.equal(43)
   expect(state).to.equal(42)
  })
 })

 describe( 'a list', () => {
  const addMovie = (currentState, movie) => currentState.push(movie)
  it( 'is a immutable', () => {
   const state = List.of( 'Ferris Bullers Day Off', 'The Breakfast Club' )
   const nextState = addMovie(state, 'The Wolf of Wall Street')
   expect(nextState).to.equal( List.of( 'Ferris Bullers Day Off', 'The Breakfast Club', 'The Wolf of Wall Street' ) )
   expect(state).to.equal( List.of( 'Ferris Bullers Day Off', 'The Breakfast Club' ))
  })
 })

 describe( 'a tree', () => {
  const addMovie = ( currentState, movie ) => currentState.update( 'movies', movies => movies.push( movie ))
  it( 'is immutable', () => {
   const state = Map({ movies: List.of( 'Ferris Bullers Day Off', 'The Breakfast Club' ) })
   const nextState = addMovie( state, 'The Wolf of Wall Street' )
   expect(nextState).to.equal( Map({ movies: List.of( 'Ferris Bullers Day Off', 'The Breakfast Club', 'The Wolf of Wall Street' ) }))
   expect(state).to.equal( Map({ movies: List.of( 'Ferris Bullers Day Off', 'The Breakfast Club' ) }))
  })
 })

})

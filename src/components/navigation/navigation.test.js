import renderer from 'react-test-renderer';
import Navigation from './navigation';
import React from 'react'
import userContext from '../../../context/userContext'
import {BrowserRouter as Router} from 'react-router-dom'

describe('test Navigation component', () => {
  it('Should render logged in user Navigation', () => {
    let loggedInNavigation = renderer.create(
        <Router>
            <userContext.Provider value={{isLogged: true, user: {username: 'dani', id: '123'}}}>
                <Navigation/>
            </userContext.Provider>
        </Router>
    ).toJSON()
    expect(loggedInNavigation).toMatchSnapshot()
    expect(loggedInNavigation.type).toBe('nav')
    expect(loggedInNavigation.children[0].type).toBe('div')
    expect(loggedInNavigation.children[1].type).toBe('div')
    expect(loggedInNavigation.children[2].type).toBe('div')
     expect(loggedInNavigation.children[2].children[0].type).toBe('a')
     expect(loggedInNavigation.children[2].children[0].children[0]).toBe('Profile')
  })
  it('Should render guest user navigation', () => {
    let guestNavigation = renderer.create(
        <Router>
            <userContext.Provider value={{isLogged: false, user: null}}>
                <Navigation/>
            </userContext.Provider>
        </Router>
    ).toJSON()
    expect(guestNavigation).toMatchSnapshot()
    expect(guestNavigation.type).toBe('nav')
    expect(guestNavigation.children[0].type).toBe('div')
    expect(guestNavigation.children[1].type).toBe('div')
    expect(guestNavigation.children[2].type).toBe('div')
    expect(guestNavigation.children[2].children[0].type).toBe('a')
    expect(guestNavigation.children[2].children[0].children[0]).toBe('Sign in')
    expect(guestNavigation.children[2].children[1].children[0]).toBe('Register')
  })
})
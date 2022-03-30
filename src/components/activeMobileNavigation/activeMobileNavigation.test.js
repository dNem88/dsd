import React from 'react'
import renderer from 'react-test-renderer'
import ActiveMobileNavigation from './ActiveMobileNavigation'
import {
    MemoryRouter
} from 'react-router-dom'


const mockLogged = {
    click: () => {
        return 'mock'
    },
    isLogged: true
}
const mockGuest = {
     click: () => {
        return 'mock'
    },
    isLogged: false
}
describe('Testing MobileNavigation in Active State', () => {
    it('Render Link User is NOT Logged', () => {
        let snapshot = renderer.create(
            <MemoryRouter>
                <ActiveMobileNavigation {...mockGuest}/>
            </MemoryRouter>
        ).toJSON()
        expect(snapshot).toMatchSnapshot()
        expect(snapshot.type).toBe('div')
        expect(snapshot.props.className).toBe('links-container')
        expect(snapshot.children.length).toBe(9)
        expect(snapshot.children[7].type).toBe('a')
        expect(snapshot.children[7].props.href).toBe('/auth/login')
        expect(snapshot.children[7].children[0]).toBe('Sign in')
        expect(snapshot.children[8].type).toBe('a')
        expect(snapshot.children[8].props.href).toBe('/auth/register')
        expect(snapshot.children[8].children[0]).toBe('Register')
    })
     it('Render Link User is Logged In', () => {
        let snapshot = renderer.create(
            <MemoryRouter>
                <ActiveMobileNavigation {...mockLogged}/>
            </MemoryRouter>
        ).toJSON()
        expect(snapshot).toMatchSnapshot()
        expect(snapshot.type).toBe('div')
        expect(snapshot.props.className).toBe('links-container')
        expect(snapshot.children.length).toBe(8)
         expect(snapshot.children[7].type).toBe('a')
         expect(snapshot.children[7].props.href).toBe('/profile')
         expect(snapshot.children[7].children[0]).toBe('Profile')
    })
})
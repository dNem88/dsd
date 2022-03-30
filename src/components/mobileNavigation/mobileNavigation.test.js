import React from 'react'
import renderer from 'react-test-renderer'
import MobileNavigation from "./MobileNavigation";
import {
    MemoryRouter
} from 'react-router-dom'
import userContext from '../../../context/userContext'

jest.mock('../../../assets/images/logos/logo.svg', () => 'logo')
jest.mock('../../../assets/images/navigation/menu.svg',  () => 'menu')
jest.mock('../../../assets/images/navigation/profile.svg', () => 'profile')
jest.mock('../../../assets/images/navigation/xicon.svg', () => 'xicon')
jest.mock('../activeMobileNavigation/ActiveMobileNavigation', () => () => 'ActiveMobile')
const mockContextGuest = {
    isLogged: false,
    user: null
}
const mockContextUser = {
    isLogged: true,
    user: 'Daniel'
}
describe('Testing MobileNavigation', () => {
    it('Render Guest Navigation', () => {
        let snapshot = renderer.create(
            <MemoryRouter>
                <userContext.Provider value={mockContextGuest}>
                    <MobileNavigation/>
                </userContext.Provider>
            </MemoryRouter>
        ).toJSON()
        expect(snapshot).toMatchSnapshot()
        expect(snapshot.type).toBe('nav')
        expect(snapshot.children.length).toBe(3)
        expect(snapshot.children[0].type).toBe('div')
        expect(snapshot.children[0].children[0].props.src).toBe('menu')
        expect(snapshot.children[1].type).toBe('div')
        expect(snapshot.children[1].children[0].type).toBe('img')
        expect(snapshot.children[1].children[0].props.src).toBe('logo')
        expect(snapshot.children[2].type).toBe('div')
        expect(snapshot.children[2].children[0]).toBeFalsy()
    })
     it('Render User Navigation', () => {
        let snapshot = renderer.create(
            <MemoryRouter>
                <userContext.Provider value={mockContextUser}>
                    <MobileNavigation/>
                </userContext.Provider>
            </MemoryRouter>
        ).toJSON()
        expect(snapshot).toMatchSnapshot()
         expect(snapshot.children[0].type).toBe('div')
         expect(snapshot.children[0].children[0].props.src).toBe('menu')
         expect(snapshot.children[1].type).toBe('div')
         expect(snapshot.children[1].children[0].type).toBe('img')
         expect(snapshot.children[1].children[0].props.src).toBe('logo')
         expect(snapshot.children[2].type).toBe('div')
         expect(snapshot.children[2].children[0].type).toBe('a')
         expect(snapshot.children[2].children[0].props.href).toBe('/profile')
         expect(snapshot.children[2].children[0].children[0].props.src).toBe('profile')
    })
})
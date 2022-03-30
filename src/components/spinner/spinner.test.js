import React from 'react'
import renderer from 'react-test-renderer'
import {MemoryRouter} from 'react-router-dom'
import Spinner from './Spinner'

describe('Test Spinner' , () => {
    it('Should render properly', () => {
        let spinner = renderer.create(
            <MemoryRouter>
                <Spinner/>
            </MemoryRouter>
        ).toJSON()
        expect(spinner).toMatchSnapshot()
        expect(spinner.props.className).toBe("lds-ring")
        expect(spinner.children.length).toBe(4)
        expect(spinner.type).toBe('div')
        expect(spinner.children[0].type).toBe('div')
        expect(spinner.children[1].type).toBe('div')
        expect(spinner.children[2].type).toBe('div')
        expect(spinner.children[3].type).toBe('div')
    })
})
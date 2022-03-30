import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import renderer from 'react-test-renderer'
import ErrorComp from './ErrorComp'

describe('Test Error Comp', () => {
    it('Render Error Component properly', () => {
        let errorComp = renderer.create(
            <MemoryRouter>
                <ErrorComp errorMessage={'test-error-message'}/>
            </MemoryRouter>
        ).toJSON()
        expect(errorComp).toMatchSnapshot()
        expect(errorComp.type).toBe('div')
        expect(errorComp.props.className).toBe('main')
        expect(errorComp.children.length).toBe(2)
        expect(errorComp.children[0].type).toBe('p')
        expect(errorComp.children[0].props.className).toBe('error-p')
        expect(errorComp.children[0].children[0]).toBe('ERROR')
        expect(errorComp.children[1].type).toBe('h3')
        expect(errorComp.children[1].props.className).toBe('error-message')
        expect(errorComp.children[1].children[0]).toBe('test-error-message')
    })
})
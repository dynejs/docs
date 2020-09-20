import chakram = require('chakram')
import assert = require('assert')
import fs = require('fs')
import { app, container } from '@dynejs/core'
import { DocService, DocsModule } from '../src'

const testDir = process.cwd() + '/test'

let service: DocService = null

describe('Docs', () => {
    before(() => {
        app([
            DocsModule
        ], testDir).start()

        service = container().resolve(DocService)
    })

    it('should build navigation', function () {
        const contents = service.getNav()

        const item = contents[0]
        const child = contents[0].children[0]
        const subChild = child.children[0]

        assert(item.title === 'First')
        assert(item.path === null)
        assert(item.children.length === 2)

        assert(child.title === 'Child')
        assert(child.path === null)
        assert(child.children.length === 2)

        assert(subChild.title === 'A letter')
        assert(subChild.path === '/documentation/a')
        assert(subChild.children.length === 0)
    })

    it('should read a doc', async () => {
        const res = await chakram.get('http://localhost:3000/documentation/start')
        assert(res.body.indexOf('<h1 id="start">Start</h1>') > -1)
    })

    it('should get first doc from nav', async () => {
        const res = await chakram.get('http://localhost:3000/documentation')
        assert(res.body.indexOf('<h1 id="start">Start</h1>') > -1)
    })
})

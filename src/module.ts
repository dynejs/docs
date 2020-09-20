import { Config, Module, Router, Views } from '@dynejs/core'
import { DocService } from './doc.service'
import { DocsController } from './docs.controller'
import { docMenu } from './helpers/doc-menu'

export class DocsModule extends Module {
    register() {
        this.container.registerMany([
            DocService,
            DocsController
        ])

        const rootPath = this.container.resolve(Config).get('docs.rootPath', '/docs')
        this.container.resolve(Router).get(rootPath, 'DocsController@index')
        this.container.resolve(Router).get(rootPath + '/:name', 'DocsController@index')

        this.container.resolve(Views).registerHelper('docs', docMenu)
    }
}

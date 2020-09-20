import { Injectable, Request, Response } from '@dynejs/core'
import { Config } from '@dynejs/core/dist'
import { DocService } from './doc.service'
import { NextFunction } from 'express'

@Injectable()
export class DocsController {

    private config: Config
    private docService: DocService

    constructor(config: Config, docService: DocService) {
        this.config = config
        this.docService = docService
    }

    index(req: Request, res: Response, next: NextFunction) {
        const doc = this.docService.getDoc(req.params.name)
        const nav = this.docService.getNav()

        if (!doc) {
            return next()
        }

        if (req.isJson) {
            return res.send(doc)
        }

        res.renderPage('doc', {
            docNav: nav,
            doc
        })
    }
}

import { Config, Injectable } from '@dynejs/core'
import marked = require('marked')
import fs = require('fs')
import path = require('path')

@Injectable()
export class DocService {

    private config: Config

    private readonly root: string

    private readonly rootPath: string

    constructor(config: Config) {
        this.config = config
        this.root = this.config.get('docs.root', null)
        this.rootPath = this.config.get('docs.rootPath', '/documentation')
    }

    /**
     * Build a nested tree for navigation
     */
    getNav() {
        const descriptor = path.join(this.root, 'docs.json')

        if (!fs.existsSync(descriptor)) {
            return null
        }

        const nav = require(descriptor)

        const getPath = (item) => {
            if (typeof item === 'object') {
                return null
            }

            return `${this.rootPath}/${(item || '').replace('.md', '')}`
        }

        const children = (item) => {
            let out = []

            if (typeof item !== 'object') {
                return out
            }

            Object.keys(item).map(key => {
                out.push({
                    title: key,
                    path: getPath(item[key]),
                    children: children(item[key])
                })
            })
            return out
        }

        return children(nav)
    }

    /**
     * Loads markdown file and parsing it
     *
     * @param route
     */
    getDoc(route: string) {
        if (!route) {
            route = this.config.get('docs.default')
        }

        const filePath = path.join(this.root, path.basename(route) + '.md')

        if (!fs.existsSync(filePath)) {
            return null
        }

        const markDown = fs.readFileSync(filePath, 'utf-8')

        return marked(markDown)
    }
}

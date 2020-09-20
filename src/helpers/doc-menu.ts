export function docMenu({ hbs }) {
    return (docs: any[], options) => {

        if (!docs || !Array.isArray(docs)) {
            return
        }

        const children = function (input: any[], level = 0) {
            if (!Array.isArray(input)) {
                return ''
            }

            let out = `<ul class="doc-menu doc-menu-l${level}">`
            input.map((item) => {
                out += `<li>
                            <a href="${item.path ? item.path : '#'}">${item.title}</a>
                            ${children(item.children, level + 1)}
                        </li>`
            })
            out += '</ul>'
            return out
        }

        return new hbs.SafeString(children(docs))
    }
}

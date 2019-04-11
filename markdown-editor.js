import Remarkable from 'remarkable'

class MarkdownEditor extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.output.innerHTML = this.getRawMarkup()
    }

    getRawMarkup() {
        const md = new Remarkable()
        return md.render(this.input.value)
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <div class="MarkdownEditor">
                <h3>Input</h3>
                <label for="markdown-content">
                    Enter some markdown
                </label>
                <textarea id="markdown-content"></textarea>
                <h3>Output</h3>
                <div class="content"/>
            </div>`
        this.input = this.shadowRoot.querySelector('#markdown-content')
        this.output = this.shadowRoot.querySelector('.content')
        this.input.addEventListener('input', this.handleChange)
    }
}

customElements.define('markdown-editor', MarkdownEditor)

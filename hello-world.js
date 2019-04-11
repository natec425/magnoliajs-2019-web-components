class HelloWorld extends HTMLElement {
    static get observedAttributes() {
        return ['name']
    }

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <div>
            Hello ${this.getAttribute('name')}
        </div>`
    }

    attributeChangedCallback() {
        this.shadowRoot.innerHTML =
            `<div>Hello ${this.getAttribute('name')}</div>`
    }
}

customElements.define('hello-world', HelloWorld)

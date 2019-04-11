class Timer extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.seconds = 0
    }

    connectedCallback() {
        this.interval = setInterval(() => this.tick(), 1000)
        this.shadowRoot.innerHTML = `
        <div>
            Seconds : ${this.seconds}
        </div>`
    }

    disconnectedCallback() {
        clearInterval(this.interval)
    }

    tick() {
        this.seconds += 1
        this.shadowRoot.innerHTML = `
        <div>
            Seconds : ${this.seconds}
        </div>`
    }
}

customElements.define('my-timer', Timer)
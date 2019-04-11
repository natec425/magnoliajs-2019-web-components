class TodoApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <div>
                <h3>TODO</h3>
                <ul is="todo-list"></ul>
                <form>
                    <label for="text">
                        What needs to be done?
                    </label>
                    <input name="text"/>
                    <button>
                        Add #<span id="list-length">1</span>
                    </button>
                </form>
            </div>
        `
        this.todoList = this.shadowRoot.querySelector('[is=todo-list]')
        this.todoForm = this.shadowRoot.querySelector('form')
        this.listLength = this.shadowRoot.querySelector('#list-length')
        this.todoForm.addEventListener('submit', this.handleSubmit)
    }

    handleSubmit(e) {
        e.preventDefault();
        const newItem = {
            text: this.todoForm.text.value,
            id: Date.now()
        }
        this.todoForm.reset()
        this.todoList.addTodo(newItem)
        this.listLength.textContent = this.todoList.length + 1
    }
}

class TodoList extends HTMLUListElement {
    constructor() {
        super()
        this.items = []
    }

    addTodo(item) {
        this.items.push(item)
        this.insertAdjacentHTML('beforeend',
            `<li>${item.text}</li>`)
    }

    get length() {
        return this.items.length
    }
}

customElements.define('todo-list', TodoList, { extends: 'ul' })
customElements.define('todo-app', TodoApp)
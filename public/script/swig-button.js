class SwigButton extends HTMLElement {
    #didRender = false
    connectedCallback() {
        setTimeout(() => {
            google.accounts.id.renderButton(this, {})
        }, 1000)
    }
}

customElements.define('swig-button', SwigButton)
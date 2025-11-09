import $ from '/script/$.js'

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

class HoursInput {
    $
    $children = {
        in: null,
        out: null,
        daySelect: this.#renderDaySelect(),
        openTime: $.create('input').attr('type', 'time'),
        closingTime: $.create('input').attr('type', 'time')
    }
    #slots = []
    #isOpen = false
    constructor($this) {
        this.$ = $this
    }
    render() {
        this.$.add(
            this.$children.out = $.div('hours-input-out'),
            this.$children.in = $.div('hours-input-in')
        )
        this.#renderOut()
        this.#renderIn()
    }
    #renderOut() {
        const $listItems = DAYS_OF_WEEK.map((dayName, dayIndex) => {
            const slots = this.#slots.filter(slot => slot.day === dayIndex)
            if (slots.length <= 0)
                return []
            return [
                `${dayName}:`,
                $.br(),
                $.create('ul').add(slots.map(slot => $
                    .create('li')
                    .add(
                        `${
                            this.#renderTime(slot.openTime)
                        } - ${
                            this.#renderTime(slot.closingTime)
                        }`,
                        $.create('button').class('link light center-flex')
                            .text('X')
                            .on('click', () => {
                                this.#slots = this.#slots.filter(it => it !== slot)
                                this.#renderOut()
                            })
                    )
                ))
            ]
        }).flat(Infinity)
        if ($listItems.length <= 0)
            $listItems.push('None')
        this.$children.out.clean().add(...$listItems)
        this.$children.out.node.scrollIntoView({behavior: 'smooth'})
    }
    #renderIn() {
        this.$children.in.clean()
        if (!this.#isOpen) {
            this.$children.in.noClass('active').add(
                $.create('button')
                    .class('link light')
                    .text('Add hours')
                    .on('click', () => {
                        this.#isOpen = true
                        this.#renderIn()
                    })
            )
            this.$children.in.node.scrollIntoView({behavior: 'smooth'})
            return;
        }
        this.$children.in.class('active').add(
            $.div('hours-input-header').add(
                $.div('hours-input-title').text('Add Hours'),
                $.create('button').class('link center-flex light').text('X').on('click', () => {
                    this.#isOpen = false
                    this.#renderIn()
                })
            ),
            $.br(),
            this.#renderField('Day of week:', this.$children.daySelect),
            this.#renderField('Open time:', this.$children.openTime),
            this.#renderField('Closing time:', this.$children.closingTime),
            $.create('button')
                .class('link light')
                .text('Add hours')
                .on('click', () => {
                    const openTime = this.$children.openTime.value
                    const closingTime = this.$children.closingTime.value
                    const day = DAYS_OF_WEEK.indexOf(this.$children.daySelect.value)
                    if (!openTime || !closingTime)
                        return;
                    if (this.#slots.some(slot => (
                        slot.day === day &&
                        slot.openTime === openTime &&
                        slot.closingTime === closingTime
                    ))) return;
                    this.#onClickAdd(day, openTime, closingTime)
                }
            )
        )
        this.$children.in.node.scrollIntoView({behavior: 'smooth'})
    }
    #onClickAdd(day, openTime, closingTime) {
        this.#slots.push({day, openTime, closingTime})
        this.#renderOut()
    }
    #renderField(label, children) {
        return [
            $.create('label').add(
                label,
                $.br(),
                children
            ),
            $.br(),
            $.br()
        ]
    }
    #renderDaySelect() {
        return $.create('select').class('blanco').add(
            DAYS_OF_WEEK.map(day =>
                $.create('option').attr('value', day).text(day)
            )
        )
    }
    #renderTime(time) {
        const parts = time.split(':')
        let hour = parseInt(parts[0])
        const minute = parseInt(parts[1])
        const period = hour < 12 ? 'am' : 'pm'
        hour = hour % 12
        if (hour === 0)
            hour = 12
        let result = String(hour)
        if (minute > 0)
            result += ':' + String(minute)
        result += period
        return result
    }
}

customElements.define('hours-input', class extends HTMLElement {
    #delegate
    #hasRendered = false
    constructor() {
        super()
        this.#delegate = new HoursInput(new $(this))
    }
    connectedCallback() {
        if (!this.#hasRendered) {
            this.#delegate.render()
            this.#hasRendered = true
        }
    }
})
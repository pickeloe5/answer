import $ from '/script/$.js'
import BaseModal from '/script/modals/base.js'
import '/script/hours-input.js'

export default class RegisterNodeModal extends BaseModal {
    $children = {
        name: null,
        location: null,
        role: null,
        goods: {
            shelfStable: null,
            canned: null
        },
        hours: null
    }
    #locationGoogle = null
    #locationValue = null
    #submit() {
        const data = {
            name: this.$children.name.value,
            location: this.#locationValue,
            role: this.$children.role.value,
            goods: {
                shelfStable: this.$children.goods.shelfStable.checked,
                canned: this.$children.goods.canned.checked
            },
            hours: this.$children.hours.value
        }
        console.log(data)
    }
    getColor() {
        return 'green'
    }
    renderTitle() {
        return 'Register Node'
    }
    renderContent() {
        let $name, $location, $role
        $name = $.create('label').class('label').add('Name:',
            this.$children.name = $.create('input').attr('type', 'text')
        )
        const $locationInput = $.create('input').attr('type', 'search')
        this.#locationGoogle = new google.maps.places.Autocomplete(
            $locationInput.node,
            {}
        )
        this.#locationGoogle.addListener('place_changed', () => {
            this.#locationValue = {
                input: this.$children.location.value,
                googleData: this.#locationGoogle.getPlace()
            }
        })
        const checkLocation = () => {
            if (
                this.#locationValue &&
                this.$children.location.value !== this.#locationValue.input
            ) {
                this.#locationValue = null
            }
        }
        $locationInput.on('change', checkLocation)
        $locationInput.on('input', checkLocation)
        $location = $.create('label').class('register-node-location label').add('Location:',
            this.$children.location = $locationInput
        )
        $role = $.create('label').class('label').add('Role:',
            this.$children.role = $.create('select').add(
                $.create('option')
                    .attr('value', 'distribution')
                    .text('Distribution')
            )
        )
        return [
            $name, $.br(), $.br(),
            $location, $.br(), $.br(),
            $role, $.br(), $.br(),
            this.#renderDistroContent(), $.br(), $.br(),
            $.create('button').text('Submit').on('click', () => {
                this.#submit()
            })
        ]
    }
    #renderDistroContent() {
        return [
            this.#renderGoods(),
            $.br(),
            $.br(),
            $.div('multiline label').add(
                'Hours:',
                $.br(),
                $.br(),
                this.$children.hours = $.create('hours-input')
            )
        ]
    }
    #renderGoods() {
        const goods = ['Shelf-stable', 'Canned']
        return $.div('label multiline').add(
            'Accepted Goods:',
            $.br(),
            $.br(),
            $.create('label')
                .class('blanco register-node-good')
                .add(
                    this.$children.goods.shelfStable =
                        $.create('input').attr('type', 'checkbox'),
                    'Self-stable'
                ),
            $.br(),
            $.create('label')
                .class('blanco register-node-good')
                .add(
                    this.$children.goods.canned =
                        $.create('input').attr('type', 'checkbox'),
                    'Canned'
                ),
            $.br()
        )
    }
}

/*
Name:
<br />
<input type='text' id='regnode-name-input' />
<br /><br />
Location:
<br />
<div id='regnode-place-input'></div>
<br />
Role:
<br />
<select id='regnode-kind-input'>
    <option value='distribution'>Distribute food</option>
    <!-- <option value='production'>Production</option>
    <option value='logistics'>Logistics</option> -->
</select>
<br /><br />
Accepted goods:
<br />
<label><input type='checkbox' /> Shelf stable</label>
<br />
<label><input type='checkbox' /> Canned</label>
<br /><br />
Hours:
<br />
<hours-input></hours-input>
<br />
<button>Submit</button>
*/
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
        if (
            !this.#locationValue ||
            this.#locationValue.input !== this.$children.location.value
        ) {
            alert('Location dropdown selection required.')
            return
        }
        const data = {
            name: this.$children.name.value,
            latitude: this.#locationValue.googleData.geometry.location.lat(),
            longitude: this.#locationValue.googleData.geometry.location.lng(),
            address: this.#locationValue.googleData['formatted_address'],
            goods: {
                shelfStable: this.$children.goods.shelfStable.checked,
                canned: this.$children.goods.canned.checked
            },
            hours: this.$children.hours.value
        }
        fetch('/api/nodes', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(async response => {
            if (response.status !== 200) {
                console.log('Non-200 response status from add food bank', response.status)
                return
            }
        })
    }
    getColor() {
        return 'green'
    }
    renderTitle() {
        return 'Add Food Bank'
    }
    renderContent() {
        let $name, $location
        $name = $.create('label').class('label').add('Name:',
            this.$children.name = $.create('input').attr('type', 'text')
        )
        const $locationInput = $.create('input').attr({type: 'search', placeholder: ''})
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
        $location = $.create('label').class('register-node-location label').add('Location:',
            this.$children.location = $locationInput
        )
        return [
            $name, $.br(), $.br(),
            $location, $.br(), $.br(),
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
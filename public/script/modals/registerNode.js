import $ from '/script/$.js'
import BaseModal from '/script/modals/base.js'
import '/agent-dashboard/hours-input.js'

export default class RegisterNodeModal extends BaseModal {
    getColor() {
        return 'green'
    }
    renderTitle() {
        return 'Register Node'
    }
    renderContent() {
        let $name, $location, $role
        $name = $.create('label').class('label').add('Name:',
            $.create('input').attr('type', 'text')
        )
        const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement({})
        $location = $.create('label').class('register-node-location label').add('Location:',
            placeAutocomplete
        )
        $role = $.create('label').class('label').add('Role:',
            $.create('select').add(
                $.create('option')
                    .attr('value', 'distribution')
                    .text('Distribution')
            )
        )
        return [
            $name,
            $.br(),
            $.br(),
            $location,
            $.br(),
            $.br(),
            $role,
            $.br(),
            $.br(),
            this.#renderDistroContent(),
            $.br(),
            $.br(),
            $.create('button').text('Submit')
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
                $.create('hours-input')
            )
        ]
    }
    #renderGoods() {
        const goods = ['Shelf-stable', 'Canned']
        return $.div('label multiline').add(
            'Accepted Goods:',
            $.br(),
            $.br(),
            goods.map(good => [
                $.create('label')
                    .class('blanco register-node-good')
                    .add(
                        $.create('input').attr('type', 'checkbox'),
                        good
                    ),
                $.br()
            ])
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
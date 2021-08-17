/* Code by CafeForce || www.cafeforce.com || support@cafeforce.com || Mandatory Header */
import {api, LightningElement, track} from 'lwc';

export default class MultiSelectCombobox extends LightningElement {

    @api options = [{'label': 'Bob', 'value': '123'},
        {'label': 'Chrissey', 'value': '345'},
        {'label': 'Jessica', 'value': '456', 'disabled': true},
        {'label': 'Sunny', 'value': '567'}];
    @api req = !false;//required
    @api defaultSelectedValue;
    @api defaultSelectedValues = [];
    @api label;
    @api disabled = false;
    @api multiSelect = false;
    @track value;
    @track values = [];
    @track optionData;
    @track searchString;
    @track message;
    @track showDropdown = false;

    connectedCallback() {
        this.showDropdown = false;
        let optionData = this.options ? (JSON.parse(JSON.stringify(this.options))) : null;
        let value = this.defaultSelectedValue ? (JSON.parse(JSON.stringify(this.defaultSelectedValue))) : null;
        let values = this.defaultSelectedValues ? (JSON.parse(JSON.stringify(this.defaultSelectedValues))) : null;
        if (value || values) {
            let searchString;
            let count = 0;
            for (let i = 0; i < optionData.length; i++) {
                if (this.multiSelect) {
                    if (values.includes(optionData[i].value)) {
                        optionData[i].selected = true;
                        count++;
                    }
                } else {
                    if (optionData[i].value === value) {
                        searchString = optionData[i].label;
                    }
                }
            }
            if (this.multiSelect)
                this.searchString = count + ' Option(s) Selected';
            else
                this.searchString = searchString;
        }
        this.value = value;
        this.values = values;
        this.optionData = optionData;
    }

    filterOptions(event) {

        this.searchString = event.target.value;
        if (this.searchString && this.searchString.length > 0) {
            this.message = '';

            let flag = true;
            for (let i = 0; i < this.optionData.length; i++) {
                if (this.optionData[i].label.toLowerCase().trim().startsWith(this.searchString.toLowerCase().trim())) {
                    this.optionData[i].isVisible = true;
                    flag = false;
                } else {
                    this.optionData[i].isVisible = false;
                }
            }
            if (flag) {
                this.message = "No results found for  '" + this.searchString + "'";


            }

            this.showDropdown = true;

        } else {
            this.showDropdown = false;


        }

    }

    selectItem(event) {
        let selectedVal = event.currentTarget.dataset.id;
        if (selectedVal) {
            let count = 0;
            let options = JSON.parse(JSON.stringify(this.optionData));
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === selectedVal) {
                    if (this.multiSelect) {
                        if (this.values.includes(options[i].value)) {
                            this.values.splice(this.values.indexOf(options[i].value), 1);
                        } else {
                            this.values.push(options[i].value);
                        }
                        options[i].selected = !options[i].selected;
                    } else {
                        this.value = options[i].value;
                        this.searchString = options[i].label;
                    }
                }
                if (options[i].selected) {
                    count++;
                }
            }
            this.optionData = options;
            if (this.multiSelect)
                this.searchString = count + ' Option(s) Selected';
            if (this.multiSelect)
                event.preventDefault();
            else
                this.showDropdown = false;
        }
    }

    showOptions(event) {
        event.target.setCustomValidity("");
        event.target.reportValidity();
        if (this.disabled === false && this.options) {

            this.template.querySelector('.slds-input__icon').style.display = 'none';
            this.message = '';
            this.searchString = '';
            let options = JSON.parse(JSON.stringify(this.optionData));
            for (let i = 0; i < options.length; i++) {
                options[i].isVisible = true;
            }
            if (options.length > 0) {
                this.showDropdown = true;
            }
            this.optionData = options;
        }
    }

    removePill(event) {
        let value = event.currentTarget.name;
        let count = 0;
        let options = JSON.parse(JSON.stringify(this.optionData));
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === value) {
                options[i].selected = false;
                this.values.splice(this.values.indexOf(options[i].value), 1);
            }
            if (options[i].selected) {
                count++;
            }
        }
        this.optionData = options;
        if (this.multiSelect)
            this.searchString = count + ' Option(s) Selected';
    }

    blurEvent(event) {

        // var previousLabel;
        // var count = 0;
        // for (var i = 0; i < this.optionData.length; i++) {
        //     if (this.optionData[i].value === this.value) {
        //         previousLabel = this.optionData[i].label;
        //     }
        //     if (this.optionData[i].selected) {
        //         count++;
        //     }
        // }
        // if (this.multiSelect)
        //     this.searchString = count + ' Option(s) Selected';
        // else
        //     this.searchString = previousLabel;
        //
        let isExist = false;
        for (let i = 0; i < this.optionData.length; i++) {
            if (this.optionData[i].label.toLowerCase().trim() === this.searchString.toLowerCase().trim() ||
                this.optionData[i].value.toLowerCase().trim() === this.searchString.toLowerCase().trim()) {
                this.value = this.optionData[i].value;
                this.searchString = this.optionData[i].label;
                isExist = true;
            }
        }
        if (this.searchString.length > 0 && !isExist) {

            this.value = null
        }
        if (this.value && !isExist && this.searchString.length === 0) {

            let previousLabel;
            let count = 0;
            for (let i = 0; i < this.optionData.length; i++) {
                if (this.optionData[i].value === this.value) {
                    previousLabel = this.optionData[i].label;
                }
                if (this.optionData[i].selected) {
                    count++;
                }
            }
            if (this.multiSelect)
                this.searchString = count + ' Option(s) Selected';
            else
                this.searchString = previousLabel;

        }


        // if (!isExist && this.searchString.length === 0) {
        //     var previousLabel;
        //     var count = 0;
        //     for (var i = 0; i < this.optionData.length; i++) {
        //         if (this.optionData[i].value === this.value) {
        //             previousLabel = this.optionData[i].label;
        //         }
        //         if (this.optionData[i].selected) {
        //             count++;
        //         }
        //     }
        //     if (this.multiSelect)
        //         this.searchString = count + ' Option(s) Selected';
        //     else
        //         this.searchString = previousLabel;
        //
        // }
        // if (this.searchString.length > 0 && !isExist) {
        //     this.value = null;
        // }


        // if (this.value) {
        //     console.log(this.value)
        //     this.searchString = this.value.label;
        // }
        this.showDropdown = false;
        if (!this.value && this.req) {
            event.target.setCustomValidity("Input not valid");
            event.target.reportValidity();
            this.template.querySelector('.slds-input__icon').style.display = '';
        }
        this.template.querySelector('.slds-input__icon').style.display = '';
        // this.dispatchEvent(new CustomEvent('select', {
        //     detail: {
        //         'payloadType': 'multi-select',
        //         'payload': {
        //             'value': this.value,
        //             'values': this.values
        //         }
        //     }
        // }));
    }
}
/*
    Code by CafeForce
    Website: http://www.cafeforce.com
    DO NOT REMOVE THIS HEADER/FOOTER FOR FREE CODE USAGE
*/
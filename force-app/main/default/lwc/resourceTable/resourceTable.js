import {LightningElement, wire, track, api} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getRecords from '@salesforce/apex/LWCExampleController.getRecords';
import {updateRecord} from 'lightning/uiRecordApi';
import {deleteRecord} from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';

const actions = [
    {label: 'Delete', name: 'delete'},
];
const columns = [
    {
        label: 'Price',
        fieldName: 'Price__c',
        type: 'text',
        hideDefaultActions: true
    }, {
        label: 'Count',
        fieldName: 'Count__c',
        type: 'text',
        editable: true,
        hideDefaultActions: true
    },
    {
        label: 'Total',
        fieldName: 'total',
        type: 'text',
        hideDefaultActions: true
    },
    {
        type: 'action',
        typeAttributes: {rowActions: actions},
    }
];

export default class InlineEditTable extends LightningElement {

    saveDraftValues = [];
    columns = columns;
    recordsState;
    @api recordId;
    @track records;
    @track error;

    @wire(getRecords, {recordId: '$recordId'})
    wiredRecords(result) {
        if (result.data) {
            this.recordsState = result;
            this.records = result.data.map(value => {
                let newObj = JSON.parse(JSON.stringify(value));
                newObj.total = newObj.Price__c * newObj.Count__c;
                return newObj;
            });

            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
        }
    }

    handleSave(event) {
        this.saveDraftValues = event.detail.draftValues;
        const recordInputs = this.saveDraftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return {fields};
        });

        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(res => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Records Updated Successfully !',
                    variant: 'success'
                })
            );
            this.saveDraftValues = [];
            return this.refresh();
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'An Error Occurred!!',
                    variant: 'error'
                })
            );
        }).finally(() => {
            this.saveDraftValues = [];
        });
    }

    // This function is used to refresh the table once data updated
    async refresh() {
        await refreshApex(this.recordsState);
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
            default:
        }
    }

    deleteRow(row) {
        const {Id} = row;
        deleteRecord(Id).then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record deleted',
                    variant: 'success'
                })
            );
            const index = this.findRowIndexById(Id);
            if (index !== -1) {
                this.records = this.records
                    .slice(0, index)
                    .concat(this.records.slice(index + 1));
            }
            console.log('after delete '+JSON.stringify(this.records));
        })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });

    }

    findRowIndexById(id) {
        let ret = -1;
        this.records.some((row, index) => {
            if (row.Id === id) {
                ret = index;
                return true;
            }
            return false;
        });
        return ret;
    }

}
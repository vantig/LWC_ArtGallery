import { LightningElement,  wire} from 'lwc';
import getPictures from '@salesforce/apex/PictureDataService.getPictures';


export default class PictureService extends LightningElement {

    // wired getPictures method
    @wire(getPictures)
    pictures

    notifyLoading() {
        this.dispatchEvent(new CustomEvent('loaded'));
    }
}

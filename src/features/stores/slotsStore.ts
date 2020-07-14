import { observable, action } from 'mobx';

export default class ObservableStore implements ISlotsStore {
    constructor(public root: RootStore) { }

    @observable slotNumber: number | null | string = null;
    @observable preSlotNumber: number | null | string = null;
    @observable secondSlotNumber: number  | null | string =  null;
    @observable newImgUrl: HashMap<string> | null = null;
    @observable isMoveProduct: boolean = false;
    @observable isSlotMachine: boolean = false;
    @observable sixthSlot: HashMap<string> | null = null;

    get getSixthSlot() {
        return this.sixthSlot;
    }

    @action
    public setSlotNumber = (slotNumber: number) => {
        this.preSlotNumber = this.slotNumber;
        this.slotNumber = slotNumber;
    }

    @action
    public setPrevSlotNumber = (products: ProductImage[]) => {
        products.map((product: ProductImage) => {
            if(product.id === -1) this.slotNumber = this.preSlotNumber;
        })
    }

    @action
    public setSecondSlotNumber = (slotNumber: number | string) => {
        this.secondSlotNumber = slotNumber;
    }


    @action
    public setNewImgUrl = (newImgUrl: HashMap<string>) => {
        this.setSlotMachineEffect(true);
        this.newImgUrl = newImgUrl;        
    }

    @action
    public setSlotMachineEffect = (flag: boolean) => {
        this.isSlotMachine = flag;
    }

    @action
    public setMoveProduct = (flag: boolean) => {
        this.isMoveProduct = flag;
    }

    @action
    addOrReplaceSixthSlot = (item: HashMap<string>) => {
        this.sixthSlot = item;
    }

    @action
    removeSixthSlot = () => {
        this.sixthSlot = null;
    }
}
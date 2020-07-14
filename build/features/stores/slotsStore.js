var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, action } from 'mobx';
export default class ObservableStore {
    constructor(root) {
        this.root = root;
        this.slotNumber = null;
        this.preSlotNumber = null;
        this.secondSlotNumber = null;
        this.newImgUrl = null;
        this.isMoveProduct = false;
        this.isSlotMachine = false;
        this.sixthSlot = null;
        this.setSlotNumber = (slotNumber) => {
            this.preSlotNumber = this.slotNumber;
            this.slotNumber = slotNumber;
        };
        this.setPrevSlotNumber = (products) => {
            products.map((product) => {
                if (product.id === -1)
                    this.slotNumber = this.preSlotNumber;
            });
        };
        this.setSecondSlotNumber = (slotNumber) => {
            this.secondSlotNumber = slotNumber;
        };
        this.setNewImgUrl = (newImgUrl) => {
            this.setSlotMachineEffect(true);
            this.newImgUrl = newImgUrl;
        };
        this.setSlotMachineEffect = (flag) => {
            this.isSlotMachine = flag;
        };
        this.setMoveProduct = (flag) => {
            this.isMoveProduct = flag;
        };
        this.addOrReplaceSixthSlot = (item) => {
            this.sixthSlot = item;
        };
        this.removeSixthSlot = () => {
            this.sixthSlot = null;
        };
    }
    get getSixthSlot() {
        return this.sixthSlot;
    }
}
__decorate([
    observable
], ObservableStore.prototype, "slotNumber", void 0);
__decorate([
    observable
], ObservableStore.prototype, "preSlotNumber", void 0);
__decorate([
    observable
], ObservableStore.prototype, "secondSlotNumber", void 0);
__decorate([
    observable
], ObservableStore.prototype, "newImgUrl", void 0);
__decorate([
    observable
], ObservableStore.prototype, "isMoveProduct", void 0);
__decorate([
    observable
], ObservableStore.prototype, "isSlotMachine", void 0);
__decorate([
    observable
], ObservableStore.prototype, "sixthSlot", void 0);
__decorate([
    action
], ObservableStore.prototype, "setSlotNumber", void 0);
__decorate([
    action
], ObservableStore.prototype, "setPrevSlotNumber", void 0);
__decorate([
    action
], ObservableStore.prototype, "setSecondSlotNumber", void 0);
__decorate([
    action
], ObservableStore.prototype, "setNewImgUrl", void 0);
__decorate([
    action
], ObservableStore.prototype, "setSlotMachineEffect", void 0);
__decorate([
    action
], ObservableStore.prototype, "setMoveProduct", void 0);
__decorate([
    action
], ObservableStore.prototype, "addOrReplaceSixthSlot", void 0);
__decorate([
    action
], ObservableStore.prototype, "removeSixthSlot", void 0);
//# sourceMappingURL=slotsStore.js.map
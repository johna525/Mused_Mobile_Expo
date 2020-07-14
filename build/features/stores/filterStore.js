var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, action } from 'mobx';
import { findCategoryIndex } from '../shared';
import { categoriesKeys } from '../filter/categoriesKeys';
export default class ObservableStore {
    constructor(root) {
        this.root = root;
        this.categoriesFilter = [];
        this.tab = '';
        this.setFilterTab = (tab) => {
            this.tab = tab;
        };
        this.clearFilters = () => {
            this.categoriesFilter = [];
        };
        this.addNewCategory = (category, subCutegory) => {
            const categoryIndex = findCategoryIndex(this.categoriesFilter, category);
            if (this.categoriesFilter[categoryIndex]) {
                const newCategoriesFilter = [...this.categoriesFilter];
                newCategoriesFilter[categoryIndex].subCategories.push(subCutegory);
                this.categoriesFilter = [...newCategoriesFilter];
            }
            else {
                this.categoriesFilter = [...this.categoriesFilter, { category, subCategories: [subCutegory] }];
            }
        };
        this.removeCategory = (category, subCutegory) => {
            const categoryIndex = findCategoryIndex(this.categoriesFilter, category);
            const subCategoryLength = this.categoriesFilter[categoryIndex].subCategories.length;
            const newCategoriesFilter = [...this.categoriesFilter];
            if (subCategoryLength === 1) {
                newCategoriesFilter.splice(categoryIndex, 1);
            }
            if (subCategoryLength > 1) {
                const newSubcategiries = newCategoriesFilter[categoryIndex].subCategories.filter((_subCutegory) => _subCutegory !== subCutegory);
                newCategoriesFilter[categoryIndex].subCategories = [...newSubcategiries];
            }
            this.categoriesFilter = [...newCategoriesFilter];
        };
        this.selectAllSubCategories = (category) => {
            const categoryIndex = findCategoryIndex(this.categoriesFilter, category);
            const subCategories = categoriesKeys.find((_category) => _category.category === category).subCategories;
            if (this.categoriesFilter[categoryIndex]) {
                const newCategoriesFilter = [...this.categoriesFilter];
                newCategoriesFilter[categoryIndex].subCategories = [...subCategories];
                this.categoriesFilter = [...newCategoriesFilter];
            }
            else {
                this.categoriesFilter = [...this.categoriesFilter, { category, subCategories: [...subCategories] }];
            }
        };
        this.formatFilterCategories = () => {
            this.categoriesFilter = [];
        };
    }
    get listOfCategory() {
        return this.categoriesFilter;
    }
    get filterTab() {
        return this.tab;
    }
}
__decorate([
    observable
], ObservableStore.prototype, "categoriesFilter", void 0);
__decorate([
    observable
], ObservableStore.prototype, "tab", void 0);
__decorate([
    action
], ObservableStore.prototype, "setFilterTab", void 0);
__decorate([
    action
], ObservableStore.prototype, "clearFilters", void 0);
__decorate([
    action
], ObservableStore.prototype, "addNewCategory", void 0);
__decorate([
    action
], ObservableStore.prototype, "removeCategory", void 0);
__decorate([
    action
], ObservableStore.prototype, "selectAllSubCategories", void 0);
__decorate([
    action
], ObservableStore.prototype, "formatFilterCategories", void 0);
//# sourceMappingURL=filterStore.js.map
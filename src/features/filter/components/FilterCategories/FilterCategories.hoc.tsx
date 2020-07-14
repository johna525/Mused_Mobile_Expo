import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import FilterCategories from './FilterCategories';
import { ROOT_STORE } from '../../../stores';
type Props = {
    root?: RootStore;
};
function FilterCategoriesHOC(FilterList: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {

      render() {
          const { root: { filters } } = this.props;
          const { listOfCategory, addNewCategory, removeCategory, selectAllSubCategories} = filters;
        return <FilterList
                    listOfCategory={listOfCategory}
                    addNewCategory={addNewCategory}
                    removeCategory={removeCategory}
                    selectAllSubCategories={selectAllSubCategories}
                />
      }
    }
    return NewComp;
  }

export default FilterCategoriesHOC(FilterCategories);
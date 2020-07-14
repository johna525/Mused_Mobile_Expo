import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Footer from './Footer';

import { ROOT_STORE } from '../../../stores';
type Props = {
    root?: RootStore;
};
function FooterHOC(Footer: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      render() {
          const { root: { ui } } = this.props;
          const { currentRoute }  = ui;
        return <Footer 
                    currentRoute={currentRoute}
                />
      }
    }
    return NewComp;
  }

export default FooterHOC(Footer);
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Onboarding from './Onboarding';

import { ROOT_STORE } from '../../stores';
import DotIndicator from '../../shared/components/Indicators/dot-indicator'
type Props = {
    navigation: any;
    root?: RootStore;
    showContent?: boolean;
    onSkipSignUp: () => void
};
function ZoomHOC(Onboarding: any) {
    @inject(ROOT_STORE)

    @observer
    class NewComp extends Component<Props> {
      
        render() {
            const { navigation, onSkipSignUp } = this.props;
            const { setUserDetails } =  this.props.root.user;
            const { setLoading, loading } =  this.props.root.ui;
            if(loading) {
                return <DotIndicator size={6} count={3}/>
            }
            return <Onboarding
                      navigation={navigation}
                      setUserDetails={setUserDetails}
                      onSkipSignUp={onSkipSignUp}
                      setLoading={setLoading}
                  />
        }
    }
    return NewComp;
  }

export default ZoomHOC(Onboarding);

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Onboarding from './Onboarding';
import { ROOT_STORE } from '../../stores';
import DotIndicator from '../../shared/components/Indicators/dot-indicator';
function ZoomHOC(Onboarding) {
    let NewComp = class NewComp extends Component {
        render() {
            const { navigation, onSkipSignUp } = this.props;
            const { setUserDetails } = this.props.root.user;
            const { setLoading, loading } = this.props.root.ui;
            if (loading) {
                return React.createElement(DotIndicator, { size: 6, count: 3 });
            }
            return React.createElement(Onboarding, { navigation: navigation, setUserDetails: setUserDetails, onSkipSignUp: onSkipSignUp, setLoading: setLoading });
        }
    };
    NewComp = __decorate([
        inject(ROOT_STORE),
        observer
    ], NewComp);
    return NewComp;
}
export default ZoomHOC(Onboarding);
//# sourceMappingURL=Onboarding.hoc.js.map
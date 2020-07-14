import { Stitch, AnonymousCredential, FacebookCredential, } from 'mongodb-stitch-react-native-sdk';
const clientAppId = "project0-ttfvv";
class Client {
    constructor() {
        this.clientAppId = clientAppId;
        this.clientInst = null;
    }
    init() {
        const clientId = this.clientAppId;
        const that = this;
        return new Promise(function (resolve, reject) {
            Stitch.initializeDefaultAppClient(clientId).then(client => {
                that.setClient(client);
                resolve();
            }, reject);
        });
    }
    ;
    setClient(client) {
        this.clientInst = client;
    }
    ;
    getClient() {
        return this.clientInst;
    }
    ;
    logInAnon(client) {
        return client.auth.loginWithCredential(new AnonymousCredential());
    }
    loginViaFBProvider(token) {
        return this.clientInst.auth.loginWithCredential(new FacebookCredential(token));
    }
    ;
}
const client = new Client();
export const initClient = () => {
    return client.init();
};
export const getClient = () => client.getClient();
export const login = (type, token) => {
    switch (type) {
        case 'facebook':
            return client.loginViaFBProvider(token);
        case 'anonymous':
            return client.logInAnon(client.clientInst);
        default:
            return null;
    }
};
//# sourceMappingURL=db.js.map
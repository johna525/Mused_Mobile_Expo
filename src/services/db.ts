import {
    Stitch,
    StitchAppClient,
    AnonymousCredential,
    FacebookCredential,
} from 'mongodb-stitch-react-native-sdk';

const clientAppId: string = "project0-ttfvv";

interface IClient {
    clientInst: StitchAppClient;
    clientAppId: string;
    setClient: (client: StitchAppClient) => void;
    getClient: () => StitchAppClient;
}

class Client implements IClient{
    clientAppId: string;
    clientInst: StitchAppClient;

    constructor(){
        this.clientAppId = clientAppId;
        this.clientInst = null;
    }

    init() {
        const clientId = this.clientAppId;
        const that = this;

        return new Promise(function(resolve, reject) {
            Stitch.initializeDefaultAppClient(clientId).then(client => {
                that.setClient(client);
                resolve();
            }, reject)
        })
    };

    setClient(client: StitchAppClient) {
        this.clientInst = client;
    };

    getClient() {
        return this.clientInst;
    };

    logInAnon(client: StitchAppClient) {
        return client.auth.loginWithCredential(new AnonymousCredential())
    }

    loginViaFBProvider(token: string) {
        return this.clientInst.auth.loginWithCredential(new FacebookCredential(token))
    };
}

const client = new Client();

export const initClient = () => {
    return client.init();
};

export const getClient = () => client.getClient();

export const login = (type: string, token?: string) => {
    switch (type) {
        case 'facebook':
            return client.loginViaFBProvider(token);
        case 'anonymous':
            return client.logInAnon(client.clientInst);
        default:
            return null;
    }
};


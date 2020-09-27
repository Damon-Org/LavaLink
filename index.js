import BaseModule from './structures/BaseModule.js'
import pkg from 'shoukaku'

export default class LavaLink extends BaseModule {
    constructor(main) {
        super(main);

        this.register(LavaLink, {
            name: 'lavalink',
            scope: 'global'
        });
    }

    get conn() {
        return this._conn;
    }

    setup() {
        this._conn = new pkg.Shoukaku(this._m, this.auth.credentials.lavalink, {
            moveOnDisconnect: false,
            resumable: 'lavaRetryTheRedemptionArc',
            resumableTimeout: 30,
            reconnectTries: 100,
            restTimeout: 2e4
        });

        this.conn.on('ready', (name) => this.log.info('LAVALINK', `Node: ${name} is now connected`));
        this.conn.on('error', (name, error) => this.log.error('LAVALINK', `Node: ${name} emitted an error.\n${error.stack}`));
        this.conn.on('close', (name, code, reason) => this.log.warn('LAVALINK', `Node: ${name} closed with code ${code}. Reason: ${reason || 'No reason'}`));
        this.conn.on('disconnected', (name, reason) => this.log.critical('LAVALINK', `Node: ${name} disconnected. Reason: ${reason || 'No reason'}`));

        return true;
    }
}

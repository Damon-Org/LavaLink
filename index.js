import BaseModule from './structures/BaseModule.js'
import Shoukaku, { Shoukaku as LavaLinkConnector } from 'shoukaku'

export default class LavaLink extends BaseModule {
    constructor(main) {
        super(main);

        this.register(LavaLink, {
            name: 'lavalink'
        });
    }

    get conn() {
        return this._conn;
    }

    init() {
        this._conn = new LavaLinkConnector(new Shoukaku.Libraries.DiscordJS(this._m), this.auth.credentials.lavalink, {
            moveOnDisconnect: false,
            resumable: true,
            resumableTimeout: 2e4,
            reconnectTries: 100,
            restTimeout: 3e4
        });

        this.conn.on('debug', (name, info) => this.log.verbose('LAVALINK', info));
        this.conn.on('ready', (name) => this.log.info('LAVALINK', `Node: ${name} is now connected`));
        this.conn.on('error', (name, error) => this.log.error('LAVALINK', `Node: ${name} emitted an error.\n${error.stack}`));
        this.conn.on('close', (name, code, reason) => this.log.warn('LAVALINK', `Node: ${name} closed with code ${code}. Reason: "${reason || 'No reason'}"`));
        this.conn.on('disconnected', (name, reason) => this.log.critical('LAVALINK', `Node: ${name} disconnected. Reason: ${reason || 'No reason'}`));

        return true;
    }
}

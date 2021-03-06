import config from '../configs/AppSetting'
import _ from 'lodash'

export default class Parse {

    constructor(token) {
        if (!_.isNull(token) && _.isUndefined(token)) {
            throw 'TokenMissing';
        }
        this._sessionToken =
            _.isNull(token) ?  null : token;
        // this._applicationId = configs.PARSE_ID;
        // this._restAPIKey = configs.PARSE_API_KEY;
        // this._masterKey = null;

        this.API_BASE_URL = config.URL;
    }

    signUp(data) {
        return this._fetch({
            method: 'POST',
            url: '/users',
            body: data,
            timeout: 10000
        }).then(response => response.json());
    }

    login(data) {
        return this._fetch({
            method: 'POST',
            url: '/users/login?include=user',
            body: data,
            timeout: 10000
        }).then(response => response.json());
    }
    loginFacebook(data) {
        return this._fetch({
            method: 'POST',
            url: '/users/loginFacebook',
            body: data,
            timeout: 10000
        }).then(response => response.json());
    }
    logout(token) {
        return this._fetch({
            method: 'POST',
            url: `/users/logout?accessToken=${token}`,
            timeout: 10000
        }).then(response => response.json());
    }

    patchUser(data) {
        return this._fetch({
            method: 'PATCH',
            url: `/users/${data.id}`,
            body: data.user,
            timeout: 10000
        }).then(response => response.json());
    }

    getUser(data) {
        return this._fetch({
            method: 'GET',
            url: '/users/'+data,
            timeout: 10000
        }).then(response => response.json());
    }

    getQuestions(data) {
        return this._fetch({
            method: 'GET',
            url: '/questions',
            timeout: 10000
        }).then(response => response.json());
    }

    postRequest(data) {
        return this._fetch({
            method: 'POST',
            url: '/customerRequests',
            body: data,
            timeout: 10000
        }).then(response => response.json());
    }

    putRequest(data) {
        return this._fetch({
            method: 'PUT',
            url: '/requests',
            body: data,
            timeout: 10000
        }).then(response => response.json());
    }

    getRequest(query) {
        return this._fetch({
            method: 'GET',
            url: `/customerRequests?${query}`,
            timeout: 10000
        }).then(response => response.json());
    }

    matchRequest(data) {
        return this._fetch({
            method: 'GET',
            url: `/customerRequests/matches?${data}`,
            timeout: 10000
        }).then(response => response.json());
    }

    getRequestById(data) {
        return this._fetch({
            method: 'GET',
            url: '/customerRequests/'+data+'?filter[include]=user',
            timeout: 10000
        }).then(response => response.json());
    }

    bidRequest(data) {
        return this._fetch({
            method: 'POST',
            url: '/bids',
            body: data,
            timeout: 10000
        }).then(response => response.json());
    }

    getBidRequest(data) {
        return this._fetch({
            method: 'GET',
            url: '/bids?'+data,
            timeout: 10000
        }).then(response => response.json());
    }

    changePassword(data) {
        return this._fetch({
            method: 'POST',
            url: '/users/change-password',
            body: data,
            timeout: 10000
        }).then(response => response.json()); //204
    }

    getAddresses() {
        return this._fetch({
            method: 'GET',
            url: '/addresses',
            timeout: 10000
        }).then(response => response.json());
    }

    getSettings() {
        return this._fetch({
            method: 'GET',
            url: '/settings',
            timeout: 10000
        }).then(response => response.json());
    }

    _fetch(opts) {
        opts = _.extend({
            method: 'GET',
            url: null,
            body: null,
            callback: null
        }, opts);

        var reqOpts = {
            method: opts.method,
            headers: {
                // 'X-Parse-Application-Id': this._applicationId,
                // 'X-Parse-REST-API-Key': this._restAPIKey
            }
        };
        if (this._sessionToken) {
            reqOpts.headers['Authorization'] = this._sessionToken;
        }

        // if (this._masterKey) {
        //   reqOpts.headers['X-Parse-Master-Key'] = this.masterKey;
        // }

        if (opts.method === 'POST' || opts.method === 'PUT' || opts.method === 'PATCH') {
            reqOpts.headers['Accept'] = 'application/json';
            reqOpts.headers['Content-Type'] = 'application/json';
        }

        if (opts.body) {
            reqOpts.body = JSON.stringify(opts.body);
        }

        if (opts.params) {
            reqOpts.params = opts.params;
        }

        if (opts.timeout) {
            return this._timeoutPromise(opts.timeout, fetch(this.API_BASE_URL + opts.url, reqOpts));
        }

        return fetch(this.API_BASE_URL + opts.url, reqOpts);
    }

    _timeoutPromise(milisecond, promise) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject(new Error("promise timeout"))
            }, milisecond);
            promise.then(
                (res) => {
                    clearTimeout(timeoutId);
                    resolve(res);
                },
                (err) => {
                    clearTimeout(timeoutId);
                    reject(err);
                }
            );
        })
    }
}
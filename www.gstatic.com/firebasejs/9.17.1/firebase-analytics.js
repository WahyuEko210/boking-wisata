import {
    registerVersion as e,
    _registerComponent as t,
    _getProvider as n,
    getApp as a
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
var i;
! function(e) {
    e[e.DEBUG = 0] = "DEBUG", e[e.VERBOSE = 1] = "VERBOSE", e[e.INFO = 2] = "INFO", e[e.WARN = 3] = "WARN", e[e.ERROR = 4] = "ERROR", e[e.SILENT = 5] = "SILENT"
}(i || (i = {}));
const r = {
        debug: i.DEBUG,
        verbose: i.VERBOSE,
        info: i.INFO,
        warn: i.WARN,
        error: i.ERROR,
        silent: i.SILENT
    },
    o = i.INFO,
    s = {
        [i.DEBUG]: "log",
        [i.VERBOSE]: "log",
        [i.INFO]: "info",
        [i.WARN]: "warn",
        [i.ERROR]: "error"
    },
    c = (e, t, ...n) => {
        if (t < e.logLevel) return;
        const a = (new Date).toISOString(),
            i = s[t];
        if (!i) throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
        console[i](`[${a}]  ${e.name}:`, ...n)
    };

function u() {
    const e = "object" == typeof chrome ? chrome.runtime : "object" == typeof browser ? browser.runtime : void 0;
    return "object" == typeof e && void 0 !== e.id
}

function l() {
    try {
        return "object" == typeof indexedDB
    } catch (e) {
        return !1
    }
}

function d() {
    return new Promise(((e, t) => {
        try {
            let n = !0;
            const a = "validate-browser-context-for-indexeddb-analytics-module",
                i = self.indexedDB.open(a);
            i.onsuccess = () => {
                i.result.close(), n || self.indexedDB.deleteDatabase(a), e(!0)
            }, i.onupgradeneeded = () => {
                n = !1
            }, i.onerror = () => {
                var e;
                t((null === (e = i.error) || void 0 === e ? void 0 : e.message) || "")
            }
        } catch (e) {
            t(e)
        }
    }))
}

function f() {
    return !("undefined" == typeof navigator || !navigator.cookieEnabled)
}
class p extends Error {
    constructor(e, t, n) {
        super(t), this.code = e, this.customData = n, this.name = "FirebaseError", Object.setPrototypeOf(this, p.prototype), Error.captureStackTrace && Error.captureStackTrace(this, h.prototype.create)
    }
}
class h {
    constructor(e, t, n) {
        this.service = e, this.serviceName = t, this.errors = n
    }
    create(e, ...t) {
        const n = t[0] || {},
            a = `${this.service}/${e}`,
            i = this.errors[e],
            r = i ? function(e, t) {
                return e.replace(g, ((e, n) => {
                    const a = t[n];
                    return null != a ? String(a) : `<${n}?>`
                }))
            }(i, n) : "Error",
            o = `${this.serviceName}: ${r} (${a}).`;
        return new p(a, o, n)
    }
}
const g = /\{\$([^}]+)}/g;

function m(e, t) {
    if (e === t) return !0;
    const n = Object.keys(e),
        a = Object.keys(t);
    for (const i of n) {
        if (!a.includes(i)) return !1;
        const n = e[i],
            r = t[i];
        if (w(n) && w(r)) {
            if (!m(n, r)) return !1
        } else if (n !== r) return !1
    }
    for (const e of a)
        if (!n.includes(e)) return !1;
    return !0
}

function w(e) {
    return null !== e && "object" == typeof e
}

function y(e, t = 1e3, n = 2) {
    const a = t * Math.pow(n, e),
        i = Math.round(.5 * a * (Math.random() - .5) * 2);
    return Math.min(144e5, a + i)
}

function v(e) {
    return e && e._delegate ? e._delegate : e
}
class I {
    constructor(e, t, n) {
        this.name = e, this.instanceFactory = t, this.type = n, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null
    }
    setInstantiationMode(e) {
        return this.instantiationMode = e, this
    }
    setMultipleInstances(e) {
        return this.multipleInstances = e, this
    }
    setServiceProps(e) {
        return this.serviceProps = e, this
    }
    setInstanceCreatedCallback(e) {
        return this.onInstanceCreated = e, this
    }
}
let b, E;
const T = new WeakMap,
    D = new WeakMap,
    S = new WeakMap,
    k = new WeakMap,
    C = new WeakMap;
let L = {
    get(e, t, n) {
        if (e instanceof IDBTransaction) {
            if ("done" === t) return D.get(e);
            if ("objectStoreNames" === t) return e.objectStoreNames || S.get(e);
            if ("store" === t) return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0])
        }
        return $(e[t])
    },
    set: (e, t, n) => (e[t] = n, !0),
    has: (e, t) => e instanceof IDBTransaction && ("done" === t || "store" === t) || t in e
};

function j(e) {
    return e !== IDBDatabase.prototype.transaction || "objectStoreNames" in IDBTransaction.prototype ? (E || (E = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey])).includes(e) ? function(...t) {
        return e.apply(P(this), t), $(T.get(this))
    } : function(...t) {
        return $(e.apply(P(this), t))
    } : function(t, ...n) {
        const a = e.call(P(this), t, ...n);
        return S.set(a, t.sort ? t.sort() : [t]), $(a)
    }
}

function O(e) {
    return "function" == typeof e ? j(e) : (e instanceof IDBTransaction && function(e) {
        if (D.has(e)) return;
        const t = new Promise(((t, n) => {
            const a = () => {
                    e.removeEventListener("complete", i), e.removeEventListener("error", r), e.removeEventListener("abort", r)
                },
                i = () => {
                    t(), a()
                },
                r = () => {
                    n(e.error || new DOMException("AbortError", "AbortError")), a()
                };
            e.addEventListener("complete", i), e.addEventListener("error", r), e.addEventListener("abort", r)
        }));
        D.set(e, t)
    }(e), t = e, (b || (b = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])).some((e => t instanceof e)) ? new Proxy(e, L) : e);
    var t
}

function $(e) {
    if (e instanceof IDBRequest) return function(e) {
        const t = new Promise(((t, n) => {
            const a = () => {
                    e.removeEventListener("success", i), e.removeEventListener("error", r)
                },
                i = () => {
                    t($(e.result)), a()
                },
                r = () => {
                    n(e.error), a()
                };
            e.addEventListener("success", i), e.addEventListener("error", r)
        }));
        return t.then((t => {
            t instanceof IDBCursor && T.set(t, e)
        })).catch((() => {})), C.set(t, e), t
    }(e);
    if (k.has(e)) return k.get(e);
    const t = O(e);
    return t !== e && (k.set(e, t), C.set(t, e)), t
}
const P = e => C.get(e);
const M = ["get", "getKey", "getAll", "getAllKeys", "count"],
    _ = ["put", "add", "delete", "clear"],
    A = new Map;

function B(e, t) {
    if (!(e instanceof IDBDatabase) || t in e || "string" != typeof t) return;
    if (A.get(t)) return A.get(t);
    const n = t.replace(/FromIndex$/, ""),
        a = t !== n,
        i = _.includes(n);
    if (!(n in (a ? IDBIndex : IDBObjectStore).prototype) || !i && !M.includes(n)) return;
    const r = async function(e, ...t) {
        const r = this.transaction(e, i ? "readwrite" : "readonly");
        let o = r.store;
        return a && (o = o.index(t.shift())), (await Promise.all([o[n](...t), i && r.done]))[0]
    };
    return A.set(t, r), r
}
L = (e => ({ ...e,
    get: (t, n, a) => B(t, n) || e.get(t, n, a),
    has: (t, n) => !!B(t, n) || e.has(t, n)
}))(L);
const N = "@firebase/installations",
    F = new h("installations", "Installations", {
        "missing-app-config-values": 'Missing App configuration value: "{$valueName}"',
        "not-registered": "Firebase Installation is not registered.",
        "installation-not-found": "Firebase Installation not found.",
        "request-failed": '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
        "app-offline": "Could not process request. Application offline.",
        "delete-pending-registration": "Can't delete installation while there is a pending registration request."
    });

function x(e) {
    return e instanceof p && e.code.includes("request-failed")
}

function R({
    projectId: e
}) {
    return `https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`
}

function H(e) {
    return {
        token: e.token,
        requestStatus: 2,
        expiresIn: (t = e.expiresIn, Number(t.replace("s", "000"))),
        creationTime: Date.now()
    };
    var t
}
async function q(e, t) {
    const n = (await t.json()).error;
    return F.create("request-failed", {
        requestName: e,
        serverCode: n.code,
        serverMessage: n.message,
        serverStatus: n.status
    })
}

function z({
    apiKey: e
}) {
    return new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-goog-api-key": e
    })
}

function V(e, {
    refreshToken: t
}) {
    const n = z(e);
    return n.append("Authorization", function(e) {
        return `FIS_v2 ${e}`
    }(t)), n
}
async function K(e) {
    const t = await e();
    return t.status >= 500 && t.status < 600 ? e() : t
}

function W(e) {
    return new Promise((t => {
        setTimeout(t, e)
    }))
}
const G = /^[cdef][\w-]{21}$/;

function U() {
    try {
        const e = new Uint8Array(17);
        (self.crypto || self.msCrypto).getRandomValues(e), e[0] = 112 + e[0] % 16;
        const t = function(e) {
            return (t = e, btoa(String.fromCharCode(...t)).replace(/\+/g, "-").replace(/\//g, "_")).substr(0, 22);
            var t
        }(e);
        return G.test(t) ? t : ""
    } catch (e) {
        return ""
    }
}

function J(e) {
    return `${e.appName}!${e.appId}`
}
const Y = new Map;

function Z(e, t) {
    const n = J(e);
    Q(n, t),
        function(e, t) {
            const n = function() {
                !X && "BroadcastChannel" in self && (X = new BroadcastChannel("[Firebase] FID Change"), X.onmessage = e => {
                    Q(e.data.key, e.data.fid)
                });
                return X
            }();
            n && n.postMessage({
                key: e,
                fid: t
            });
            0 === Y.size && X && (X.close(), X = null)
        }(n, t)
}

function Q(e, t) {
    const n = Y.get(e);
    if (n)
        for (const e of n) e(t)
}
let X = null;
const ee = "firebase-installations-store";
let te = null;

function ne() {
    return te || (te = function(e, t, {
        blocked: n,
        upgrade: a,
        blocking: i,
        terminated: r
    } = {}) {
        const o = indexedDB.open(e, t),
            s = $(o);
        return a && o.addEventListener("upgradeneeded", (e => {
            a($(o.result), e.oldVersion, e.newVersion, $(o.transaction))
        })), n && o.addEventListener("blocked", (() => n())), s.then((e => {
            r && e.addEventListener("close", (() => r())), i && e.addEventListener("versionchange", (() => i()))
        })).catch((() => {})), s
    }("firebase-installations-database", 1, {
        upgrade: (e, t) => {
            if (0 === t) e.createObjectStore(ee)
        }
    })), te
}
async function ae(e, t) {
    const n = J(e),
        a = (await ne()).transaction(ee, "readwrite"),
        i = a.objectStore(ee),
        r = await i.get(n);
    return await i.put(t, n), await a.done, r && r.fid === t.fid || Z(e, t.fid), t
}
async function ie(e) {
    const t = J(e),
        n = (await ne()).transaction(ee, "readwrite");
    await n.objectStore(ee).delete(t), await n.done
}
async function re(e, t) {
    const n = J(e),
        a = (await ne()).transaction(ee, "readwrite"),
        i = a.objectStore(ee),
        r = await i.get(n),
        o = t(r);
    return void 0 === o ? await i.delete(n) : await i.put(o, n), await a.done, !o || r && r.fid === o.fid || Z(e, o.fid), o
}
async function oe(e) {
    let t;
    const n = await re(e.appConfig, (n => {
        const a = function(e) {
                return ue(e || {
                    fid: U(),
                    registrationStatus: 0
                })
            }(n),
            i = function(e, t) {
                if (0 === t.registrationStatus) {
                    if (!navigator.onLine) {
                        return {
                            installationEntry: t,
                            registrationPromise: Promise.reject(F.create("app-offline"))
                        }
                    }
                    const n = {
                            fid: t.fid,
                            registrationStatus: 1,
                            registrationTime: Date.now()
                        },
                        a = async function(e, t) {
                            try {
                                const n = await async function({
                                    appConfig: e,
                                    heartbeatServiceProvider: t
                                }, {
                                    fid: n
                                }) {
                                    const a = R(e),
                                        i = z(e),
                                        r = t.getImmediate({
                                            optional: !0
                                        });
                                    if (r) {
                                        const e = await r.getHeartbeatsHeader();
                                        e && i.append("x-firebase-client", e)
                                    }
                                    const o = {
                                            fid: n,
                                            authVersion: "FIS_v2",
                                            appId: e.appId,
                                            sdkVersion: "w:0.6.3"
                                        },
                                        s = {
                                            method: "POST",
                                            headers: i,
                                            body: JSON.stringify(o)
                                        },
                                        c = await K((() => fetch(a, s)));
                                    if (c.ok) {
                                        const e = await c.json();
                                        return {
                                            fid: e.fid || n,
                                            registrationStatus: 2,
                                            refreshToken: e.refreshToken,
                                            authToken: H(e.authToken)
                                        }
                                    }
                                    throw await q("Create Installation", c)
                                }(e, t);
                                return ae(e.appConfig, n)
                            } catch (n) {
                                throw x(n) && 409 === n.customData.serverCode ? await ie(e.appConfig) : await ae(e.appConfig, {
                                    fid: t.fid,
                                    registrationStatus: 0
                                }), n
                            }
                        }(e, n);
                    return {
                        installationEntry: n,
                        registrationPromise: a
                    }
                }
                return 1 === t.registrationStatus ? {
                    installationEntry: t,
                    registrationPromise: se(e)
                } : {
                    installationEntry: t
                }
            }(e, a);
        return t = i.registrationPromise, i.installationEntry
    }));
    return "" === n.fid ? {
        installationEntry: await t
    } : {
        installationEntry: n,
        registrationPromise: t
    }
}
async function se(e) {
    let t = await ce(e.appConfig);
    for (; 1 === t.registrationStatus;) await W(100), t = await ce(e.appConfig);
    if (0 === t.registrationStatus) {
        const {
            installationEntry: t,
            registrationPromise: n
        } = await oe(e);
        return n || t
    }
    return t
}

function ce(e) {
    return re(e, (e => {
        if (!e) throw F.create("installation-not-found");
        return ue(e)
    }))
}

function ue(e) {
    return 1 === (t = e).registrationStatus && t.registrationTime + 1e4 < Date.now() ? {
        fid: e.fid,
        registrationStatus: 0
    } : e;
    var t
}
async function le({
    appConfig: e,
    heartbeatServiceProvider: t
}, n) {
    const a = function(e, {
            fid: t
        }) {
            return `${R(e)}/${t}/authTokens:generate`
        }(e, n),
        i = V(e, n),
        r = t.getImmediate({
            optional: !0
        });
    if (r) {
        const e = await r.getHeartbeatsHeader();
        e && i.append("x-firebase-client", e)
    }
    const o = {
            installation: {
                sdkVersion: "w:0.6.3",
                appId: e.appId
            }
        },
        s = {
            method: "POST",
            headers: i,
            body: JSON.stringify(o)
        },
        c = await K((() => fetch(a, s)));
    if (c.ok) {
        return H(await c.json())
    }
    throw await q("Generate Auth Token", c)
}
async function de(e, t = !1) {
    let n;
    const a = await re(e.appConfig, (a => {
        if (!pe(a)) throw F.create("not-registered");
        const i = a.authToken;
        if (!t && function(e) {
                return 2 === e.requestStatus && ! function(e) {
                    const t = Date.now();
                    return t < e.creationTime || e.creationTime + e.expiresIn < t + 36e5
                }(e)
            }(i)) return a;
        if (1 === i.requestStatus) return n = async function(e, t) {
            let n = await fe(e.appConfig);
            for (; 1 === n.authToken.requestStatus;) await W(100), n = await fe(e.appConfig);
            const a = n.authToken;
            return 0 === a.requestStatus ? de(e, t) : a
        }(e, t), a; {
            if (!navigator.onLine) throw F.create("app-offline");
            const t = function(e) {
                const t = {
                    requestStatus: 1,
                    requestTime: Date.now()
                };
                return Object.assign(Object.assign({}, e), {
                    authToken: t
                })
            }(a);
            return n = async function(e, t) {
                try {
                    const n = await le(e, t),
                        a = Object.assign(Object.assign({}, t), {
                            authToken: n
                        });
                    return await ae(e.appConfig, a), n
                } catch (n) {
                    if (!x(n) || 401 !== n.customData.serverCode && 404 !== n.customData.serverCode) {
                        const n = Object.assign(Object.assign({}, t), {
                            authToken: {
                                requestStatus: 0
                            }
                        });
                        await ae(e.appConfig, n)
                    } else await ie(e.appConfig);
                    throw n
                }
            }(e, t), t
        }
    }));
    return n ? await n : a.authToken
}

function fe(e) {
    return re(e, (e => {
        if (!pe(e)) throw F.create("not-registered");
        const t = e.authToken;
        return 1 === (n = t).requestStatus && n.requestTime + 1e4 < Date.now() ? Object.assign(Object.assign({}, e), {
            authToken: {
                requestStatus: 0
            }
        }) : e;
        var n
    }))
}

function pe(e) {
    return void 0 !== e && 2 === e.registrationStatus
}
async function he(e, t = !1) {
    const n = e;
    await async function(e) {
        const {
            registrationPromise: t
        } = await oe(e);
        t && await t
    }(n);
    return (await de(n, t)).token
}

function ge(e) {
    return F.create("missing-app-config-values", {
        valueName: e
    })
}
const me = e => {
    const t = e.getProvider("app").getImmediate(),
        a = n(t, "installations").getImmediate();
    return {
        getId: () => async function(e) {
            const t = e,
                {
                    installationEntry: n,
                    registrationPromise: a
                } = await oe(t);
            return a ? a.catch(console.error) : de(t).catch(console.error), n.fid
        }(a),
        getToken: e => he(a, e)
    }
};
t(new I("installations", (e => {
    const t = e.getProvider("app").getImmediate(),
        a = function(e) {
            if (!e || !e.options) throw ge("App Configuration");
            if (!e.name) throw ge("App Name");
            const t = ["projectId", "apiKey", "appId"];
            for (const n of t)
                if (!e.options[n]) throw ge(n);
            return {
                appName: e.name,
                projectId: e.options.projectId,
                apiKey: e.options.apiKey,
                appId: e.options.appId
            }
        }(t);
    return {
        app: t,
        appConfig: a,
        heartbeatServiceProvider: n(t, "heartbeat"),
        _delete: () => Promise.resolve()
    }
}), "PUBLIC")), t(new I("installations-internal", me, "PRIVATE")), e(N, "0.6.3"), e(N, "0.6.3", "esm2017");
const we = "https://www.googletagmanager.com/gtag/js",
    ye = new class {
        constructor(e) {
            this.name = e, this._logLevel = o, this._logHandler = c, this._userLogHandler = null
        }
        get logLevel() {
            return this._logLevel
        }
        set logLevel(e) {
            if (!(e in i)) throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
            this._logLevel = e
        }
        setLogLevel(e) {
            this._logLevel = "string" == typeof e ? r[e] : e
        }
        get logHandler() {
            return this._logHandler
        }
        set logHandler(e) {
            if ("function" != typeof e) throw new TypeError("Value assigned to `logHandler` must be a function");
            this._logHandler = e
        }
        get userLogHandler() {
            return this._userLogHandler
        }
        set userLogHandler(e) {
            this._userLogHandler = e
        }
        debug(...e) {
            this._userLogHandler && this._userLogHandler(this, i.DEBUG, ...e), this._logHandler(this, i.DEBUG, ...e)
        }
        log(...e) {
            this._userLogHandler && this._userLogHandler(this, i.VERBOSE, ...e), this._logHandler(this, i.VERBOSE, ...e)
        }
        info(...e) {
            this._userLogHandler && this._userLogHandler(this, i.INFO, ...e), this._logHandler(this, i.INFO, ...e)
        }
        warn(...e) {
            this._userLogHandler && this._userLogHandler(this, i.WARN, ...e), this._logHandler(this, i.WARN, ...e)
        }
        error(...e) {
            this._userLogHandler && this._userLogHandler(this, i.ERROR, ...e), this._logHandler(this, i.ERROR, ...e)
        }
    }("@firebase/analytics");

function ve(e) {
    return Promise.all(e.map((e => e.catch((e => e)))))
}

function Ie(e, t, n, a) {
    return async function(i, r, o) {
        try {
            "event" === i ? await async function(e, t, n, a, i) {
                try {
                    let r = [];
                    if (i && i.send_to) {
                        let e = i.send_to;
                        Array.isArray(e) || (e = [e]);
                        const a = await ve(n);
                        for (const n of e) {
                            const e = a.find((e => e.measurementId === n)),
                                i = e && t[e.appId];
                            if (!i) {
                                r = [];
                                break
                            }
                            r.push(i)
                        }
                    }
                    0 === r.length && (r = Object.values(t)), await Promise.all(r), e("event", a, i || {})
                } catch (e) {
                    ye.error(e)
                }
            }(e, t, n, r, o) : "config" === i ? await async function(e, t, n, a, i, r) {
                const o = a[i];
                try {
                    if (o) await t[o];
                    else {
                        const e = (await ve(n)).find((e => e.measurementId === i));
                        e && await t[e.appId]
                    }
                } catch (e) {
                    ye.error(e)
                }
                e("config", i, r)
            }(e, t, n, a, r, o) : "consent" === i ? e("consent", "update", o) : e("set", r)
        } catch (e) {
            ye.error(e)
        }
    }
}
const be = new h("analytics", "Analytics", {
    "already-exists": "A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",
    "already-initialized": "initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.",
    "already-initialized-settings": "Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",
    "interop-component-reg-failed": "Firebase Analytics Interop Component failed to instantiate: {$reason}",
    "invalid-analytics-context": "Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",
    "indexeddb-unavailable": "IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",
    "fetch-throttle": "The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",
    "config-fetch-failed": "Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",
    "no-api-key": 'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',
    "no-app-id": 'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.'
});
const Ee = new class {
    constructor(e = {}, t = 1e3) {
        this.throttleMetadata = e, this.intervalMillis = t
    }
    getThrottleMetadata(e) {
        return this.throttleMetadata[e]
    }
    setThrottleMetadata(e, t) {
        this.throttleMetadata[e] = t
    }
    deleteThrottleMetadata(e) {
        delete this.throttleMetadata[e]
    }
};

function Te(e) {
    return new Headers({
        Accept: "application/json",
        "x-goog-api-key": e
    })
}
async function De(e, t = Ee, n) {
    const {
        appId: a,
        apiKey: i,
        measurementId: r
    } = e.options;
    if (!a) throw be.create("no-app-id");
    if (!i) {
        if (r) return {
            measurementId: r,
            appId: a
        };
        throw be.create("no-api-key")
    }
    const o = t.getThrottleMetadata(a) || {
            backoffCount: 0,
            throttleEndTimeMillis: Date.now()
        },
        s = new ke;
    return setTimeout((async () => {
        s.abort()
    }), void 0 !== n ? n : 6e4), Se({
        appId: a,
        apiKey: i,
        measurementId: r
    }, o, s, t)
}
async function Se(e, {
    throttleEndTimeMillis: t,
    backoffCount: n
}, a, i = Ee) {
    var r;
    const {
        appId: o,
        measurementId: s
    } = e;
    try {
        await
        function(e, t) {
            return new Promise(((n, a) => {
                const i = Math.max(t - Date.now(), 0),
                    r = setTimeout(n, i);
                e.addEventListener((() => {
                    clearTimeout(r), a(be.create("fetch-throttle", {
                        throttleEndTimeMillis: t
                    }))
                }))
            }))
        }(a, t)
    } catch (e) {
        if (s) return ye.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${null==e?void 0:e.message}]`), {
            appId: o,
            measurementId: s
        };
        throw e
    }
    try {
        const t = await async function(e) {
            var t;
            const {
                appId: n,
                apiKey: a
            } = e, i = {
                method: "GET",
                headers: Te(a)
            }, r = "https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}", n), o = await fetch(r, i);
            if (200 !== o.status && 304 !== o.status) {
                let e = "";
                try {
                    const n = await o.json();
                    (null === (t = n.error) || void 0 === t ? void 0 : t.message) && (e = n.error.message)
                } catch (e) {}
                throw be.create("config-fetch-failed", {
                    httpStatus: o.status,
                    responseMessage: e
                })
            }
            return o.json()
        }(e);
        return i.deleteThrottleMetadata(o), t
    } catch (t) {
        const c = t;
        if (! function(e) {
                if (!(e instanceof p && e.customData)) return !1;
                const t = Number(e.customData.httpStatus);
                return 429 === t || 500 === t || 503 === t || 504 === t
            }(c)) {
            if (i.deleteThrottleMetadata(o), s) return ye.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${null==c?void 0:c.message}]`), {
                appId: o,
                measurementId: s
            };
            throw t
        }
        const u = 503 === Number(null === (r = null == c ? void 0 : c.customData) || void 0 === r ? void 0 : r.httpStatus) ? y(n, i.intervalMillis, 30) : y(n, i.intervalMillis),
            l = {
                throttleEndTimeMillis: Date.now() + u,
                backoffCount: n + 1
            };
        return i.setThrottleMetadata(o, l), ye.debug(`Calling attemptFetch again in ${u} millis`), Se(e, l, a, i)
    }
}
class ke {
    constructor() {
        this.listeners = []
    }
    addEventListener(e) {
        this.listeners.push(e)
    }
    abort() {
        this.listeners.forEach((e => e()))
    }
}
let Ce, Le;

function je(e) {
    Le = e
}

function Oe(e) {
    Ce = e
}
async function $e(e, t, n, a, i, r, o) {
    var s;
    const c = De(e);
    c.then((t => {
        n[t.measurementId] = t.appId, e.options.measurementId && t.measurementId !== e.options.measurementId && ye.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)
    })).catch((e => ye.error(e))), t.push(c);
    const u = async function() {
            if (!l()) return ye.warn(be.create("indexeddb-unavailable", {
                errorInfo: "IndexedDB is not available in this environment."
            }).message), !1;
            try {
                await d()
            } catch (e) {
                return ye.warn(be.create("indexeddb-unavailable", {
                    errorInfo: null == e ? void 0 : e.toString()
                }).message), !1
            }
            return !0
        }().then((e => e ? a.getId() : void 0)),
        [f, p] = await Promise.all([c, u]);
    (function(e) {
        const t = window.document.getElementsByTagName("script");
        for (const n of Object.values(t))
            if (n.src && n.src.includes(we) && n.src.includes(e)) return n;
        return null
    })(r) || function(e, t) {
        const n = document.createElement("script");
        n.src = `${we}?l=${e}&id=${t}`, n.async = !0, document.head.appendChild(n)
    }(r, f.measurementId), Le && (i("consent", "default", Le), je(void 0)), i("js", new Date);
    const h = null !== (s = null == o ? void 0 : o.config) && void 0 !== s ? s : {};
    return h.origin = "firebase", h.update = !0, null != p && (h.firebase_id = p), i("config", f.measurementId, h), Ce && (i("set", Ce), Oe(void 0)), f.measurementId
}
class Pe {
    constructor(e) {
        this.app = e
    }
    _delete() {
        return delete Me[this.app.options.appId], Promise.resolve()
    }
}
let Me = {},
    _e = [];
const Ae = {};
let Be, Ne, Fe = "dataLayer",
    xe = "gtag",
    Re = !1;

function He(e) {
    if (Re) throw be.create("already-initialized");
    e.dataLayerName && (Fe = e.dataLayerName), e.gtagName && (xe = e.gtagName)
}

function qe(e, t, n) {
    ! function() {
        const e = [];
        if (u() && e.push("This is a browser extension environment."), f() || e.push("Cookies are not available."), e.length > 0) {
            const t = e.map(((e, t) => `(${t+1}) ${e}`)).join(" "),
                n = be.create("invalid-analytics-context", {
                    errorInfo: t
                });
            ye.warn(n.message)
        }
    }();
    const a = e.options.appId;
    if (!a) throw be.create("no-app-id");
    if (!e.options.apiKey) {
        if (!e.options.measurementId) throw be.create("no-api-key");
        ye.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`)
    }
    if (null != Me[a]) throw be.create("already-exists", {
        id: a
    });
    if (!Re) {
        ! function(e) {
            let t = [];
            Array.isArray(window[e]) ? t = window[e] : window[e] = t
        }(Fe);
        const {
            wrappedGtag: e,
            gtagCore: t
        } = function(e, t, n, a, i) {
            let r = function(...e) {
                window[a].push(arguments)
            };
            return window[i] && "function" == typeof window[i] && (r = window[i]), window[i] = Ie(r, e, t, n), {
                gtagCore: r,
                wrappedGtag: window[i]
            }
        }(Me, _e, Ae, Fe, xe);
        Ne = e, Be = t, Re = !0
    }
    Me[a] = $e(e, _e, Ae, t, Be, Fe, n);
    return new Pe(e)
}

function ze(e = a()) {
    e = v(e);
    const t = n(e, "analytics");
    return t.isInitialized() ? t.getImmediate() : Ve(e)
}

function Ve(e, t = {}) {
    const a = n(e, "analytics");
    if (a.isInitialized()) {
        const e = a.getImmediate();
        if (m(t, a.getOptions())) return e;
        throw be.create("already-initialized")
    }
    return a.initialize({
        options: t
    })
}
async function Ke() {
    if (u()) return !1;
    if (!f()) return !1;
    if (!l()) return !1;
    try {
        return await d()
    } catch (e) {
        return !1
    }
}

function We(e, t, n) {
    e = v(e), async function(e, t, n, a) {
        if (a && a.global) return e("set", {
            screen_name: n
        }), Promise.resolve();
        e("config", await t, {
            update: !0,
            screen_name: n
        })
    }(Ne, Me[e.app.options.appId], t, n).catch((e => ye.error(e)))
}

function Ge(e, t, n) {
    e = v(e), async function(e, t, n, a) {
        if (a && a.global) return e("set", {
            user_id: n
        }), Promise.resolve();
        e("config", await t, {
            update: !0,
            user_id: n
        })
    }(Ne, Me[e.app.options.appId], t, n).catch((e => ye.error(e)))
}

function Ue(e, t, n) {
    e = v(e), async function(e, t, n, a) {
        if (a && a.global) {
            const t = {};
            for (const e of Object.keys(n)) t[`user_properties.${e}`] = n[e];
            return e("set", t), Promise.resolve()
        }
        e("config", await t, {
            update: !0,
            user_properties: n
        })
    }(Ne, Me[e.app.options.appId], t, n).catch((e => ye.error(e)))
}

function Je(e, t) {
    e = v(e), async function(e, t) {
        const n = await e;
        window[`ga-disable-${n}`] = !t
    }(Me[e.app.options.appId], t).catch((e => ye.error(e)))
}

function Ye(e) {
    Ne ? Ne("set", e) : Oe(e)
}

function Ze(e, t, n, a) {
    e = v(e), async function(e, t, n, a, i) {
        if (i && i.global) e("event", n, a);
        else {
            const i = await t;
            e("event", n, Object.assign(Object.assign({}, a), {
                send_to: i
            }))
        }
    }(Ne, Me[e.app.options.appId], t, n, a).catch((e => ye.error(e)))
}

function Qe(e) {
    Ne ? Ne("consent", "update", e) : je(e)
}
const Xe = "@firebase/analytics";
t(new I("analytics", ((e, {
    options: t
}) => qe(e.getProvider("app").getImmediate(), e.getProvider("installations-internal").getImmediate(), t)), "PUBLIC")), t(new I("analytics-internal", (function(e) {
    try {
        const t = e.getProvider("analytics").getImmediate();
        return {
            logEvent: (e, n, a) => Ze(t, e, n, a)
        }
    } catch (e) {
        throw be.create("interop-component-reg-failed", {
            reason: e
        })
    }
}), "PRIVATE")), e(Xe, "0.9.3"), e(Xe, "0.9.3", "esm2017");
export {
    ze as getAnalytics, Ve as initializeAnalytics, Ke as isSupported, Ze as logEvent, Je as setAnalyticsCollectionEnabled, Qe as setConsent, We as setCurrentScreen, Ye as setDefaultEventParameters, Ge as setUserId, Ue as setUserProperties, He as settings
};

//# sourceMappingURL=firebase-analytics.js.map
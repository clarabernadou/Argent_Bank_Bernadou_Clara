/*
 * Mode démo d’Argent Bank.
 * L’API Node/Express/MongoDB du projet (http://localhost:3001/api/v1/user) est
 * simulée dans le navigateur : les comptes de départ sont ceux du script
 * populateDatabase.js et les modifications de profil restent dans le
 * localStorage du visiteur.
 */
(function () {
  'use strict';

  var API_URL = /^https?:\/\/localhost:3001\/api\/v1\/user\/([a-z]+)\/?$/;
  var USERS_KEY = 'argentbank_demo_users';
  var BANNER_KEY = 'argentbank_demo_banner';
  var ROOT = new URL('./', document.currentScript.src).href;
  var RESPONSE_DELAY = 150;
  var SEED_USERS = [
    { id: 'demo-tony', email: 'tony@stark.com', password: 'password123', firstName: 'Tony', lastName: 'Stark' },
    { id: 'demo-steve', email: 'steve@rogers.com', password: 'password456', firstName: 'Steve', lastName: 'Rogers' }
  ];
  var STATUS_TEXT = { 200: 'OK', 400: 'Bad Request', 401: 'Unauthorized', 404: 'Not Found', 500: 'Internal Server Error' };

  var nativeOpen = XMLHttpRequest.prototype.open;
  var nativeSend = XMLHttpRequest.prototype.send;
  var nativeSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
  var users = null;

  /* ---------- Outils ---------- */

  function readUsers() {
    try {
      var raw = window.localStorage.getItem(USERS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function saveUsers() {
    try {
      window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
      /* Stockage plein ou bloqué : les données restent en mémoire pour la session. */
    }
  }

  function sha256(text) {
    if (window.crypto && window.crypto.subtle && window.TextEncoder) {
      return window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(function (buffer) {
        return Array.prototype.map.call(new Uint8Array(buffer), function (byte) {
          return ('0' + byte.toString(16)).slice(-2);
        }).join('');
      });
    }
    return Promise.resolve('plain:' + text);
  }

  function ensureUsers() {
    if (users) {
      return Promise.resolve(users);
    }
    users = readUsers();
    if (users) {
      return Promise.resolve(users);
    }
    return Promise.all(SEED_USERS.map(function (seed) {
      return sha256(seed.email + ':' + seed.password).then(function (hash) {
        var now = new Date().toISOString();
        return { id: seed.id, email: seed.email, hash: hash, firstName: seed.firstName, lastName: seed.lastName, createdAt: now, updatedAt: now };
      });
    })).then(function (list) {
      users = list;
      saveUsers();
      return users;
    });
  }

  function reply(status, message, body) {
    var payload = { status: status, message: message };
    if (body !== undefined) {
      payload.body = body;
    }
    return { status: status, payload: payload };
  }

  function publicProfile(user) {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      id: user.id
    };
  }

  function parseBody(body) {
    try {
      return typeof body === 'string' ? JSON.parse(body) : {};
    } catch (error) {
      return {};
    }
  }

  function userFromToken(headers) {
    var match = /^Bearer demo\.(.+)$/.exec(headers.authorization || '');
    var id = match ? match[1] : null;
    return users.filter(function (user) { return user.id === id; })[0] || null;
  }

  /* ---------- Routes de l’API ---------- */

  function login(data) {
    var email = String(data.email || '').trim().toLowerCase();
    return sha256(email + ':' + String(data.password || '')).then(function (hash) {
      var user = users.filter(function (item) { return item.email === email; })[0];
      if (!user) {
        return reply(400, 'Error: User not found!');
      }
      if (user.hash !== hash) {
        return reply(400, 'Error: Password is invalid');
      }
      return reply(200, 'User successfully logged in', { token: 'demo.' + user.id });
    });
  }

  function signup(data) {
    var email = String(data.email || '').trim().toLowerCase();
    if (!email || !data.password) {
      return Promise.resolve(reply(400, 'Error: Email and password are required'));
    }
    if (users.some(function (item) { return item.email === email; })) {
      return Promise.resolve(reply(400, 'Error: Email already exists'));
    }
    return sha256(email + ':' + String(data.password)).then(function (hash) {
      var now = new Date().toISOString();
      var user = {
        id: 'demo-' + Math.random().toString(16).slice(2, 10),
        email: email,
        hash: hash,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        createdAt: now,
        updatedAt: now
      };
      users.push(user);
      saveUsers();
      return reply(200, 'User successfully created', { _id: user.id, email: user.email });
    });
  }

  function profile(method, headers, data) {
    var user = userFromToken(headers);
    if (!user) {
      return Promise.resolve(reply(401, 'Error: Token invalid'));
    }
    if (method === 'PUT') {
      if (typeof data.firstName === 'string') {
        user.firstName = data.firstName;
      }
      if (typeof data.lastName === 'string') {
        user.lastName = data.lastName;
      }
      user.updatedAt = new Date().toISOString();
      saveUsers();
      return Promise.resolve(reply(200, 'Successfully updated user profile data', publicProfile(user)));
    }
    return Promise.resolve(reply(200, 'Successfully got user profile data', publicProfile(user)));
  }

  function route(method, action, headers, body) {
    var data = parseBody(body);
    return ensureUsers().then(function () {
      if (action === 'login' && method === 'POST') {
        return login(data);
      }
      if (action === 'signup' && method === 'POST') {
        return signup(data);
      }
      if (action === 'profile' && (method === 'POST' || method === 'PUT')) {
        return profile(method, headers, data);
      }
      return reply(404, 'Error: Route not found');
    });
  }

  /* ---------- Interception des requêtes XMLHttpRequest (axios) ---------- */

  function finish(xhr, url, result) {
    var text = JSON.stringify(result.payload);
    var fields = {
      readyState: 4,
      status: result.status,
      statusText: STATUS_TEXT[result.status] || '',
      responseURL: url,
      responseText: text,
      response: xhr.responseType === 'json' ? JSON.parse(text) : text
    };
    Object.keys(fields).forEach(function (key) {
      Object.defineProperty(xhr, key, { value: fields[key], configurable: true });
    });
    xhr.getAllResponseHeaders = function () { return 'content-type: application/json; charset=utf-8\r\n'; };
    xhr.getResponseHeader = function (name) { return /^content-type$/i.test(name) ? 'application/json; charset=utf-8' : null; };
    xhr.dispatchEvent(new Event('readystatechange'));
    xhr.dispatchEvent(new ProgressEvent('load'));
    xhr.dispatchEvent(new ProgressEvent('loadend'));
  }

  XMLHttpRequest.prototype.open = function (method, url) {
    var match = API_URL.exec(String(url));
    this.__demo = match ? { method: String(method).toUpperCase(), url: String(url), action: match[1], headers: {} } : null;
    if (this.__demo) {
      return nativeOpen.call(this, method, window.location.href);
    }
    return nativeOpen.apply(this, arguments);
  };

  XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
    if (this.__demo) {
      this.__demo.headers[String(name).toLowerCase()] = String(value);
    }
    return nativeSetRequestHeader.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function (body) {
    var demo = this.__demo;
    if (!demo) {
      return nativeSend.apply(this, arguments);
    }
    var xhr = this;
    route(demo.method, demo.action, demo.headers, body)
      .catch(function () { return reply(500, 'Error: Demo API failure'); })
      .then(function (result) {
        window.setTimeout(function () { finish(xhr, demo.url, result); }, RESPONSE_DELAY);
      });
  };

  /* ---------- Bandeau d’information ---------- */

  function showBanner() {
    try {
      if (window.sessionStorage.getItem(BANNER_KEY) === 'closed') {
        return;
      }
    } catch (error) { /* sessionStorage indisponible */ }
    var banner = document.createElement('div');
    banner.setAttribute('role', 'note');
    banner.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:99999;max-width:340px;padding:10px 12px;' +
      'border-radius:10px;background:#1f2933;color:#fff;font:13px/1.45 Arial,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.35)';
    banner.innerHTML = '<strong>Mode démo</strong> : l’API est simulée dans votre navigateur ' +
      '(les données restent sur votre appareil).<br>Comptes test :<br>' +
      '<code style="color:#ffd1b0">tony@stark.com</code> / <code style="color:#ffd1b0">password123</code><br>' +
      '<code style="color:#ffd1b0">steve@rogers.com</code> / <code style="color:#ffd1b0">password456</code><br>' +
      '<a href="#" data-reset style="color:#ffb27a">Réinitialiser la démo</a> · <a href="#" data-close style="color:#ffb27a">Fermer</a>';
    banner.querySelector('[data-close]').addEventListener('click', function (event) {
      event.preventDefault();
      try { window.sessionStorage.setItem(BANNER_KEY, 'closed'); } catch (error) { /* ignoré */ }
      banner.remove();
    });
    banner.querySelector('[data-reset]').addEventListener('click', function (event) {
      event.preventDefault();
      try {
        window.localStorage.removeItem(USERS_KEY);
        window.localStorage.removeItem('token');
        window.sessionStorage.removeItem('token');
      } catch (error) { /* ignoré */ }
      window.location.href = ROOT;
    });
    document.body.appendChild(banner);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }
})();

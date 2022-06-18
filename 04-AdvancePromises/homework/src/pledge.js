'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {
    if(typeof executor !== 'function'){
        throw TypeError('executor is not a function');
    }

    this._state = 'pending'
    this._value = undefined
    this._handlerGroups = []
    executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function(data){
    if(this._state === 'pending'){
        this._value = data;
        this._state = 'fulfilled';
        this._callHandlers();
    }
};

$Promise.prototype._internalReject = function(reason){
    if(this._state === 'pending'){
        this._value = reason;
        this._state = 'rejected';
        this._callHandlers();
    }
};

$Promise.prototype.then = function(successCb, errorCb){
    if(typeof successCb !== 'function') successCb = false;
    if(typeof errorCb !== 'function') errorCb = false;

    const downstreamPromise = new $Promise(() =>{});

    this._handlerGroups.push({successCb , errorCb, downstreamPromise});
    if(this._state !== 'pending') this._callHandlers();
    return downstreamPromise;
};

$Promise.prototype._callHandlers = function(){
    while (this._handlerGroups.length > 0) {
        let cb = this._handlerGroups.shift();
        if (this._state === 'fulfilled') {
            //cb.successCb && cb.successCb(this._value);
           if(!cb.successCb){
                cb.downstreamPromise._internalResolve(this._value);
            }else{
                try{
                const result = cb.successCb(this._value);

                if(result instanceof $Promise){
                    result.then(value => cb.downstreamPromise._internalResolve(value), err => cb.downstreamPromise._internalReject(err));
                }else{
                    cb.downstreamPromise._internalResolve(result);
                }
            }catch(err){
                cb.downstreamPromise._internalReject(err);
            }
            }
        }
        else if (this._state === 'rejected') {
            //cb.errorCb && cb.errorCb(this._value);
            if(!cb.errorCb){
                cb.downstreamPromise._internalReject(this._value);
            }else{
                try{
                    const result = cb.errorCb(this._value);

                    if(result instanceof $Promise){
                        result.then(value => cb.downstreamPromise._internalResolve(value), err => cb.downstreamPromise._internalReject(err));
                    }else{
                        cb.downstreamPromise._internalResolve(result);
                    }
                }catch(err){
                    cb.downstreamPromise._internalReject(err);
                }
                
            }
        }
    }
};

$Promise.prototype.catch = function(e) {
    return this.then(null, e);
};

$Promise.prototype.resolve = function(){
    
}

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/

var Pan3d;
(function (Pan3d) {
    var Dictionary = /** @class */ (function () {
        function Dictionary(init) {
            this._keys = new Array;
            this._values = new Array;
            for (var x = 0; init && x < init.length; x++) {
                this[init[x].key] = init[x].value;
                this._keys.push(init[x].key);
                this._values.push(init[x].value);
            }
        }
        Dictionary.prototype.add = function (key, value) {
            this[key] = value;
            this._keys.push(key);
            this._values.push(value);
        };
        Dictionary.prototype.has = function (key) {
            if (this[key]) {
                return true;
            }
            else {
                return false;
            }
        };
        Dictionary.prototype.remove = function (key) {
            var index = this._keys.indexOf(key, 0);
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            delete this[key];
        };
        Dictionary.prototype.keys = function () {
            return this._keys;
        };
        Dictionary.prototype.values = function () {
            return this._values;
        };
        Dictionary.prototype.containsKey = function (key) {
            if (typeof this[key] === "undefined") {
                return false;
            }
            return true;
        };
        Dictionary.prototype.toLookup = function () {
            return this;
        };
        return Dictionary;
    }());
    Pan3d.Dictionary = Dictionary;
    var WeakSet = /** @class */ (function () {
        function WeakSet() {
            this._item = new Array;
        }
        WeakSet.prototype.add = function ($data) {
            this._item.push($data);
        };
        WeakSet.prototype.has = function ($data) {
            for (var i = 0; i < this._item.length; i++) {
                if (this._item[i] == $data) {
                    return true;
                }
            }
            return false;
        };
        return WeakSet;
    }());
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Dictionary.js.map
/**
* 页面加载效果
*/
var game;
(function (game) {
    var gui;
    (function (gui) {
        var component;
        (function (component) {
            var LoadEffect = /** @class */ (function () {
                function LoadEffect(parent) {
                    // 是否在顶层 只显示顶层的加载效果
                    this._isTop = false;
                    this._parent = parent;
                    this._createdTimer = Laya.timer.currTimer;
                    Laya.timer.frameLoop(1, this, this.update);
                    LoadEffect.add(this);
                }
                LoadEffect.add = function (v) {
                    for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                        var effect = _a[_i];
                        effect.isTop = false;
                    }
                    v.isTop = true;
                    this._list.push(v);
                };
                LoadEffect.remove = function (v) {
                    var idx = this._list.indexOf(v);
                    if (idx != -1) {
                        this._list.splice(idx, 1);
                    }
                    var count = this._list.length;
                    if (count > 0 && v.isTop) {
                        this._list[count - 1].isTop = true;
                    }
                };
                Object.defineProperty(LoadEffect.prototype, "isTop", {
                    set: function (v) {
                        this._isTop = v;
                        this._view && (this._view.visible = v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoadEffect.prototype, "width", {
                    set: function (v) {
                        this._clientWidth = v;
                        Laya.timer.callLater(this, this.layout);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoadEffect.prototype, "height", {
                    set: function (v) {
                        this._clientHeight = v;
                        Laya.timer.callLater(this, this.layout);
                    },
                    enumerable: true,
                    configurable: true
                });
                LoadEffect.prototype.layout = function () {
                    if (this._view) {
                        this._view.width = this._clientWidth;
                        this._view.height = this._clientHeight;
                    }
                };
                LoadEffect.prototype.initView = function () {
                };
                LoadEffect.prototype.update = function () {
                    // let timer:number = Laya.timer.currTimer - this._createdTimer;
                    // if(timer > 1000){
                    // 	if(!this._view){
                    // 		this.initView();
                    // 	}
                    // 	if(timer > 6000){
                    // 		this._view.tips.visible = true;
                    // 		Laya.timer.clear(this, this.update);
                    // 	}
                    // }
                };
                LoadEffect.prototype.destroy = function () {
                    LoadEffect.remove(this);
                    this._parent = null;
                    if (this._view) {
                        this._view.destroy();
                        this._view = null;
                    }
                    Laya.timer.clearAll(this);
                };
                LoadEffect._list = [];
                return LoadEffect;
            }());
            component.LoadEffect = LoadEffect;
        })(component = gui.component || (gui.component = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=LoadEffect.js.map
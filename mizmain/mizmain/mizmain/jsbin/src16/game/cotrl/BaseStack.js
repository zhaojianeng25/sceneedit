/**
* 基础栈
*/
var game;
(function (game) {
    var cotrl;
    (function (cotrl) {
        var BaseStack = /** @class */ (function () {
            function BaseStack(app) {
                this._isFinalize = false;
                this._app = app;
                this._sceneObjectMgr = this._app.sceneObjectMgr;
                this._controller = this._app.aCotrller;
            }
            BaseStack.prototype.doReady = function () {
            };
            Object.defineProperty(BaseStack.prototype, "isFinalize", {
                /**
                 * 是否已经释放
                 */
                get: function () {
                    return this._isFinalize;
                },
                enumerable: true,
                configurable: true
            });
            BaseStack.prototype.finalize = function () {
                if (this._isFinalize)
                    return;
                this._isFinalize = true;
            };
            BaseStack.prototype.initialize = function () {
                return true;
            };
            /**
             * 插入新栈
             * @param controller
             * @param newStack
             * @return			 是否成功插入
             */
            BaseStack.prototype.stack = function (controller, newStack) {
                return controller.stack(newStack);
            };
            BaseStack.prototype.update = function (diff) {
                return this._isFinalize;
            };
            return BaseStack;
        }());
        cotrl.BaseStack = BaseStack;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=BaseStack.js.map
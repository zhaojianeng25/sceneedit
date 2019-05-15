var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var battle;
(function (battle_1) {
    var BaseAction = /** @class */ (function () {
        function BaseAction(battle) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this.battle = battle;
            this.is_start = false;
            this._base_delay = 0;
            this.onInit.apply(this, args);
        }
        BaseAction.prototype.isEnd = function () { return this.is_start; };
        BaseAction.prototype.logic = function (delay) {
            if (this._base_delay > 0) {
                this._base_delay -= delay;
                return;
            }
            if (!this.is_start) {
                this.is_start = true;
                this.onStart();
            }
            if (this._base_delay > 0) {
                this._base_delay -= delay;
                return;
            }
            this.onLogic(delay);
        };
        BaseAction.prototype.onDestroy = function () { };
        BaseAction.prototype.onInit = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        BaseAction.prototype.onStart = function () { };
        BaseAction.prototype.onLogic = function (delay) { };
        BaseAction.prototype.setDelayTicks = function (delay) {
            this._base_delay += delay;
        };
        return BaseAction;
    }());
    battle_1.BaseAction = BaseAction;
    var ActionMgr = /** @class */ (function (_super) {
        __extends(ActionMgr, _super);
        function ActionMgr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActionMgr.prototype.onInit = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._actions = [];
            this._queue = [];
        };
        ActionMgr.prototype.add = function () {
            var actions = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                actions[_i] = arguments[_i];
            }
            var _a;
            (_a = this._actions).push.apply(_a, actions);
        };
        ActionMgr.prototype.addQueue = function () {
            var actions = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                actions[_i] = arguments[_i];
            }
            this._queue.push(actions);
        };
        ActionMgr.prototype.remove = function (action) {
            var exist = false;
            for (var i = 0; i < this._actions.length; i++) {
                var tem = this._actions[i];
                if (tem === action) {
                    exist = true;
                    tem.onDestroy();
                    this._actions.splice(i, 1);
                    break;
                }
            }
            if (exist) {
                return;
            }
            for (var index = 0; index < this._queue.length; index++) {
                var actions = this._queue[index];
                exist = false;
                for (var i = 0; i < actions.length; i++) {
                    var tem = actions[i];
                    if (tem === action) {
                        exist = true;
                        tem.onDestroy();
                        actions.splice(i, 1);
                        break;
                    }
                }
                if (actions.length === 0) {
                    this._queue.splice(index, 1);
                }
                if (exist) {
                    break;
                }
            }
        };
        ActionMgr.prototype.cleanAll = function () {
            this._queue.splice(0, this._queue.length);
        };
        ActionMgr.prototype.isEnd = function () {
            return this._actions.length === 0 && this._queue.length === 0;
        };
        ActionMgr.prototype.onLogic = function (delay) {
            this._runActions(this._actions, delay);
            if (this._queue.length === 0) {
                return;
            }
            var actions = this._queue[0];
            this._runActions(actions, delay);
            if (actions.length === 0) {
                this._queue.shift();
            }
        };
        ActionMgr.prototype._runActions = function (actions, delay) {
            var remove_list = [];
            for (var i = 0; i < actions.length; i++) {
                var element = actions[i];
                element.logic(delay);
                if (element.isEnd()) {
                    element.onDestroy();
                    remove_list.push(i);
                }
            }
            for (var i = remove_list.length - 1; i >= 0; i--) {
                var index = remove_list[i];
                actions.splice(index, 1);
            }
        };
        return ActionMgr;
    }(BaseAction));
    battle_1.ActionMgr = ActionMgr;
})(battle || (battle = {}));
//# sourceMappingURL=ActionMgr.js.map
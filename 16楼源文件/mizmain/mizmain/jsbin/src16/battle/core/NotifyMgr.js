var battle;
(function (battle) {
    /**
    * 通知管理类
    */
    var NotifyMgr = /** @class */ (function () {
        function NotifyMgr() {
        }
        NotifyMgr.register = function (type, caller, method, args, once) {
            if (once === void 0) { once = false; }
            var handler = laya.utils.Handler.create(caller, method, args, once);
            if (!handler) {
                return;
            }
            var handlers = NotifyMgr._notify_map[type];
            if (handlers) {
                handlers.push(handler);
            }
            else {
                NotifyMgr._notify_map[type] = [handler];
            }
        };
        NotifyMgr.remove = function (type, caller, method) {
            var handlers = NotifyMgr._notify_map[type];
            if (!handlers) {
                return;
            }
            for (var index = handlers.length - 1; index >= 0; index--) {
                var handler = handlers[index];
                if (!handler
                    || (method && caller && handler.caller === caller && handler.method === method)
                    || (caller && handler.caller === caller)
                    || (method && handler.method === method)) {
                    handlers.splice(index, 1);
                }
            }
            if (handlers.length === 0) {
                delete NotifyMgr._notify_map[type];
            }
        };
        NotifyMgr.clean = function (caller) {
            var notify_map = NotifyMgr._notify_map;
            for (var key in notify_map) {
                if (notify_map.hasOwnProperty(key)) {
                    var handlers = notify_map[key];
                    for (var index = handlers.length - 1; index >= 0; index--) {
                        var handler = handlers[index];
                        if (handler && handler.caller === caller) {
                            handler.recover();
                            handlers.splice(index, 1);
                        }
                    }
                    if (handlers.length === 0) {
                        delete notify_map[key];
                    }
                }
            }
        };
        NotifyMgr.notify = function (type) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var handlers = NotifyMgr._notify_map[type];
            if (!handlers) {
                return;
            }
            for (var index = handlers.length - 1; index >= 0; index--) {
                var handler = handlers[index];
                if (!handler) {
                    handlers.splice(index, 1);
                    continue;
                }
                handler.runWith(args);
                if (handler.once) {
                    handlers.splice(index, 1);
                    handler.recover();
                }
            }
            if (handlers.length === 0) {
                delete NotifyMgr._notify_map[type];
            }
        };
        NotifyMgr._notify_map = {};
        return NotifyMgr;
    }());
    battle.NotifyMgr = NotifyMgr;
})(battle || (battle = {}));
//# sourceMappingURL=NotifyMgr.js.map
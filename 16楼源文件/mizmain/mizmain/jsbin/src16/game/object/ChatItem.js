var game;
(function (game) {
    var object;
    (function (object) {
        var ChatItem = /** @class */ (function () {
            function ChatItem(guid, name, type, sex, head, frame, vip, isYueKa, content, time) {
                this._guid = guid;
                this._name = name;
                this._type = type;
                this._sex = sex;
                this._head = head;
                this._frame = frame;
                this._vip = vip;
                this._isYueKa = isYueKa;
                //把尖括号过滤掉 且不是弹窗
                if (content && type != object.GlobalDef.CHAT_TYPE_POPUP && type != object.GlobalDef.CHAT_TYPE_SYSTEM) {
                    content = content.replace(new RegExp(">", "gm"), "");
                    content = content.replace(new RegExp("<", "gm"), "");
                }
                this._content = content;
                this._time = time;
            }
            //得到时间字符串
            ChatItem.prototype.getTimeStr = function (time) {
                var date = new Date(time * 1000);
                return this.checkTime(date.getHours()) + ":" + this.checkTime(date.getMinutes());
            };
            //格式化时间
            ChatItem.prototype.checkTime = function (num) {
                if (num < 0)
                    return "0";
                if (num < 10) {
                    return "0" + num;
                }
                else {
                    return num.toString();
                }
            };
            Object.defineProperty(ChatItem.prototype, "guid", {
                get: function () {
                    return this._guid;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ChatItem.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ChatItem.prototype, "type", {
                get: function () {
                    return this._type;
                },
                set: function (value) {
                    this._type = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ChatItem.prototype, "sex", {
                get: function () {
                    return this._sex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ChatItem.prototype, "head", {
                get: function () {
                    return this._head;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ChatItem.prototype, "frame", {
                get: function () {
                    return this._frame;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ChatItem.prototype, "vip", {
                get: function () {
                    return this._vip;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ChatItem.prototype, "isYueKa", {
                get: function () {
                    return this._isYueKa;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ChatItem.prototype, "content", {
                get: function () {
                    return this._content;
                },
                set: function (value) {
                    this._content = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ChatItem.prototype, "time", {
                get: function () {
                    return this._time;
                },
                enumerable: true,
                configurable: true
            });
            return ChatItem;
        }());
        object.ChatItem = ChatItem;
    })(object = game.object || (game.object = {}));
})(game || (game = {}));
//# sourceMappingURL=ChatItem.js.map
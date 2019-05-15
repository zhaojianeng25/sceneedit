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
/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var ModuleEvent = /** @class */ (function (_super) {
            __extends(ModuleEvent, _super);
            function ModuleEvent(type, data) {
                if (data === void 0) { data = null; }
                var _this = _super.call(this) || this;
                _super.prototype.setTo.call(_this, type, null, null);
                _this.data = data;
                return _this;
            }
            ModuleEvent.SHOW = "SHOW";
            ModuleEvent.HIDE = "HIDE";
            ModuleEvent.SWAP = "SWAP";
            ModuleEvent.FLUSH_DATA = "FLUSH_DATA";
            ModuleEvent.JUMP = "JUMP";
            ModuleEvent.IS_OPEN = "ISOPEN";
            return ModuleEvent;
        }(Laya.Event));
        modules.ModuleEvent = ModuleEvent;
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ModuleEvent.js.map
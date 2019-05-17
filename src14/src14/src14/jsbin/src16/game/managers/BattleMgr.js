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
var game;
(function (game) {
    var managers;
    (function (managers) {
        /**
         * 客户端战斗管理器,主要战斗数据管理
         * name 王谦
         */
        var BattleMgr = /** @class */ (function (_super) {
            __extends(BattleMgr, _super);
            function BattleMgr() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BattleMgr;
        }(Laya.EventDispatcher));
        managers.BattleMgr = BattleMgr;
    })(managers = game.managers || (game.managers = {}));
})(game || (game = {}));
//# sourceMappingURL=BattleMgr.js.map
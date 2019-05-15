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
        var ModuleMediator = /** @class */ (function (_super) {
            __extends(ModuleMediator, _super);
            function ModuleMediator() {
                var _this = _super.call(this, null) || this;
                _this.on(modules.ModuleEvent.SHOW, _this, _this.onShow);
                _this.on(modules.ModuleEvent.HIDE, _this, _this.onHide);
                _this.on(modules.ModuleEvent.SWAP, _this, _this.onSwap);
                _this.on(modules.ModuleEvent.JUMP, _this, _this.onJump);
                _this.on(modules.ModuleEvent.FLUSH_DATA, _this, _this.onFlushData);
                return _this;
            }
            /*public ModuleMediator() {
                super(null);
                this.on(ModuleEvent.SHOW, this, this.onShow);
                this.on(ModuleEvent.HIDE, this, this.onHide);
                this.on(ModuleEvent.SWAP, this, this.onSwap);
                this.on(ModuleEvent.JUMP, this, this.onJump);
                this.on(ModuleEvent.FLUSH_DATA, this, this.onFlushData);
            }*/
            ModuleMediator.prototype.onFlushData = function (event) {
                this.flushData();
            };
            ModuleMediator.prototype.onSwap = function (event) {
                this.swap();
            };
            ModuleMediator.prototype.onHide = function (event) {
                this.hide();
            };
            ModuleMediator.prototype.onShow = function (event) {
                this.show();
            };
            ModuleMediator.prototype.onJump = function (event) {
                this.jumpPage(event);
            };
            ModuleMediator.prototype.jumpPage = function (index) {
                this.show();
            };
            return ModuleMediator;
        }(modules.UiMediator));
        modules.ModuleMediator = ModuleMediator;
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ModuleMediator.js.map
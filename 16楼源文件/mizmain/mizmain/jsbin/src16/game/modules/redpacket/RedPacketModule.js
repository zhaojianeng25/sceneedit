/**
* 红包模板
*/
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
    var modules;
    (function (modules) {
        var redPacket;
        (function (redPacket) {
            var RedPacketModule = /** @class */ (function (_super) {
                __extends(RedPacketModule, _super);
                function RedPacketModule(app) {
                    var _this = _super.call(this) || this;
                    /** 判断是否玩家有发新的红包 */
                    _this._isSendNewRedPack = false;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.RedPacketUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._redPacketMediator = new redPacket.RedPacketMediator(app);
                    _this._redPacketRecordMediator = new redPacket.RedPacketRecordMediator(app);
                    _this.network();
                    return _this;
                }
                RedPacketModule.prototype.onShow = function (event) {
                    this._redPacketMediator.show();
                    this._app.uiRoot.closeLoadProgress();
                };
                RedPacketModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                RedPacketModule.prototype.getView = function () {
                    return this._viewUI;
                };
                RedPacketModule.prototype.network = function () {
                    //Network._instance.addHanlder(ProtocolsEnum.SSendRedPackView, this, this.onOpArchi_1);			
                    redPacket.models.RedPacketProxy.getInstance().on(redPacket.models.NOTICE_REPACK_EVENT, this, this.onShowImage);
                };
                // private onOpArchi_1(optcode:number, msg:hanlder.S2C_SSendRedPackView):void{
                //     console.log("RedPacketModule--监听到服务端下发的红包数据...开始刷新数据...");
                // 	if( !msg.redpackinfolist || msg.redpackinfolist.length == 0) return;
                // 	this._redPacketMediator.refreshData_1();
                // }
                /**
                 * 显示红包图标
                 */
                RedPacketModule.prototype.onShowImage = function (roleName, redpackid, modeltype) {
                    if (!roleName)
                        return;
                    this._appearRedPackMediator = new modules.commonUI.AppearRedPackMediator(this._app);
                    this._appearRedPackMediator.onShow(roleName, redpackid, modeltype);
                };
                return RedPacketModule;
            }(game.modules.ModuleMediator));
            redPacket.RedPacketModule = RedPacketModule;
        })(redPacket = modules.redPacket || (modules.redPacket = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RedPacketModule.js.map
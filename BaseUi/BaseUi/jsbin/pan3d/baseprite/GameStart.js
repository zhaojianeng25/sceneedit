var Pan3d;
(function (Pan3d) {
    var me;
    (function (me) {
        var GameStart = /** @class */ (function () {
            function GameStart() {
                this.dataReady = false;
                this.uiReadyNum = 0;
                this.uiAllNum = 0;
            }
            GameStart.prototype.init = function () {
                var _this = this;
                me.TextureManager.getInstance().getTexture(me.Scene_data.fileRoot + "ui/load/001.jpg", function ($texture) {
                });
                if (GameStart.outNet) {
                    GameStart.GM = false;
                }
                var $baseUiList = new Array;
                $baseUiList.push({ xmlurl: "ui/arpgui/textlist.txt", picurl: "ui/arpgui/textlist.png", name: me.UIData.textlist });
                $baseUiList.push({ xmlurl: "ui/uidata/public/public.txt", picurl: "ui/uidata/public/public.png", name: me.UIData.publicUi });
                this.uiAllNum = me.UIData.init($baseUiList, function () {
                    _this.loadAll();
                }, function (num) {
                    _this.uiReadyNum = num;
                    if (_this.dataReady) {
                        me.FpsStage.getInstance().showLoadInfo("读取UI数据：" + _this.uiReadyNum + "/" + _this.uiAllNum);
                    }
                });
            };
            GameStart.prototype.loadAll = function () {
                if (this.uiReadyNum == this.uiAllNum && this.dataReady) {
                    this.loadDataComplet();
                    me.FpsStage.getInstance().showLoadInfo("正在连接服务器");
                    GameStart.ready = true;
                }
            };
            GameStart.prototype.loadDataComplet = function () {
                if (GameStart.outNet) {
                    GameStart.GM = false;
                }
            };
            /**是否是外网 */
            GameStart.outNet = false;
            GameStart.GM = true;
            GameStart.ready = false;
            GameStart.appVersion = 0;
            return GameStart;
        }());
        me.GameStart = GameStart;
    })(me = Pan3d.me || (Pan3d.me = {}));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=GameStart.js.map
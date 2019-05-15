var game;
(function (game) {
    var modules;
    (function (modules) {
        var huoban;
        (function (huoban) {
            var models;
            (function (models) {
                /** 伙伴系统相关数据存储 HuoBanModel */
                var HuoBanModel = /** @class */ (function () {
                    function HuoBanModel() {
                        /**伙伴阵容*/
                        this.huobaninfo = [];
                        /**伙伴信息配置表 */
                        this.cheroBaseInfoData = {};
                        /**伙伴技能表*/
                        this.friendSkillData = {};
                        /**光环*/
                        this.FormationbaseConfigData = {};
                        /**光环克制*/
                        this.FormationRestrainData = {};
                        /**光环效果图*/
                        this.ZhenFaEffectData = {};
                        /**出战的阵容*/
                        this.zrhuobanlist = [];
                        /**当阵容为空时可作为临时存储*/
                        this.currentzf = [];
                        /** 用来判断是否从阵法光环界面跳转到商会界面 */
                        this.is_frome_ZFGH_to_SH = false;
                        HuoBanModel._instance = this;
                        this.huobaninfo = new Array();
                        this.zrhuobanlist = new Array();
                        this.currentzf = [-1, -1, -1];
                        this.currentzr = -1;
                    }
                    HuoBanModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new HuoBanModel();
                        }
                        return this._instance;
                    };
                    HuoBanModel.clearModelData = function () {
                        huoban.models.HuoBanModel._instance.huobaninfo = new Array();
                        huoban.models.HuoBanModel._instance.zhenrongid = 0;
                        huoban.models.HuoBanModel._instance.zrhuobanlist = new Array();
                        huoban.models.HuoBanModel._instance.currentzrid = 0;
                        huoban.models.HuoBanModel._instance.reason = 0;
                        huoban.models.HuoBanModel._instance.huobandetail = new models.HuoBanDetailVo();
                        huoban.models.HuoBanModel._instance.currentzf = [-1, -1, -1];
                        huoban.models.HuoBanModel._instance.currentzr = -1;
                        huoban.models.HuoBanModel._instance.zhenfaui = 0;
                        huoban.models.HuoBanModel._instance.is_frome_ZFGH_to_SH = false;
                    };
                    return HuoBanModel;
                }());
                models.HuoBanModel = HuoBanModel;
            })(models = huoban.models || (huoban.models = {}));
        })(huoban = modules.huoban || (modules.huoban = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=HuoBanModel.js.map
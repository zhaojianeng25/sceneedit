/**
* 自动挂机
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var autohangup;
        (function (autohangup) {
            var models;
            (function (models) {
                var AutoHangUpModel = /** @class */ (function () {
                    function AutoHangUpModel() {
                        this.notaketimer = 0;
                        this.ismove = 0;
                        this.autotask = 0;
                        this.istaskwalk = 0;
                        this.isstar = 1;
                        AutoHangUpModel._instance = this;
                    }
                    AutoHangUpModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new AutoHangUpModel();
                        }
                        return this._instance;
                    };
                    AutoHangUpModel.clearModelData = function () {
                        autohangup.models.AutoHangUpModel._instance.notaketimer = 0;
                        autohangup.models.AutoHangUpModel._instance.ismove = 0;
                        autohangup.models.AutoHangUpModel._instance.autotask = 0;
                        autohangup.models.AutoHangUpModel._instance.istaskwalk = 0;
                        autohangup.models.AutoHangUpModel._instance.isstar = 1;
                        autohangup.models.AutoHangUpModel._instance.tasktype = 0;
                    };
                    return AutoHangUpModel;
                }());
                models.AutoHangUpModel = AutoHangUpModel;
            })(models = autohangup.models || (autohangup.models = {}));
        })(autohangup = modules.autohangup || (modules.autohangup = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=AutoHangUpModel.js.map
var Pan3d;
(function (Pan3d) {
    var me;
    (function (me) {
        var IconManager = /** @class */ (function () {
            function IconManager() {
                this._dic = new Object;
                this._loadDic = new Object;
            }
            IconManager.getInstance = function () {
                if (!this._instance) {
                    this._instance = new IconManager();
                }
                return this._instance;
            };
            return IconManager;
        }());
        me.IconManager = IconManager;
    })(me = Pan3d.me || (Pan3d.me = {}));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=IconManager.js.map
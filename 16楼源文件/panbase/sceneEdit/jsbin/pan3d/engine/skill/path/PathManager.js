var Pan3d;
(function (Pan3d) {
    var me;
    (function (me) {
        var PathManager = /** @class */ (function () {
            function PathManager() {
            }
            PathManager.reg = function (types, cls) {
                this.dic[types] = cls;
            };
            PathManager.getNewPath = function (types) {
                var cls = this.dic[types];
                return new cls();
            };
            PathManager.init = function () {
                this.dic[0] = me.SkillPath;
                this.dic[1] = me.SkillSinPath;
                this.dic[2] = me.SkillCosPath;
            };
            PathManager.dic = new Object;
            return PathManager;
        }());
        me.PathManager = PathManager;
    })(me = Pan3d.me || (Pan3d.me = {}));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=PathManager.js.map
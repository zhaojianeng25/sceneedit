/*
* name;
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var MapCreature = /** @class */ (function () {
            function MapCreature() {
                /**
                 *脚本
                 */
                this.scriptName = "";
                /**
                 *线路
                 */
                this.lineId = 0;
                /**
                 * 别名
                 */
                this.aliasName = "";
            }
            /**
             * 是否同一群生物
             * @param data
             * @return
             */
            MapCreature.prototype.isSimilar = function (data) {
                if (!data)
                    return false;
                if (data.id != this.id)
                    return false;
                if (data.count != this.count)
                    return false;
                if (data.respawnTime != this.respawnTime)
                    return false;
                if (data.spawnType != this.spawnType)
                    return false;
                if (data.spawnTime1 != this.spawnTime1)
                    return false;
                if (data.spawnTime2 != this.spawnTime2)
                    return false;
                if (data.spawnTime3 != this.spawnTime3)
                    return false;
                if (data.scriptName != this.scriptName)
                    return false;
                if (data.around != this.around)
                    return false;
                if (data.lineId != this.lineId)
                    return false;
                if (data.flag != this.flag)
                    return false;
                if (data.toward != this.toward)
                    return false;
                if (data.aliasName != this.aliasName)
                    return false;
                return true;
            };
            /**
             * 复制
             * @param data
             * @return
             */
            MapCreature.prototype.copy = function (data) {
                if (!data)
                    return;
                data.id = this.id;
                data.count = this.count;
                data.respawnTime = this.respawnTime;
                data.spawnType = this.spawnType;
                data.spawnTime1 = this.spawnTime1;
                data.spawnTime2 = this.spawnTime2;
                data.spawnTime3 = this.spawnTime3;
                data.scriptName = this.scriptName;
                data.around = this.around;
                data.lineId = this.lineId;
                data.flag = this.flag;
                data.toward = this.toward;
                data.aliasName = this.aliasName;
            };
            return MapCreature;
        }());
        data_1.MapCreature = MapCreature;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=MapCreature.js.map
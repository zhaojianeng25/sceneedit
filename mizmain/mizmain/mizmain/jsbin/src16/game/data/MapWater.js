/**
* 水层数据
*/
var game;
(function (game) {
    var data;
    (function (data) {
        var MapWater = /** @class */ (function () {
            function MapWater() {
                this.width = 512;
                this.height = 512;
                /**
                 * 位于底层
                 */
                this.atBottom = true;
                //浪高,默认200，可选(0-255)
                this.waveHeight = 200;
                //波长,默认256，可选(64,128,256,512,1024)
                this.waveLength = 64;
                //震幅，默认6，可选(0-10)
                this.waveBreadth = 5;
                //水流方向，默认由上至下，可选(4个方向)
                this.streamDirect = 0; //WaterWavesFilter.DIRECT_UP_TO_DOWN;
                //流水速度 1原速度，1以下减速，1以上加速
                this.streamSpeed = 1;
            }
            return MapWater;
        }());
        data.MapWater = MapWater;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=MapWater.js.map
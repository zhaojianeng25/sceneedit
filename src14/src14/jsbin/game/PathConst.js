/**
* 路径配置
*/
var game;
(function (game) {
    var Path = /** @class */ (function () {
        function Path() {
        }
        /**
         * 获得一直序列帧地址
         * @param path 图片路径
         * @param count 帧数
         * @param start 起始位置
         * @param reverse 是否倒序播放
         */
        Path.getSeqFrames = function (path, count, start, reverse) {
            if (start === void 0) { start = 0; }
            if (reverse === void 0) { reverse = false; }
            var paths = [];
            if (reverse)
                for (var i = count - 1; i >= start; i--) {
                    paths.push(StringU.substitute(path, i));
                }
            else
                for (var i = start; i < start + count; i++) {
                    paths.push(StringU.substitute(path, i));
                }
            return paths;
        };
        Path.scene = "scene/";
        Path.scene_maps = "scene/maps/";
        Path.scene_avatar = "scene/avatar/";
        Path.scene_mask = "scene/mask/";
        Path.scene_sf = "scene/sf/";
        Path.scene_title = "scene/title/";
        Path.ui = "ui/";
        Path.ui_effect = "ui/effect/";
        Path.ui_tongyong = "ui/tongyong/";
        Path.atlas_ui_effect = "res/atlas/ui/effect/";
        Path.atlas_ui = "res/atlas/ui/";
        Path.atlas_scene = "res/atlas/scene/";
        Path.template = 'data/temp/template.bin';
        return Path;
    }());
    game.Path = Path;
})(game || (game = {}));
//# sourceMappingURL=PathConst.js.map
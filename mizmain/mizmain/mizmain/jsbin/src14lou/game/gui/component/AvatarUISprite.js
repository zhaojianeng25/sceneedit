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
* 3d ui形象展示
*/
var game;
(function (game) {
    var gui;
    (function (gui) {
        var component;
        (function (component) {
            var AvatarUISprite = /** @class */ (function (_super) {
                __extends(AvatarUISprite, _super);
                function AvatarUISprite() {
                    var _this = _super.call(this) || this;
                    var scene = _this.scene;
                    scene.cameraMode = PanScene.MODE_2D;
                    scene.prependTranslation = -.5;
                    _this._charList = new Dictionary();
                    return _this;
                }
                /**
                 * 显示3d形象
                 * [{"guid":"caocao","url":"wujiang_0001","ry":180,"y":0,"x":0,"scale":2},{"guid":"guanyu","url":"wujiang_0002","ry":180,"y":100,"x":-140,"scale":2}]
                */
                AvatarUISprite.prototype.add = function (jsonStr) {
                    var data = JSON.parse(jsonStr);
                    for (var i = 0; i < data.length; i++) {
                        var d = data[i];
                        if (!d.url || !d.guid || this._charList.get(d.guid))
                            continue;
                        var char3d = new SceneChar();
                        char3d.px = d.x ? d.x : 0; //x轴坐标
                        char3d.py = d.y ? d.y : 0; //y轴坐标
                        char3d.pScale = d.scale ? d.scale : 1; //缩放
                        char3d.pRotationY = d.ry ? d.ry : 180; //水平旋转
                        char3d.setRoleUrl(getRoleUrl(d.url)); //素材命名
                        if (d.wp)
                            char3d.setWeapon(d.wp); // 武器，如果将来有的话
                        this.scene.addMovieDisplay(char3d);
                        this._charList.set(d.guid, char3d);
                    }
                };
                AvatarUISprite.prototype.set = function (jsonStr) {
                    var data = JSON.parse(jsonStr);
                    for (var i = 0; i < data.length; i++) {
                        var d = data[i];
                        if (!d.url || !d.guid)
                            continue;
                        var char3d = this._charList.get(d.guid);
                        char3d.setRoleUrl(getRoleUrl(d.url)); //素材命名
                        if (d.wp)
                            char3d.setWeapon(d.wp); // 武器，如果将来有的话
                    }
                };
                /**获取形象对象 */
                AvatarUISprite.prototype.getAvatar = function (guid) {
                    return this._charList.get(guid);
                };
                /**移除3d形象
                 * [{"guid":"caocao"},{"guid":"guanyu"}]
                */
                AvatarUISprite.prototype.remove = function (jsonStr) {
                    var data = JSON.parse(jsonStr);
                    for (var i = 0; i < data.length; i++) {
                        var d = data[i];
                        if (!d.guid)
                            continue;
                        var char3d = this._charList.get(d.guid);
                        if (!char3d)
                            continue;
                        this.scene.removeMovieDisplay(char3d);
                        char3d.destory();
                        this._charList.remove(d.guid);
                    }
                };
                /**
                 * 移除全部形象
                 */
                AvatarUISprite.prototype.removeAll = function () {
                    var data = this._charList.keys;
                    for (var i = 0; i < data.length; i++) {
                        var guid = data[i];
                        if (!guid)
                            continue;
                        var char3d = this._charList.get(guid);
                        if (!char3d)
                            continue;
                        this.scene.removeMovieDisplay(char3d);
                        char3d.destory();
                        this._charList.remove(guid);
                    }
                };
                /**
                 * 旋转
                 * @param guid 唯一识别id
                 * @param value 旋转角度
                 */
                AvatarUISprite.prototype.rotate = function (guid, value) {
                    if (!guid)
                        return;
                    var char3d = this._charList.get(guid);
                    if (!char3d)
                        return;
                    char3d.pRotationY = value;
                };
                /**坐标 */
                AvatarUISprite.prototype.position = function (guid, x, y, z) {
                    if (!guid)
                        return;
                    var char3d = this._charList.get(guid);
                    if (!char3d)
                        return;
                    if (x != null)
                        char3d.px = x;
                    if (y != null)
                        char3d.py = y;
                    if (z != null)
                        char3d.pz = z;
                };
                /**缩放 */
                AvatarUISprite.prototype.pscale = function (guid, value) {
                    if (!guid)
                        return;
                    var char3d = this._charList.get(guid);
                    if (!char3d)
                        return;
                    char3d.pScale = value;
                };
                //以下为2D的换算
                AvatarUISprite.math3dto2Darpg = function ($p) {
                    var $point = Scene_data.vpMatrix.transformVector($p);
                    var fovw = Scene_data.stageWidth / 4 / PanEngine.htmlScale;
                    var fovh = Scene_data.stageHeight / 4 / PanEngine.htmlScale;
                    var tx = fovw + $point.x * fovw;
                    var ty = fovh - $point.y * fovh;
                    return new Vector2D(tx, ty);
                };
                //通过3D坐标计算出2D场景中的坐标
                AvatarUISprite.getScene2DBy3Dpostion = function ($v3d) {
                    // var $v2: Vector2D = this.math3dto2Darpg($v3d)
                    // $v2.x -= AppDataArpg.sceneStagePos.x;
                    // $v2.y -= AppDataArpg.sceneStagePos.y;
                    return this.math3dto2Darpg($v3d);
                };
                AvatarUISprite.math2Dto3DGroundarpg = function ($p) {
                    // this._vpMatrixInver = Scene_data.vpMatrix.clone();
                    // this._vpMatrixInver.invert()
                    var $k0 = this.math2dto3Darpg($p, 100);
                    var $k1 = this.math2dto3Darpg($p, 200);
                    if (!this.triItem) {
                        this.triItem = new Array;
                        this.triItem.push(new Vector3D(0, 0, 0));
                        this.triItem.push(new Vector3D(-100, 0, 100));
                        this.triItem.push(new Vector3D(+100, 0, 100));
                    }
                    return MathUtil.getLinePlaneInterectPointByTri($k0, $k1, this.triItem);
                };
                AvatarUISprite.math2dto3Darpg = function ($p, $deph) {
                    if ($deph === void 0) { $deph = 100; }
                    var fovw = Scene_data.stageWidth / 4;
                    var fovh = Scene_data.stageHeight / 4;
                    var tx = $p.x;
                    var ty = $p.y;
                    var $point = new Vector3D();
                    $point.y = (fovh - ty) / fovh;
                    $point.x = (tx - fovw) / fovw;
                    $point.z = $deph;
                    //$point = this._viewMatrixInver.transformVector($point);
                    //$point = this._camMatrixInver.transformVector($point);
                    // $point = this._vpMatrixInver.transformVector($point);
                    return $point;
                };
                /**销毁本对象 */
                AvatarUISprite.prototype.destroy = function (destroyChild) {
                    if (this._charList) {
                        for (var guid in this._charList) {
                            var isChar = this._charList.get(guid) instanceof SceneChar;
                            if (!isChar)
                                continue;
                            var char3d = this._charList.get(guid);
                            if (!char3d)
                                continue;
                            this.scene.removeMovieDisplay(char3d);
                            char3d.destory();
                            //delete this._charList.get(guid);
                            this._charList.remove(guid);
                        }
                        this._charList.clear();
                        this._charList = null;
                    }
                    _super.prototype.destroy.call(this, destroyChild);
                };
                return AvatarUISprite;
            }(pan.PanSceneSprite));
            component.AvatarUISprite = AvatarUISprite;
        })(component = gui.component || (gui.component = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=AvatarUISprite.js.map
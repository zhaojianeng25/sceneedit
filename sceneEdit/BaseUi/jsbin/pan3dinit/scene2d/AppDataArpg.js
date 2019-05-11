var scene2d;
(function (scene2d) {
    var me;
    (function (me) {
        var AppDataArpg = /** @class */ (function () {
            function AppDataArpg() {
            }
            //以下为2D的换算
            AppDataArpg.math3dto2Darpg = function ($p) {
                var $point = Pan3d.me.Scene_data.vpMatrix.transformVector($p);
                var fovw = Pan3d.me.Scene_data.stageWidth / 4 / me.Override2dEngine.htmlScale;
                var fovh = Pan3d.me.Scene_data.stageHeight / 4 / me.Override2dEngine.htmlScale;
                var tx = fovw + $point.x * fovw;
                var ty = fovh - $point.y * fovh;
                return new Pan3d.me.Vector2D(tx, ty);
            };
            //通过3D坐标计算出2D场景中的坐标
            AppDataArpg.getScene2DBy3Dpostion = function ($v3d) {
                var $v2 = this.math3dto2Darpg($v3d);
                $v2.x -= AppDataArpg.sceneStagePos.x;
                $v2.y -= AppDataArpg.sceneStagePos.y;
                return $v2;
            };
            AppDataArpg.math2Dto3DGroundarpg = function ($p) {
                this._vpMatrixInver = Pan3d.me.Scene_data.vpMatrix.clone();
                this._vpMatrixInver.invert();
                var $k0 = this.math2dto3Darpg($p, 100);
                var $k1 = this.math2dto3Darpg($p, 200);
                if (!this.triItem) {
                    this.triItem = new Array;
                    this.triItem.push(new Pan3d.me.Vector3D(0, 0, 0));
                    this.triItem.push(new Pan3d.me.Vector3D(-100, 0, 100));
                    this.triItem.push(new Pan3d.me.Vector3D(+100, 0, 100));
                }
                return Pan3d.me.MathUtil.getLinePlaneInterectPointByTri($k0, $k1, this.triItem);
            };
            AppDataArpg.math2dto3Darpg = function ($p, $deph) {
                if ($deph === void 0) { $deph = 100; }
                var fovw = Pan3d.me.Scene_data.stageWidth / 4;
                var fovh = Pan3d.me.Scene_data.stageHeight / 4;
                var tx = $p.x;
                var ty = $p.y;
                var $point = new Pan3d.me.Vector3D();
                $point.y = (fovh - ty) / fovh;
                $point.x = (tx - fovw) / fovw;
                $point.z = $deph;
                //$point = this._viewMatrixInver.transformVector($point);
                //$point = this._camMatrixInver.transformVector($point);
                $point = this._vpMatrixInver.transformVector($point);
                return $point;
            };
            AppDataArpg.refrishPos = function ($vec) {
                AppDataArpg.sceneStagePos.x = $vec.x;
                AppDataArpg.sceneStagePos.y = $vec.y;
                Pan3d.me.Scene_data.focus3D.x = -AppDataArpg.sceneStagePos.x / 2;
                Pan3d.me.Scene_data.focus3D.z = AppDataArpg.sceneStagePos.y / 2 / (Math.sin(45 * Math.PI / 180));
                // SceneGroundModel.getInstance().resetViewMatrx3D();
            };
            AppDataArpg.resetSelfPosCenter = function () {
                if (Pan3d.me.GameInstance.mainChar) {
                    var $v2 = this.getScene2DBy3Dpostion(new Pan3d.me.Vector3D(Pan3d.me.GameInstance.mainChar.x, 0, Pan3d.me.GameInstance.mainChar.z));
                    var $tw = Pan3d.me.Scene_data.stageWidth / 4 / me.Override2dEngine.htmlScale;
                    var $th = Pan3d.me.Scene_data.stageHeight / 4 / me.Override2dEngine.htmlScale;
                    var $tox = new Pan3d.me.Vector2D($tw - $v2.x, $th - $v2.y);
                    this.refrishPos($tox);
                }
            };
            AppDataArpg.sceneStagePos = new Pan3d.me.Vector2D;
            AppDataArpg.lockMainChar = true;
            return AppDataArpg;
        }());
        me.AppDataArpg = AppDataArpg;
    })(me = scene2d.me || (scene2d.me = {}));
})(scene2d || (scene2d = {}));
//# sourceMappingURL=AppDataArpg.js.map
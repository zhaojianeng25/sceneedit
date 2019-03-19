var prop;
(function (prop) {
    var PropModel = /** @class */ (function () {
        function PropModel() {
            this._top = 0;
            this.propPanle = new prop.UiMeshSprite();
            this.propPanle.x = 500;
            this.propPanle.y = 100;
            BaseUiStart.rightPanel.addChild(this.propPanle);
        }
        PropModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new PropModel();
            }
            return this._instance;
        };
        PropModel.prototype.resize = function () {
            if (this.metaDataView) {
                this.metaDataView.width = Pan3d.Scene_data.stageWidth - this.propPanle.x;
            }
        };
        PropModel.prototype.hidePanel = function () {
            if (this.metaDataView) {
                this.metaDataView.destory();
                this.metaDataView = null;
            }
            this.lastNodel = null;
        };
        PropModel.prototype.showPanel = function ($ui) {
            if (this.lastNodel != $ui) {
                if (this.metaDataView) {
                    this.metaDataView.destory();
                    this.metaDataView = null;
                }
                var propPanle = prop.PropModel.getInstance().propPanle;
                if ($ui instanceof materialui.ConstVec3NodeUI) {
                    this.metaDataView = new prop.Vec3PropMeshPanel(propPanle);
                }
                else if ($ui instanceof materialui.ConstVec2NodeUI) {
                    this.metaDataView = new prop.Vec2PropMeshPanel(propPanle);
                }
                else if ($ui instanceof materialui.ConstFloatNodeUI) {
                    this.metaDataView = new prop.FloatPropMeshPanel(propPanle);
                }
                else if ($ui instanceof materialui.TimeNodeUI) {
                    this.metaDataView = new prop.NodeTimePropPanel(propPanle);
                }
                else if ($ui instanceof materialui.PannerNodeUI) {
                    this.metaDataView = new prop.PannerPropPanel(propPanle);
                }
                else if ($ui instanceof materialui.TextureSampleNodeUI) {
                    this.metaDataView = new prop.TexturePropMeshPanel(propPanle);
                }
                else if ($ui instanceof materialui.Texture3DNodeUI) {
                    this.metaDataView = new prop.Texture3DMeshPanel(propPanle);
                }
                else if ($ui instanceof materialui.TextureCubeNodeUI) {
                    this.metaDataView = new prop.TextureCubeMeshPanel(propPanle);
                }
                else if ($ui instanceof materialui.ResultNodeUI) {
                    this.metaDataView = new prop.OpPropMeshPanel(propPanle);
                }
                else if ($ui instanceof materialui.MathFunNodeUI) {
                    this.metaDataView = new prop.MathFunMeshPanel(propPanle);
                }
                else {
                    this.showSciencePropPanel();
                }
                this.lastNodel = $ui;
                this.metaDataView.data = $ui;
                this.metaDataView.top = this._top;
                this.resize();
            }
        };
        PropModel.prototype.showPefabMesh = function (value) {
            if (this.metaDataView) {
                this.metaDataView.destory();
                this.metaDataView = null;
                this.lastNodel = null;
            }
            this.metaDataView = value;
            this.metaDataView.refreshViewValue();
            this.resize();
        };
        PropModel.prototype.showSciencePropPanel = function () {
            if (this.metaDataView) {
                this.metaDataView.destory();
                this.metaDataView = null;
                this.lastNodel = null;
            }
            var propPanle = prop.PropModel.getInstance().propPanle;
            this.metaDataView = new prop.SciencePropMeshPanel(propPanle);
        };
        PropModel.prototype.moveTop = function ($ty) {
            this._top = $ty;
            if (this.metaDataView) {
                this.metaDataView.top = this._top;
            }
        };
        return PropModel;
    }());
    prop.PropModel = PropModel;
})(prop || (prop = {}));
//# sourceMappingURL=PropModel.js.map
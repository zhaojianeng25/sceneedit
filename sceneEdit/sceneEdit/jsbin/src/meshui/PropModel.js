var prop;
(function (prop) {
    var PropModel = /** @class */ (function () {
        function PropModel() {
            this.propPanle = new prop.UiMeshSprite();
            this.propPanle.x = 500;
            this.propPanle.y = 100;
            AppData.rightPanel.addChild(this.propPanle);
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
                this.clearOladMeshView();
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
                this.metaDataView.top = 25;
                this.resize();
            }
        };
        PropModel.prototype.clearOladMeshView = function () {
            if (this.metaDataView) {
                this.metaDataView.destory();
                this.metaDataView = null;
                this.lastNodel = null;
            }
        };
        PropModel.prototype.showOtherMeshView = function (value) {
            if (this.metaDataView != value) {
                this.clearOladMeshView();
            }
            this.metaDataView = value;
            this.metaDataView.top = 25;
            this.metaDataView.refreshViewValue();
            this.resize();
            var rightPanel = AppData.rightPanel;
            rightPanel.mainRightBaseWin.pushViewToTab(value);
        };
        PropModel.prototype.showSciencePropPanel = function () {
            /*
            if (this.metaDataView) {
                this.metaDataView.destory()
                this.metaDataView = null;
                this.lastNodel = null;
            }
            var propPanle: prop.UiMeshSprite = prop.PropModel.getInstance().propPanle
            this.metaDataView = new SciencePropMeshPanel(propPanle);
            */
            this.showOtherMeshView(new prop.SciencePropMeshPanel(prop.PropModel.getInstance().propPanle));
        };
        return PropModel;
    }());
    prop.PropModel = PropModel;
})(prop || (prop = {}));
//# sourceMappingURL=PropModel.js.map
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
var prop;
(function (prop) {
    var PropPanle = /** @class */ (function (_super) {
        __extends(PropPanle, _super);
        function PropPanle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PropPanle.prototype.changeSize = function () {
            _super.prototype.changeSize.call(this);
            this.resize();
        };
        PropPanle.prototype.addUIContainer = function ($container) {
            _super.prototype.addUIContainer.call(this, $container);
            this.resize();
        };
        PropPanle.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.perent) {
                this.rect = this.perent.rect;
            }
            for (var i = 0; i < this._containerList.length; i++) {
                this._containerList[i].left = this.rect.x;
                this._containerList[i].top = this.rect.y;
            }
        };
        return PropPanle;
    }(layout.Sprite));
    prop.PropPanle = PropPanle;
    var PropModel = /** @class */ (function () {
        function PropModel() {
            this._top = 350;
            this.propPanle = new PropPanle();
            this.propPanle.x = 500;
            this.propPanle.y = 100;
            BaseUiStart.rightPanel.addChild(this.propPanle);
            //layout.LayerManager.getInstance().addPanel(this.propPanle, 200);
        }
        PropModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new PropModel();
            }
            return this._instance;
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
                if ($ui instanceof materialui.ConstVec3NodeUI) {
                    this.metaDataView = new prop.Vec3PropMeshPanel();
                }
                else if ($ui instanceof materialui.ConstVec2NodeUI) {
                    this.metaDataView = new prop.Vec2PropMeshPanel();
                }
                else if ($ui instanceof materialui.ConstFloatNodeUI) {
                    this.metaDataView = new prop.FloatPropMeshPanel();
                }
                else if ($ui instanceof materialui.TimeNodeUI) {
                    this.metaDataView = new prop.NodeTimePropPanel();
                }
                else if ($ui instanceof materialui.PannerNodeUI) {
                    this.metaDataView = new prop.PannerPropPanel();
                }
                else if ($ui instanceof materialui.TextureSampleNodeUI) {
                    this.metaDataView = new prop.TexturePropMeshPanel();
                }
                else if ($ui instanceof materialui.Texture3DNodeUI) {
                    this.metaDataView = new prop.Texture3DMeshPanel();
                }
                else if ($ui instanceof materialui.TextureCubeNodeUI) {
                    this.metaDataView = new prop.TextureCubeMeshPanel();
                }
                else if ($ui instanceof materialui.ResultNodeUI) {
                    this.metaDataView = new prop.OpPropMeshPanel();
                }
                else if ($ui instanceof materialui.MathFunNodeUI) {
                    this.metaDataView = new prop.MathFunMeshPanel();
                }
                else {
                    this.showSciencePropPanel();
                }
                this.lastNodel = $ui;
                this.metaDataView.data = $ui;
                this.metaDataView.top = this._top;
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
        };
        PropModel.prototype.showSciencePropPanel = function () {
            if (this.metaDataView) {
                this.metaDataView.destory();
                this.metaDataView = null;
                this.lastNodel = null;
            }
            this.metaDataView = new prop.SciencePropMeshPanel();
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
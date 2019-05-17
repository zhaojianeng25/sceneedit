module prop {
    import UIConatiner = Pan3d.UIConatiner

 
    export class PropModel {

        private static _instance: PropModel;
        public static getInstance(): PropModel {
            if (!this._instance) {
                this._instance = new PropModel();
            }
            return this._instance;
        }
        public resize(): void {
            if (this.metaDataView) {
                this.metaDataView.width = Pan3d.Scene_data.stageWidth - this.propPanle.x;
            }

        }
        public constructor() {
            this.propPanle = new UiMeshSprite();
            this.propPanle.x = 500
            this.propPanle.y = 100;
            AppData.rightPanel.addChild(this.propPanle)

        }
        public propPanle: UiMeshSprite;
        private metaDataView: MetaDataView;
        private lastNodel: materialui.BaseMaterialNodeUI;
        public hidePanel(): void {
            if (this.metaDataView) {
                this.metaDataView.destory()
                this.metaDataView = null;
            }
            this.lastNodel = null
        }
        public showPanel($ui: materialui.BaseMaterialNodeUI): void {
            if (this.lastNodel != $ui) {
                this.clearOladMeshView()
                var propPanle: prop.UiMeshSprite = prop.PropModel.getInstance().propPanle
                if ($ui instanceof materialui.ConstVec3NodeUI) {
                    this.metaDataView = new Vec3PropMeshPanel(propPanle);
                } else if ($ui instanceof materialui.ConstVec2NodeUI) {
                    this.metaDataView = new Vec2PropMeshPanel(propPanle);
                } else if ($ui instanceof materialui.ConstFloatNodeUI) {
                    this.metaDataView = new FloatPropMeshPanel(propPanle);
                } else if ($ui instanceof materialui.TimeNodeUI) {
                    this.metaDataView = new NodeTimePropPanel(propPanle);
                } else if ($ui instanceof materialui.PannerNodeUI) {
                    this.metaDataView = new PannerPropPanel(propPanle);
                } else if ($ui instanceof materialui.TextureSampleNodeUI) {
                    this.metaDataView = new TexturePropMeshPanel(propPanle);
                } else if ($ui instanceof materialui.Texture3DNodeUI) {
                    this.metaDataView = new Texture3DMeshPanel(propPanle);
                } else if ($ui instanceof materialui.TextureCubeNodeUI) {
                    this.metaDataView = new TextureCubeMeshPanel(propPanle);
                } else if ($ui instanceof materialui.ResultNodeUI) {
                    this.metaDataView = new OpPropMeshPanel(propPanle);
                } else if ($ui instanceof materialui.MathFunNodeUI) {
                    this.metaDataView = new MathFunMeshPanel(propPanle);
                } else {
                    this.showSciencePropPanel();
                }
                this.lastNodel = $ui;
                this.metaDataView.data = $ui;
                this.metaDataView.top = this._top

                this.resize();

            }
        }
        private clearOladMeshView(): void {
            if (this.metaDataView) {
                this.metaDataView.destory();
                this.metaDataView = null;
                this.lastNodel = null;
            }
        }
        public showOtherMeshView(value: MetaDataView): void {
            this.clearOladMeshView()
            this.metaDataView = value;
            this.metaDataView.refreshViewValue()
            this.resize();
        }
        private showSciencePropPanel(): void {
            if (this.metaDataView) {
                this.metaDataView.destory()
                this.metaDataView = null;
                this.lastNodel = null;
            }
            var propPanle: prop.UiMeshSprite = prop.PropModel.getInstance().propPanle
            this.metaDataView = new SciencePropMeshPanel(propPanle);
 
        }
        private _top: number = 0
        public moveTop($ty: number): void {
            this._top = $ty
            if (this.metaDataView) {
                this.metaDataView.top = this._top
            }
        }
    }
}
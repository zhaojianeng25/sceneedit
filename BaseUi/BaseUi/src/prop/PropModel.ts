module prop {
    import UIConatiner = Pan3d.UIConatiner
 
    export class PropPanle extends layout.Sprite{
        public changeSize(): void {
            super.changeSize();
            this.resize();
        }
        public addUIContainer($container: UIConatiner): void {
            super.addUIContainer($container)
            this.resize();
        }
        public resize(): void {
            super.resize();
            if (this.perent) {
                this.rect = this.perent.rect
            }
            for (var i: number = 0; i < this._containerList.length; i++) {
                this._containerList[i].left = this.rect.x
                this._containerList[i].top = this.rect.y;
            }
        }
    }
    export class PropModel {

        private static _instance: PropModel;
        public static getInstance(): PropModel {
            if (!this._instance) {
                this._instance = new PropModel();
            }
            return this._instance;
        }
        public constructor() {
            this.propPanle = new PropPanle();
            this.propPanle.x = 500
            this.propPanle.y = 100;
            BaseUiStart.rightPanel.addChild(this.propPanle)

  

            //layout.LayerManager.getInstance().addPanel(this.propPanle, 200);
        }
        public propPanle: PropPanle;
        private metaDataView: MetaDataView;
        private lastNodel: materialui.BaseMaterialNodeUI;
        public hidePanel(): void {
            if (this.metaDataView) {
                this.metaDataView.destory()
                this.metaDataView = null;
            }
            this.lastNodel=null
        }
        public showPanel($ui: materialui.BaseMaterialNodeUI): void {
            if (this.lastNodel != $ui) {
                if (this.metaDataView) {
                    this.metaDataView.destory()
                    this.metaDataView = null;
                }
                if ($ui instanceof materialui.ConstVec3NodeUI) {
                    this.metaDataView = new Vec3PropMeshPanel();
                } else if ($ui instanceof materialui.ConstVec2NodeUI) {
                    this.metaDataView = new Vec2PropMeshPanel();
                } else if ($ui instanceof materialui.ConstFloatNodeUI) {
                    this.metaDataView = new FloatPropMeshPanel();
                } else if ($ui instanceof materialui.TimeNodeUI) {
                    this.metaDataView = new NodeTimePropPanel();
                } else if ($ui instanceof materialui.PannerNodeUI) {
                    this.metaDataView = new PannerPropPanel();
                } else if ($ui instanceof materialui.TextureSampleNodeUI) {
                    this.metaDataView = new TexturePropMeshPanel();
                } else if ($ui instanceof materialui.Texture3DNodeUI) {
                    this.metaDataView = new Texture3DMeshPanel();
                } else if ($ui instanceof materialui.TextureCubeNodeUI) {
                    this.metaDataView = new TextureCubeMeshPanel();
                } else if ($ui instanceof materialui.ResultNodeUI) {
                    this.metaDataView = new OpPropMeshPanel();
                } else if ($ui instanceof materialui.MathFunNodeUI) {
                    this.metaDataView = new MathFunMeshPanel();
                } else {
                    this.showSciencePropPanel();
  
                }

                this.lastNodel = $ui;
                this.metaDataView.data = $ui;
                this.metaDataView.top = this._top

            }
        }
        public showPefabMesh(value: MetaDataView): void {
            if (this.metaDataView) {
                var tempview: filelist.PrefabMeshView = this.metaDataView as filelist.PrefabMeshView;
                if (tempview) {
                     tempview.saveToSever()
                }
                this.metaDataView.destory()
                this.metaDataView = null;
                this.lastNodel = null;
            }
            this.metaDataView = value;
            this.metaDataView.refreshViewValue()
        }
        private showSciencePropPanel(): void {
            if (this.metaDataView) {
                this.metaDataView.destory()
                this.metaDataView = null;
                this.lastNodel = null;
            }
            this.metaDataView = new SciencePropMeshPanel();
         


        }
        private _top: number=350
        public moveTop($ty: number): void {
            this._top = $ty
            if (this.metaDataView) {
                this.metaDataView.top = this._top
            }
        }
    }
}
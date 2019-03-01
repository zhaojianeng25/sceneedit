module prop {
    import Vector3D = Pan3d.Vector3D
    import UIRectangle = Pan3d.UIRectangle;
    import TextureManager = Pan3d.TextureManager;
    import EventDispatcher = Pan3d.EventDispatcher;
    import TimeUtil = Pan3d.TimeUtil;
    import UICompenent = Pan3d.UICompenent;
    import UIManager = Pan3d.UIManager;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    import Matrix3D = Pan3d.Matrix3D;
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    import Rectangle = Pan3d.Rectangle;
    import UIAtlas = Pan3d.UIAtlas
    import UIRenderComponent = Pan3d.UIRenderComponent
    import LoadManager = Pan3d.LoadManager
    import UIConatiner = Pan3d.UIConatiner
    import Scene_data = Pan3d.Scene_data;



    class TexturePicIMeshVo extends Pan3d.baseMeshVo {
        private _url: string;
        public needDraw: boolean;
        public set url(value: string) {
            this._url = value;
            this.needDraw = true;
        }
        public get url(): string {
            return this._url;
        }
        public set imagepic(img: any) {
            var rec: UIRectangle = this.textLabelUIDisp2D.parent.uiAtlas.getRec(this.textLabelUIDisp2D.ui.skinName);
            var $ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            $ctx.clearRect(0, 0, rec.pixelWitdh, rec.pixelHeight)
            $ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, rec.pixelWitdh, rec.pixelHeight)
            TextureManager.getInstance().updateTexture(this.textLabelUIDisp2D.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, $ctx);

            console.log(this.ui)
        }
        public destory(): void {
            this.pos = null;
            this._url = null;
            this.needDraw = null;
            this.clear = true
       
        }
        public textLabelUIDisp2D: TexturePicUIDisp2D
        public ui: UICompenent
    }
    export class TexturePicUIDisp2D extends Disp2DBaseText {
        private labelNameMeshVo: TexturePicIMeshVo
        public makeData(): void {
            if (this._data) {
                this.labelNameMeshVo = <TexturePicIMeshVo>this.data;
                this.ui.width = 64;
                this.ui.height = 64
                this.lastKey = this.labelNameMeshVo.url
                if (this.labelNameMeshVo.url) {
                    var $img: any = TextureManager.getInstance().getImgResByurl(Scene_data.fileRoot + this.labelNameMeshVo.url)
                    if ($img) {
                        var rec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
                        this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                        this.parent.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                        TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, this.parent.uiAtlas.ctx);

             
                    } else {
                        this.parent.uiAtlas.upDataPicToTexture(this.labelNameMeshVo.url, this.textureStr);
                    }
                } else {
                    this.parent.uiAtlas.clearCtxTextureBySkilname(this.textureStr)
                }
                this.labelNameMeshVo.needDraw = false;
 
            }
        }
   
      
    }
    export class TextureContext extends UIConatiner {
        private _bRender: UIRenderComponent;

        private tempUiName: string = "tempui";
        public ui: UICompenent
        public constructor( ) {
            super();
            this._bRender = new UIRenderComponent();
            this.addRender(this._bRender);
            this._bRender.uiAtlas = new UIAtlas();
            var $uiAtlas: UIAtlas = this._bRender.uiAtlas
            $uiAtlas.configData = [];
            $uiAtlas.configData.push($uiAtlas.getObject(this.tempUiName, 0, 0, 128, 128, 128, 128));

            this.ui = <UICompenent>this._bRender.creatBaseComponent(this.tempUiName);
            this.ui.width = 64;
            this.ui.height = 64;
            this.addChild(this.ui)

            this._bRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(128, 128, false);
            this._bRender.uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture(this._bRender.uiAtlas.ctx);
          //  this.ui.uiRender.uiAtlas.upDataPicToTexture("b.jpg", this.ui.skinName);
 
        }
 
      
    }
  
    export class TexturePicUi extends BaseMeshUi {
        public constructor() {
            super();
            this.initView();
            this.resize();
        }
        protected initView(): void {
            this.addEvets()
        }
        private $dulbelClikTm: number = 0;
        private _inputHtmlSprite: HTMLInputElement
        protected butClik(evt: InteractiveEvent): void {
            console.log(TimeUtil.getTimer() , this.$dulbelClikTm)
            if (TimeUtil.getTimer() < this.$dulbelClikTm) {
                this._inputHtmlSprite = <HTMLInputElement>document.createElement('input');
                this._inputHtmlSprite.setAttribute('id', '_ef');
                this._inputHtmlSprite.setAttribute('type', 'file');
                this._inputHtmlSprite.setAttribute("style", 'visibility:hidden');
                this._inputHtmlSprite.click();
                this._inputHtmlSprite.value;
                this._inputHtmlSprite.addEventListener("change", (cevt: any) => { this.changeFile(cevt) });
            }
            this.$dulbelClikTm = TimeUtil.getTimer() + 1000
         
        }
        private changeFile(evt: any): void {
            for (var i: number = 0; i < this._inputHtmlSprite.files.length&&i<1; i++) {
                var simpleFile = this._inputHtmlSprite.files[i]
                if (!/image\/\w+/.test(simpleFile.type)) {
                    alert("请确保文件类型为图像类型");
                }
                var $reflectionEvet: ReflectionEvet = new ReflectionEvet(ReflectionEvet.CHANGE_DATA)
                $reflectionEvet.data = simpleFile
                this.dispatchEvent($reflectionEvet);
            }
            this._inputHtmlSprite = null;
        }
   
 
        public get url(): string {
            return this._url
        }
        private _url: string
        public set url(value: string) {
            this._url = value
            var $img: any = TextureManager.getInstance().getImgResByurl(Scene_data.fileRoot + this._url)
            var $uiRender: UIRenderComponent = this.textureContext.ui.uiRender
            if ($img) {
                var rec: UIRectangle = $uiRender.uiAtlas.getRec(this.textureContext.ui.skinName);
                $uiRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                $uiRender.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                TextureManager.getInstance().updateTexture($uiRender.uiAtlas.texture, rec.pixelX, rec.pixelY, $uiRender.uiAtlas.ctx);
            } else {
                this.textureContext.ui.uiRender.uiAtlas.upDataPicToTexture(this._url, this.textureContext.ui.skinName);
            }

    
        }
 
    
         

    }
} 
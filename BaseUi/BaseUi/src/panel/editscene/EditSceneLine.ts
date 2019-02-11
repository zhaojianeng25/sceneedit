module editscene {
    import Rectangle = Pan3d.Rectangle
    import Sprite = layout.Sprite
    import LayBaseTab = layout.LayBaseTab

    import UICompenent = Pan3d.UICompenent
    import FrameCompenent = Pan3d.FrameCompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import ColorType = Pan3d.ColorType
    import InteractiveEvent = Pan3d.InteractiveEvent
    import TextAlign = Pan3d.TextAlign
 
    import ModuleEventManager = Pan3d.ModuleEventManager
    import UIManager = Pan3d.UIManager
    import LabelTextFont = Pan3d.LabelTextFont
    import UIConatiner = Pan3d.UIConatiner;
    import Disp2DBaseText = Pan3d.Disp2DBaseText
    import UIRectangle = Pan3d.UIRectangle
    import baseMeshVo = Pan3d.baseMeshVo
    import UIMask = Pan3d.UIMask
    import UiDraw = Pan3d.UiDraw
    import UIData = Pan3d.UIData
    import UIAtlas = Pan3d.UIAtlas
    import Vector2D = Pan3d.Vector2D
    import Scene_data = Pan3d.Scene_data


    export class TempLineSprite extends UIConatiner {

        public static imgBaseDic: any;
        public constructor() {
            super();

            this.left = 0;
            this._pageRect = new Rectangle(0, 0, 30, 300)

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._bottomRender.uiAtlas = new UIAtlas();
            this._bottomRender.uiAtlas.setInfo("ui/folder/folder.txt", "ui/folder/folder.png", () => { this.loadConfigCom() });

        }

        private _bottomRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        protected mouseDown(evt: InteractiveEvent): void {
            this.mouseIsDown = true
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        }
        private mouseIsDown: boolean
        protected stageMouseMove(evt: InteractiveEvent): void {
            this.mouseIsDown = false

        }
        protected mouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        }
        private loadFinish: boolean
        protected loadConfigCom(): void {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas

 
            this.a_left_line = this.addChild(<UICompenent>this._topRender.getComponent("a_rigth_line"));
            this.a_left_line.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);

            this.loadFinish = true

            this.refrishSize()



        }
        private lastPagePos: Vector2D;
        private lastMousePos: Vector2D;
        private mouseMoveTaget: UICompenent
        protected tittleMouseDown(evt: InteractiveEvent): void {

            this.mouseMoveTaget = evt.target
            this.lastMousePos = new Vector2D(evt.x, evt.y)

            switch (this.mouseMoveTaget) {
                case this.a_left_line:
                    this.lastPagePos = new Vector2D(this._pageRect.x,this._pageRect.y)
                    break
                default:
                    console.log("nonono")
                    break

            }
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        }
        protected tittleMouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        }
      
        protected mouseOnTittleMove(evt: InteractiveEvent): void {
            switch (this.mouseMoveTaget) {
                case this.a_left_line:
                    this._pageRect.x = this.lastPagePos.x + (evt.x - this.lastMousePos.x)
                    break
                default:
                    console.log("nonono")
                    break

            }
            var roundPos: Vector2D = (<EditSceneLine>this.perent).roundPos;
    

            this._pageRect.x = Math.max(this._pageRect.x, Scene_data.stageWidth * roundPos.x)
            this._pageRect.x = Math.min(this._pageRect.x, Scene_data.stageWidth * roundPos.y)

            this.refrishSize();

            (<EditSceneLine>this.perent).perent.resize()
        }
        protected butClik(evt: InteractiveEvent): void {
            console.log(evt.target)
        }
        public set pageRect(value: Rectangle) {
            this._pageRect = value;
            if (this.loadFinish) {
                this.refrishSize();
            }
        }
        public get pageRect() {
            return this._pageRect;

        }
        private _pageRect: Rectangle;
 
        private a_left_line: UICompenent
        private refrishSize(): void {

            this.left = this._pageRect.x;
            this.top = this._pageRect.y;

            this.a_left_line.x = 0;
            this.a_left_line.y = 0;
            this.a_left_line.height = this._pageRect.height 

            this.resize();


        }


    }
    export class EditSceneLine extends Sprite {
        private winBg: TempLineSprite;
        public constructor(has: boolean = true) {
            super();

            if (has) {
                this.winBg = new TempLineSprite();
                this.addUIContainer(this.winBg)
                this.changeSize()
            }

        }
        public roundPos: Vector2D
        public changeSize(): void {
            if (this.winBg) {
                this.winBg.pageRect = this.rect

            }

        }
    }
}


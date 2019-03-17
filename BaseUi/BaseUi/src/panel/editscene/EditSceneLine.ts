module editscene {
    import Rectangle = Pan3d.Rectangle
    import Sprite = layout.Sprite
 
    import UICompenent = Pan3d.UICompenent
 
    import InteractiveEvent = Pan3d.InteractiveEvent
 
  
    import Vector2D = Pan3d.Vector2D
    import Scene_data = Pan3d.Scene_data



    export class TempSceneLine extends base.BaseWindow {

        private leftLine: UICompenent;
        private rightLine: UICompenent;
        private bottomLine: UICompenent;

        private leftLineMin: UICompenent;
        private rightLineMin: UICompenent;
        private bottomLineMin: UICompenent;


        protected loadConfigCom(): void {
            super.loadConfigCom();
 
 
            this.leftLine = this._baseTopRender.getComponent("a_empty");
            this.rightLine = this._baseTopRender.getComponent("a_empty");
            this.bottomLine = this._baseTopRender.getComponent("a_empty");


            this.setUiListVisibleByItem([this.leftLine], true)
            this.setUiListVisibleByItem([this.rightLine], true)
            this.setUiListVisibleByItem([this.bottomLine], true)


            this.leftLineMin = this._baseTopRender.getComponent("b_line_pixe_point");
            this.rightLineMin = this._baseTopRender.getComponent("b_line_pixe_point");
            this.bottomLineMin = this._baseTopRender.getComponent("b_line_pixe_point");


            this.setUiListVisibleByItem([this.leftLineMin], true)
            this.setUiListVisibleByItem([this.rightLineMin], true)
            this.setUiListVisibleByItem([this.bottomLineMin], true)
   


            this.leftLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.rightLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.bottomLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);




            this.setRect(new Rectangle(0, 0, Scene_data.stageWidth, Scene_data.stageHeight))

            this.resize()

        }
        private leftWidthNum: number = 300 //左边宽度；
        private rightWidthNum: number = 300 //右边宽度；
        private bottomHeightNum: number = 300 //底下宽度；
 
        public resize(): void {

            super.resize()
            if (this.bottomLine) {

                this.leftLine.x = this.leftWidthNum-5
                this.leftLine.y = 0
                this.leftLine.width = 10
                this.leftLine.height = Scene_data.stageHeight - this.bottomHeightNum
               

                this.rightLine.x = Scene_data.stageWidth - this.rightWidthNum-5
                this.rightLine.y = 0
                this.rightLine.width = 10
                this.rightLine.height = Scene_data.stageHeight

                this.bottomLine.x = 0
                this.bottomLine.y = Scene_data.stageHeight - this.bottomHeightNum-5
                this.bottomLine.width = Scene_data.stageWidth - this.rightWidthNum
                this.bottomLine.height = 10


                this.leftLineMin.x = this.leftLine.x +5
                this.leftLineMin.y = this.leftLine.y
                this.leftLineMin.width = 2
                this.leftLineMin.height = this.leftLine.height

                this.rightLineMin.x = this.rightLine.x + 5
                this.rightLineMin.y = this.rightLine.y
                this.rightLineMin.width = 2
                this.rightLineMin.height = this.rightLine.height


                this.bottomLineMin.x = this.bottomLine.x  
                this.bottomLineMin.y = this.bottomLine.y +5
                this.bottomLineMin.width = this.bottomLine.width
                this.bottomLineMin.height =2


 
                BaseUiStart.leftPanel.y = this.menuHeight;
                BaseUiStart.centenPanel.y = this.menuHeight;
                BaseUiStart.rightPanel.y = this.menuHeight;

 
                BaseUiStart.leftPanel.x = 0
                BaseUiStart.leftPanel.height = Scene_data.stageHeight - this.bottomHeightNum - this.menuHeight;
                BaseUiStart.leftPanel.width = this.leftWidthNum;
                BaseUiStart.leftPanel.resize()



                BaseUiStart.rightPanel.x = Scene_data.stageWidth - this.rightWidthNum
                BaseUiStart.rightPanel.height = Scene_data.stageHeight - this.menuHeight;
                BaseUiStart.rightPanel.width = this.rightWidthNum;
                BaseUiStart.rightPanel.resize()

                BaseUiStart.centenPanel.x = this.leftWidthNum
                BaseUiStart.centenPanel.height = Scene_data.stageHeight - this.bottomHeightNum - this.menuHeight
                BaseUiStart.centenPanel.width = Scene_data.stageWidth - this.leftWidthNum - this.rightWidthNum
                BaseUiStart.centenPanel.resize()

                var rect: Rectangle = new Rectangle(0, Scene_data.stageHeight - this.bottomHeightNum + 2, Scene_data.stageWidth - this.rightWidthNum, this.bottomHeightNum);
                Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.EDITSCENE_RESET_SIZE), rect);
                Pan3d.ModuleEventManager.dispatchEvent(new EditSceneEvent(EditSceneEvent.EDITE_SCENE_RESIZE), rect);
            }

        }
        protected lastLaoutVec: Vector3D;
        protected tittleMouseDown(evt: InteractiveEvent): void {
            this.mouseMoveTaget = evt.target
            this.lastMousePos = new Vector2D(evt.x, evt.y)

        

            switch (this.mouseMoveTaget) {
                case this.leftLine:
                case this.rightLine:
                case this.bottomLine:
                    this.lastPagePos = new Vector2D(evt.target.x, evt.target.y)
                    this.lastLaoutVec = new Vector3D(this.leftWidthNum, this.rightWidthNum, this.bottomHeightNum);
                    break
                default:
 
                    break

            }
 
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        }
        private menuHeight: number = 22
        protected mouseOnTittleMove(evt: InteractiveEvent): void {
            switch (this.mouseMoveTaget) {
                case this.leftLine:
                    this.leftWidthNum = this.lastLaoutVec.x + (evt.x - this.lastMousePos.x)
                    this.leftWidthNum = Math.min((Scene_data.stageWidth - this.rightWidthNum) - 100, this.leftWidthNum)
                    this.leftWidthNum = Math.max(100, this.leftWidthNum);
                    break
                case this.rightLine:
                    this.rightWidthNum = this.lastLaoutVec.y - (evt.x - this.lastMousePos.x)
                    this.rightWidthNum = Math.min((Scene_data.stageWidth - this.leftWidthNum) - 100, this.rightWidthNum)
                    this.rightWidthNum = Math.max(100, this.rightWidthNum);
                    break
                case this.bottomLine:
                    this.bottomHeightNum = this.lastLaoutVec.z - (evt.y - this.lastMousePos.y)
                    this.bottomHeightNum = Math.min(Scene_data.stageHeight  - 100, this.bottomHeightNum)
                    this.bottomHeightNum = Math.max(100, this.bottomHeightNum);

                    break
                default:
                    console.log("nonono")
                    break

            }
            this.resize()


           

        }
       
    }

    export class EditSceneLine extends Sprite {
        private winBg: TempSceneLine;
        public constructor(has: boolean = true) {
            super();
 
            this.winBg = new TempSceneLine();
            this.addUIContainer(this.winBg)
            this.changeSize()
     

        }
 
       
    }
}


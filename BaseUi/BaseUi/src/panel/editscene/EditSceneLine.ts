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

        private closeLeftBut: UICompenent
        private closeRightBut: UICompenent
        private closeBottomBut: UICompenent


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




            this.closeLeftBut = this.addEvntButUp("a_scroll_bar", this._baseTopRender)
            this.closeRightBut = this.addEvntButUp("a_scroll_bar", this._baseTopRender)
            this.closeBottomBut = this.addEvntButUp("a_scroll_bar", this._baseTopRender)

            this.closeLeftBut.width = 10
            this.closeLeftBut.height = 60
            this.closeRightBut.width = 10
            this.closeRightBut.height = 60

            this.closeBottomBut.width = 60
            this.closeBottomBut.height = 10



            this.setUiListVisibleByItem([this.leftLineMin], true)
            this.setUiListVisibleByItem([this.rightLineMin], true)
            this.setUiListVisibleByItem([this.bottomLineMin], true)



            this.leftLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.rightLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.bottomLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);




            this.setRect(new Rectangle(0, 0, Scene_data.stageWidth, Scene_data.stageHeight))

            this.resize()

        }
        private hideItemDic: any = {}
        protected butClik(evt: InteractiveEvent): void {
    
            switch (evt.target) {
                case this.closeLeftBut:
                    this.hideItemDic["left"] = !this.hideItemDic["left"]
                    break
                case this.closeRightBut:
                    this.hideItemDic["right"] = !this.hideItemDic["right"]
                    break
                case this.closeBottomBut:
                    this.hideItemDic["bottom"] = !this.hideItemDic["bottom"]
                    break
                default:
            }
            this.resize()
        }
        private leftWidthNum: number = 300 //左边宽度；
        private rightWidthNum: number = 300 //右边宽度；
        private bottomHeightNum: number = 300 //底下宽度；

        public resize(): void {

            super.resize()
            if (this.bottomLine) {

                var leftNum: number = this.leftWidthNum;
                var rightNum: number = this.rightWidthNum;
                var bottomNum: number = this.bottomHeightNum;


                if (this.hideItemDic["left"]) {//左边关关闭
                    leftNum = 0
                }
                if (this.hideItemDic["right"]) {//左边关关闭
                    rightNum = 0
                }
                if (this.hideItemDic["bottom"]) {//左边关关闭
                    bottomNum = 20
                }


                this.leftLine.x = leftNum - 5
                this.leftLine.y = 0
                this.leftLine.width = 10
                this.leftLine.height = Scene_data.stageHeight - bottomNum

                this.closeLeftBut.x = this.leftLine.x + 5
                this.closeLeftBut.y = this.leftLine.height / 2 - this.closeLeftBut.height;


                this.rightLine.x = Scene_data.stageWidth - rightNum - 5
                this.rightLine.y = 0
                this.rightLine.width = 10
                this.rightLine.height = Scene_data.stageHeight
                this.closeRightBut.x = this.rightLine.x - 5;
                this.closeRightBut.y = this.closeLeftBut.y;

                this.bottomLine.x = 0
                this.bottomLine.y = Scene_data.stageHeight - bottomNum - 5
                this.bottomLine.width = Scene_data.stageWidth - rightNum
                this.bottomLine.height = 10

                this.closeBottomBut.x = leftNum+ (this.bottomLine.width - leftNum) / 2 - this.closeBottomBut.width
                this.closeBottomBut.y = this.bottomLine.y-5


                this.leftLineMin.x = this.leftLine.x + 5
                this.leftLineMin.y = this.leftLine.y
                this.leftLineMin.width = 2
                this.leftLineMin.height = this.leftLine.height

                this.rightLineMin.x = this.rightLine.x + 5
                this.rightLineMin.y = this.rightLine.y
                this.rightLineMin.width = 2
                this.rightLineMin.height = this.rightLine.height


                this.bottomLineMin.x = this.bottomLine.x
                this.bottomLineMin.y = this.bottomLine.y + 5
                this.bottomLineMin.width = this.bottomLine.width
                this.bottomLineMin.height = 2





                BaseUiStart.leftPanel.y = this.menuHeight;
                BaseUiStart.centenPanel.y = this.menuHeight;
                BaseUiStart.rightPanel.y = this.menuHeight;




                if (this.hideItemDic["left"]) {//左边关关闭
                    BaseUiStart.leftPanel.x = -this.leftWidthNum;
                } else {
                    BaseUiStart.leftPanel.x = 0;
                }

                BaseUiStart.leftPanel.height = Scene_data.stageHeight - bottomNum - this.menuHeight;
                BaseUiStart.leftPanel.width = this.leftWidthNum;
            

                BaseUiStart.leftPanel.resize()



                BaseUiStart.rightPanel.x = Scene_data.stageWidth - rightNum
                BaseUiStart.rightPanel.height = Scene_data.stageHeight - this.menuHeight;
                BaseUiStart.rightPanel.width = rightNum;
                BaseUiStart.rightPanel.resize()




                BaseUiStart.centenPanel.x = leftNum


                BaseUiStart.centenPanel.height = Scene_data.stageHeight - bottomNum - this.menuHeight
                BaseUiStart.centenPanel.width = Scene_data.stageWidth - leftNum - rightNum

                BaseUiStart.centenPanel.width = Scene_data.stageWidth - leftNum - rightNum


                BaseUiStart.centenPanel.resize()

                var rect: Rectangle = new Rectangle(0, Scene_data.stageHeight - bottomNum + 2, Scene_data.stageWidth - rightNum, bottomNum);
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
                    this.bottomHeightNum = Math.min(Scene_data.stageHeight - 100, this.bottomHeightNum)
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


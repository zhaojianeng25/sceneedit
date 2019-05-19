module editscene {
 
    import Rectangle = Pan3d.Rectangle
    import Vector2D = Pan3d.Vector2D
    import Scene_data = Pan3d.Scene_data

    import UICompenent = Pan3d.UICompenent


    import TextureManager = Pan3d.TextureManager
    import FrameCompenent = Pan3d.FrameCompenent
    import Grid9Compenent = Pan3d.Grid9Compenent
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
    import UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent
    import baseMeshVo = Pan3d.baseMeshVo
    import ProgrmaManager = Pan3d.ProgrmaManager
    import UIMask = Pan3d.UIMask
    import UiDraw = Pan3d.UiDraw
    import UIData = Pan3d.UIData
    import UIAtlas = Pan3d.UIAtlas
    import Shader3D = Pan3d.Shader3D
    import TextureRes = Pan3d.TextureRes
    import MouseType = Pan3d.MouseType
    import MathUtil = Pan3d.MathUtil
    import TextRegExp = Pan3d.TextRegExp


    import Panel = win.Panel;
    import LayoutbaseBg = win.LayoutbaseBg


    export class RightTabInfoVo  {
        public type: number;
        public label: string;
        public class: any
    }
 
    export class RightTabText extends Disp2DBaseText {

        public bgUi: UICompenent;
        public textMetrics: TextMetrics;
        public rightTabInfoVo: RightTabInfoVo;


        public set select(value: boolean) {
            this._select = value
            this.makeData()
        }
        private _select: boolean
        public get select(): boolean {
            return this._select
        }

        public makeData(): void {
            if (this.rightTabInfoVo) {
                var $uiRec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
                this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);

                var nameStr: string = this.rightTabInfoVo.label;
                if (this._select) {
                    nameStr = "[ffffff]" + nameStr;
                } else {
                    nameStr = "[9c9c9c]" + nameStr;
                }

                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, nameStr, 24, 1, 1, TextAlign.LEFT);
                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);



            }
        }


    }
 
    export class RightOpenList {
        private perent: MainRightBaseWin
        private topRender: UIRenderComponent
        public constructor(value: MainRightBaseWin, render: UIRenderComponent) {
            this.perent = value
            this.topRender = render;

            this.tabItemArr = [];


            //this.pushPathUrl("角色/新场景.scene")
            //this.pushPathUrl("完美的开始.map")

        }


        private tabItemArr: Array<RightTabText>;
        private tabBgClik(evt: InteractiveEvent): void {
            var tabVo: RightTabText = evt.target.data
            var ui: Grid9Compenent = evt.target;
            if ((evt.x - ui.absoluteX) < (ui.absoluteWidth - 20)) {
                this.selectTabStr = tabVo.rightTabInfoVo


                var tempMeshView: prop. MetaDataView = tabVo.rightTabInfoVo.class
                console.log(tabVo.rightTabInfoVo.class)


                tempMeshView.replayUiList();
                prop.PropModel.getInstance().showOtherMeshView(tabVo.rightTabInfoVo.class);

            } else {
                this.removePathUrl(tabVo.rightTabInfoVo)
 
            }

            this.refrishTabUiSelect()

        }
        public removePathUrl(value: RightTabInfoVo): void {
            for (var i: number = 0; i < this.tabItemArr.length; i++) {
                if (this.tabItemArr[i].rightTabInfoVo == value) {
                    var tabVo: RightTabText = this.tabItemArr[i]
                    this.perent.removeChild(tabVo.bgUi);
                    tabVo.bgUi.removeEventListener(InteractiveEvent.Down, this.tabBgClik, this);
                    this.perent.clearTemp(tabVo.rightTabInfoVo);
                    this.tabItemArr.splice(i, 1)
                }
            }
        }
        public changeVoBg(vo: RightTabText, value: boolean): void {
            var skinName: string = "e_edit_select_bg_1"
            if (value) {
                skinName = "e_edit_select_bg_2";
            } else {
                skinName = "e_edit_select_bg_1";
            }
            var tempui = this.perent.addChild(<UICompenent>this.topRender.getComponent(skinName));
            if (vo.bgUi) {
                tempui.x = vo.bgUi.x;
                tempui.y = vo.bgUi.y;
                tempui.width = vo.bgUi.width;
                tempui.height = vo.bgUi.height;
                vo.bgUi.removeEventListener(InteractiveEvent.Down, this.tabBgClik, this);
                this.perent.removeChild(vo.bgUi);
            }
            vo.bgUi = tempui;//换上最新的
            vo.bgUi.addEventListener(InteractiveEvent.Down, this.tabBgClik, this);
            vo.bgUi.data = vo;
            vo.select = value;

        }
        private refrishTabUiSelect(): void {
            var tx: number = 2;
            for (var i: number = 0; i < this.tabItemArr.length; i++) {

                var tabVo = this.tabItemArr[i];
                if (this.tabItemArr[i].rightTabInfoVo == this.selectTabStr) {
                    this.tabItemArr[i].select = true
                    this.changeVoBg(this.tabItemArr[i], true)
                } else {
                    this.tabItemArr[i].select = false
                    this.changeVoBg(this.tabItemArr[i], false)
                }

                tabVo.bgUi.x = tx - 1;
                tabVo.bgUi.y = 13;
                tabVo.bgUi.width = Math.floor(tabVo.textMetrics.width) + 0 + 25;
                tabVo.bgUi.height = 22;
                tabVo.bgUi.data = tabVo;
                tx += tabVo.bgUi.width;
                tabVo.ui.x = tabVo.bgUi.x + 10;
                tabVo.ui.y = tabVo.bgUi.y + 5;
                tabVo.ui.width = 256;
                tabVo.ui.height = 20;
            }
            this.topRender.applyObjData();
        }
        public pushPathUrl(value: RightTabInfoVo): void {
            if (this.tabItemArr.length>=3) {
                console.log("不添加了")
                return;
            }
            this.selectTabStr = value
            var needAdd: boolean = true;
            var tx: number = 1;
            for (var i: number = 0; i < this.tabItemArr.length; i++) {
                if (this.tabItemArr[i].rightTabInfoVo == value) {
                    needAdd = false
                }
                tx = this.tabItemArr[i].bgUi.x + this.tabItemArr[i].bgUi.width - 1;
            }
            if (needAdd) {
 
                var $ctx = UIManager.getInstance().getContext2D(100, 100, false);
                $ctx.font = "13px " + UIData.font;
                var tabVo: RightTabText = <RightTabText>this.perent.showTemp(value.label);
                tabVo.textMetrics = TextRegExp.getTextMetrics($ctx, value.label);
                tabVo.rightTabInfoVo = value;

                tabVo.select = true


                this.changeVoBg(tabVo, false);
     

               // this.tabItemArr.unshift(tabVo);
              this.tabItemArr.push(tabVo);

            }
            this.refrishTabUiSelect()
        }
        private selectTabStr: RightTabInfoVo;


    }
 
    export class MainRightBaseWin extends win.Dis2dBaseWindow {

        public constructor() {
            super(RightTabText, new Rectangle(0, 0, 512, 40), 10);
        

        }
        private e_file_list_path_bg: Pan3d.UICompenent
        protected loadConfigCom(): void {
            super.loadConfigCom();
            this.setUiListVisibleByItem([this.e_panel_1], true)

            this.e_file_list_path_bg = this.addChild(this._baseMidRender.getComponent("e_file_list_path_bg"));

            this.rightOpenList = new RightOpenList(this, this._baseTopRender)

        
           //  this.rightOpenList.pushPathUrl(this.getTempTabInfo("场景"));
 
        }
        private skilNum: number=0
        public showNextView(value: any): void {

            var vo: RightTabInfoVo = new RightTabInfoVo()
            vo.label = "属性" + this.skilNum++;
            vo.type = 1;
            vo.class = value.class;
            this.rightOpenList.pushPathUrl(vo);

        }
        private getTempTabInfo(value: string): RightTabInfoVo {
            var vo: RightTabInfoVo = new RightTabInfoVo()
            vo.label = value;
            vo.type = 1;
            return vo

        }
        
        private rightOpenList: RightOpenList

        public resize(): void {
            super.resize();
            if (this.uiLoadComplete && this.e_file_list_path_bg) {
                this.e_file_list_path_bg.x = 0;
                this.e_file_list_path_bg.y = 12
                this.e_file_list_path_bg.height = 22
                this.e_file_list_path_bg.width = this.pageRect.width - this.e_file_list_path_bg.x;
                this._baseMidRender.applyObjData();
            }
        }
    }
    export class MainRightPanel extends Panel {
        protected winBg: MainRightBaseWin;
        public constructor(has: boolean = true) {
            super();
            if (has) {
                this.winBg = new MainRightBaseWin();
                this.addUIContainer(this.winBg)
                this.changeSize()
            }
        }
        public get mainRightBaseWin(): MainRightBaseWin {
            return this.winBg;
        }
        public changeSize(): void {
            if (this.winBg) {
                this.winBg.setRect(this.rect)
            }
        }

    }
}
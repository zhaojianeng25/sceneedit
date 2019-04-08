module prop {
    import TextureManager = Pan3d.TextureManager
    import Scene_data = Pan3d.Scene_data
    import SkinMesh = Pan3d.SkinMesh
    import Material = Pan3d.Material
    import InteractiveEvent = Pan3d.InteractiveEvent
    import ModuleEventManager = Pan3d.ModuleEventManager

    export class RoleAnimi2DUI extends BaseReflComponent {

        protected textLabelUI: TextLabelUI;
        protected comboBoxUi: ComboBoxUi;


        protected md5animUrlText: TextLabelUI;
        protected md5animPicUi: TexturePicUi
        protected md5searchIcon: BaseMeshUi


 
        private _skinMesh: SkinMesh
 

        protected initView(): void {
            super.initView();


            this.textLabelUI = new TextLabelUI();
            this.comboBoxUi = new ComboBoxUi();


            this.md5animUrlText = new TextLabelUI(200, 16)
            this.md5animPicUi = new TexturePicUi()
            this.md5searchIcon = new BaseMeshUi(20, 20);
 

            this.propPanle.addBaseMeshUi(this.textLabelUI)
            this.propPanle.addBaseMeshUi(this.comboBoxUi)


            this.propPanle.addBaseMeshUi(this.md5animUrlText);
            this.propPanle.addBaseMeshUi(this.md5animPicUi);
            this.propPanle.addBaseMeshUi(this.md5searchIcon);
 

            this.drawUrlImgToUi(this.md5searchIcon.ui, "icon/search.png")
 

            this.comboBoxUi.addEventListener(InteractiveEvent.Down, this.comboBoxUiDown, this)

            this.height = 150;

        }
        public destory(): void {
            this.textLabelUI.destory()
            this.comboBoxUi.destory()

            this.md5animUrlText.destory()
            this.md5animPicUi.destory()
            this.md5searchIcon.destory()
 
 
            super.destory()

        }
        public get x(): number {
            return this._x
        }
        public set x(value: number) {
            this._x = value;

            this.textLabelUI.x = this._x + 0;
            this.comboBoxUi.x = this._x + 75;

            this.md5animUrlText.x = this._x + 60;
            this.md5animPicUi.x = this._x + 60
            this.md5searchIcon.x = this._x + 150;

 

        }



        public get y(): number {
            return this._y
        }
        public set y(value: number) {
            this._y = value;

            this.textLabelUI.y = this._y + 4
            this.comboBoxUi.y = this._y + 6

            this.md5animUrlText.y = this._y + 100
            this.md5animPicUi.y = this._y + 35
            this.md5searchIcon.y = this._y + 40
 

        }

        protected comboBoxUiDown($evt: InteractiveEvent): void {
            var $rightMenuEvet: menutwo.MenuTwoEvent = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_COMBOX_MENU);
            $rightMenuEvet.posv2d = new Vector2D(this.comboBoxUi.ui.absoluteX, this.comboBoxUi.ui.absoluteY + 20);

            var arrItem: Array<any> = []

            for (var i: number = 0; i < this._skinMesh.meshAry.length; i++) {
                arrItem.push({ name: "anim_" + i, type: i })
            }

            $rightMenuEvet.comboxData = arrItem
            $rightMenuEvet.comboxFun = (value: number) => { this.selectFun(value) }
            ModuleEventManager.dispatchEvent($rightMenuEvet);
        }
        protected selectFun(value: number): void {
            this.selectMeshId = value
            this.refreshViewValue();
        }

        public set data(value: any) {
            this._data = value;


        }
        public get data(): any {
            return this._data
        }
        private selectMeshId: number = 0
        public refreshViewValue(): void {
            if (this.FunKey) {

                this._skinMesh = this.target[this.FunKey]

                this.textLabelUI.label = "部分"
                this.comboBoxUi.text = "anim_" + this.selectMeshId

                this.md5animPicUi.url = "icon/txt_64x.png"
                this.md5animUrlText.label = "ccav.md5anim"

            

            }
        }

 
   



    }

}
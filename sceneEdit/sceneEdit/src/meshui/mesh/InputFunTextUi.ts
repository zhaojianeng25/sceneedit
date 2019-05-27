module prop {
    import Vector2D = Pan3d.Vector2D
    import UICompenent = Pan3d.UICompenent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Scene_data = Pan3d.Scene_data;
    import LabelTextFont = Pan3d.LabelTextFont
    import TextAlign = Pan3d.TextAlign
    import MouseType = Pan3d.MouseType
    import LoadManager = Pan3d.LoadManager
    import UIAtlas = Pan3d.UIAtlas
    import TextureManager = Pan3d.TextureManager
    import UIRectangle = Pan3d.UIRectangle
    import UIManager = Pan3d.UIManager
    import Rectangle = Pan3d.Rectangle
    export class InputFunTextUi extends BaseMeshUi {
        public constructor(w: number = 64, h: number = 64) {
            super(w, h);

            this.width = 100
            this.height = 100
 
        }
        protected initView(): void {
            this.makeHtmlArear()
            this.addEvets()
        }
        public destory(): void {
            document.body.removeChild(this.chatHtmlIArea);
            this.chatHtmlIArea = null;
            super.destory()

        }
        private chatHtmlIArea: HTMLTextAreaElement;
        private makeHtmlArear(): void {
            if (!this.chatHtmlIArea) {
                this.chatHtmlIArea = <HTMLTextAreaElement>document.createElement("textarea");
                this.chatHtmlIArea.style.position = "absolute";
                this.chatHtmlIArea.style["z-index"] = 100
               // this.chatHtmlIArea.style.background = "transparent"
                this.chatHtmlIArea.style.backgroundColor = "#bbbbbb";
                this.chatHtmlIArea.style.color = "#000000";
                document.body.appendChild(this.chatHtmlIArea);
                this.chatHtmlIArea.addEventListener("change", (cevt: any) => { this.changeInputTxt(cevt) });
                this.chatHtmlIArea.style.left = 0 + "px";
                this.chatHtmlIArea.style.top = 0 + "px";
                var tw: number = 40
                var th: number = 20;
                this.chatHtmlIArea.style.fontSize = String(12) + "px";
                this.chatHtmlIArea.style.width = String(tw) + "px";
                this.chatHtmlIArea.style.height = 'auto';
                this.chatHtmlIArea.style.height = 300 + "px";

                this.resize()
            }
    

 
 

        }

        private changeInputTxt(evt: any): void {
            var $agalStr: string = this.chatHtmlIArea.value

            console.log(this.chatHtmlIArea.scrollHeight)


            var $reflectionEvet: ReflectionEvet = new ReflectionEvet(ReflectionEvet.CHANGE_DATA)
            $reflectionEvet.data = $agalStr;
            //  this.dispatchEvent($reflectionEvet);

        }
        public resize(): void {
            super.resize()


            if (this.chatHtmlIArea) {
                this.chatHtmlIArea.style.left = (this.textureContext.left + this.x - 10) + "px";
                this.chatHtmlIArea.style.top = (this.textureContext.top + this.y+100) + "px";
                this.chatHtmlIArea.style.width = this.width + "px";
            }
   
 
 
        }
       
        public width: number;
        public height: number;
        public set text(value: string) {
            LabelTextFont.writeSingleLabel(this.ui.uiRender.uiAtlas, this.ui.skinName, value, 26, TextAlign.LEFT, "#ffffff", "#27262e");

            this.makeHtmlArear()
            this.chatHtmlIArea.value = value

            this.drawUrlImgToUi(this.ui, "ui/materialmenu/meshfunui.png");


        
        }

        //public static getMathFunName($agalStr: string): string {
        //public static getMathFunReturnType($agalStr: string): string {
        //public static getDataMathFunArr($agalStr: string): Array<DataMathFunNode> {

        protected drawUrlImgToUi(ui: Pan3d.UICompenent, url: string): void {

            LoadManager.getInstance().load(Scene_data.fileuiRoot + url, LoadManager.IMG_TYPE,
                ($img: any) => {
                    this.drawImgToUi(ui, $img)
                });
        }
        protected drawImgToUi(ui: Pan3d.UICompenent, $img: any): void {

            var $UIAtlas: UIAtlas = ui.uiRender.uiAtlas
            var $textureStr: string = ui.skinName
            var rec: UIRectangle = $UIAtlas.getRec($textureStr);
            var $cxt: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);

            var s15: number = 1.5;
            var B: Rectangle = new Rectangle(8, 30, 50, 50);
            $cxt.drawImage($img, B.x, B.y, B.width, B.height, 4, 35, 160 * s15, 150);

            var A: Rectangle = new Rectangle(2, 2, 164, 24);
            $cxt.drawImage($img, A.x, A.y, A.width, A.height, A.x * s15, A.y * s15, A.width * s15, A.height * s15);

 


            $cxt.font = "24px Georgia";
            $cxt.fillStyle = "#ffffff";
            $cxt.lineWidth = 0;
            $cxt.fillText("函数(DIE)", 20, 8);


         //   $cxt.drawImage($img, obj.ox, obj.oy, obj.uow, obj.uoh, $rect.x, $rect.y, obj.uow, obj.uoh);
 


            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, $cxt);
        }



    }
}
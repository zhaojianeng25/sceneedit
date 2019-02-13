module layout {
    import InteractiveEvent = Pan3d.InteractiveEvent
    import Vector2D = Pan3d.Vector2D
    import Rectangle = Pan3d.Rectangle;
 
    import UICompenent = Pan3d.UICompenent
    import Scene_data = Pan3d.Scene_data

    export class GameUIInstance {
        public constructor() {
        }

 

        public static uiContainer: Sprite;

        public static layoutBottom: Sprite;

        public static layoutTop: Sprite;

        //public static var txt:TextInput;

    }

    export class LayerManager {
        private static _instance: LayerManager;
        public static getInstance(): LayerManager {
            if (!this._instance) {
                this._instance = new LayerManager();
            }
            return this._instance;
        }

        private children: Array<Panel>;

        public initData(): void {
            this.children = [];
        }
        public addPanel($panel: Panel, $level: number ): void {
            this.children.push($panel);
        }
     
        public update(): void {
            Pan3d.Scene_data.context3D.setDepthTest(false);
     
            for (var i: number = 0; i < this.children.length; i++) {
                this.children[i].update()
            }
        }
        public resize(): void {
            for (var i: number = 0; this.children&& i < this.children.length; i++) {
                this.children[i].resize()
            }
        }
        public getObjectsUnderPoint(evt: Vector2D): UICompenent {
            for (var i: number = this.children.length - 1; i >= 0; i--) {
                var temp: UICompenent = this.children[i].getObjectsUnderPoint(evt);
                if (temp  ) {

                    return temp
                }
            }

            return null


        }
   
        public mouseEvetData(evt: InteractiveEvent, point: Vector2D): boolean  //true为有UI对象 flash为没有
        {
            var tf: boolean = false;

            for (var i: number = this.children.length-1; i >=0; i--) {
                var temp: boolean = this.children[i].mouseEvetData(evt, point);
                if (temp && !tf) {
                    tf = true
                }
            }
            var $uistageTemp: boolean = Scene_data.uiStage.interactiveEvent(evt);
            if (!tf) {
                Scene_data.uiBlankStage.interactiveEvent(evt);
                return $uistageTemp;
            } else {
                return true
            }

        
     
        }
    }
}


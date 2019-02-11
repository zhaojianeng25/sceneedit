module layout {
    import InteractiveEvent = Pan3d.InteractiveEvent
    import Vector2D = Pan3d.Vector2D
    import Rectangle = Pan3d.Rectangle;
    import UIComponent = Pan3d.UICompenent;

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
        public addPanel($panel: Panel, $isProp: Boolean = false): void {
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
        public mouseEvetData(evt: InteractiveEvent, point: Vector2D): boolean  //true为有UI对象 flash为没有
        {
            for (var i: number = this.children.length-1; i >=0; i--) {
                var temp: boolean = this.children[i].mouseEvetData(evt, point);
                if (temp) {
                    return true;
                }
            }
            return false
     
        }
    }
}


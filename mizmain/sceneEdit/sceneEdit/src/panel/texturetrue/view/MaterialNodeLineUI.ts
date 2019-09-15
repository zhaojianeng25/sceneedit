﻿module materialui {
    import Vector2D = Pan3d.Vector2D
    export class BezierClasszip {

        public static drawbezier(_array: Array<Vector2D>, _time: number): Vector2D {
            var _newarray: Array<Vector2D> = new Array()
            for (var i:number = 0; i < _array.length; i++) {
                _newarray.push(new Vector2D(_array[i].x, _array[i].y));
            }
            while (_newarray.length > 1) {
                for (var j: number = 0; j < _newarray.length - 1; j++) {
                   this. mathmidpoint(_newarray[j], _newarray[j + 1], _time)
                }
                _newarray.pop()
            }

            return _newarray[0]

        }
        private static mathmidpoint(a: Vector2D, b: Vector2D, t: number): void {
            var _nx: number, _ny: number, _nz: number;
            _nx = a.x + (b.x - a.x) * t;
            _ny = a.y + (b.y - a.y) * t;

            a.x = _nx;
            a.y = _ny;


        }
      

    }
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Scene_data = Pan3d.Scene_data;
    import ModuleEventManager = Pan3d.ModuleEventManager;


    export class MaterialNodeLineUI {
        public lineRender: NodeLineLinkComponent

        public fromNode: ItemMaterialUI;
        public endNode: ItemMaterialUI;
        public dragMode: Boolean;

        public startPoint: Vector2D;
        public endPoint: Vector2D;
        public needNodeType: boolean;
        public currentHasNode: ItemMaterialUI;

        public parent: MaterialLineContainer
        public constructor() {
            this.lineRender = new NodeLineLinkComponent
        }
        public setFromNode($node: ItemMaterialUI): void {
            if ($node.inOut) {
                this.endNode = $node;
            } else {
                this.fromNode = $node;
            }
            this.currentHasNode = $node;
            this.needNodeType = !$node.inOut;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
        }
        private mousePos: InteractiveEvent
        private onMove($e: InteractiveEvent): void {
            this.mousePos = $e
            this.draw();
     
        }
        public setEndNode($node: ItemMaterialUI): void {
            if ($node.inOut) {
                this.endNode = $node;
            } else {
                this.fromNode = $node;
            }
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            this.draw();
            this.setNodeLine();
     
        }
        public setNodeLine(): void {
            if (this.endNode.inLine) {
                var evt: MEvent_Material_Connect = new MEvent_Material_Connect(MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_REMOVELINE);
                evt.line = this.endNode.inLine;
                ModuleEventManager.dispatchEvent(evt);
            }
            if (this.endNode.typets == MaterialItemType.UNDEFINE) {
                this.endNode.changeType(this.fromNode.typets);
            }
            this.fromNode.outLineList.push(this);
            this.endNode.inLine = this;
            this.fromNode.setConnect();
            this.endNode.setConnect();

            (<NodeTreeInputItem>this.endNode.nodeTreeItem).parentNodeItem = <NodeTreeOutoutItem>this.fromNode.nodeTreeItem;
            (<NodeTreeOutoutItem>this.fromNode.nodeTreeItem).pushSunNode(<NodeTreeInputItem>this.endNode.nodeTreeItem);

        }
        public removeStage(): void {
            if (this.parent) {
                if (this.parent) {
                    Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
                }
                this.parent.removeRender(this.lineRender);
                this.parent = null
            }
        }

        public draw(): void {
            if (this.fromNode) {
                this.startPoint = this.parent.globalToLocal(this.fromNode.getStagePoint());
            } else {
                this.startPoint = this.parent.getMouse(this.mousePos)
            }
            if (this.endNode) {
                this.endPoint = this.parent.globalToLocal(this.endNode.getStagePoint());
            } else {
                this.endPoint = this.parent.getMouse(this.mousePos)
            }
            var $arr: Array<Vector2D> = new Array();
            $arr.push(this.startPoint);
            $arr.push(new Vector2D(this.startPoint.x + 100, this.startPoint.y));
            $arr.push(new Vector2D(this.endPoint.x - 100, this.endPoint.y));
            $arr.push(this.endPoint);
     
            var bzitem:Array<Vector2D>=new Array
            for (var i: number = 0; i < 100; i++) {
                bzitem.push(  BezierClasszip.drawbezier($arr,i/100))
            }

            this.lineRender.makeLineUiItem(bzitem)

        }

        public remove(): void {
            this.removeStage();
            if (this.fromNode) {
                this.fromNode.removeOut(this);
                (<NodeTreeOutoutItem>this.fromNode.nodeTreeItem).removeSunNode(<NodeTreeInputItem>this.endNode.nodeTreeItem);
            }
            if (this.endNode) {
                this.endNode.removeIn();
                (<NodeTreeInputItem>this.endNode.nodeTreeItem).parentNodeItem = null;
            }
        }
    }
}
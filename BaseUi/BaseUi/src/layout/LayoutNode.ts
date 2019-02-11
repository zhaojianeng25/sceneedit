module layout {
    import Scene_data=Pan3d.Scene_data

    export class LayoutNode {
        public   isRoot: Boolean;
        public   isEnd: Boolean;
        public   hasSun: Boolean;

        public   parentNode: LayoutNode;
        public   friendNode: LayoutNode;
        public   friendDirect: String;

        public   sun1Node: LayoutNode;
        public   sun2Node: LayoutNode;

        public   parentWidthScale: Number = 1;
        public   parentHeightScale: Number = 1;
        public   parentXScale: Number = 1;
        public   parentYScale: Number = 1;

        public   panle: TabPanel;

        public   id: String;

        //0表示横  1表示纵
        public direct: number;

        public static Left: string = "left";
        public static Right: string = "right";
        public static Top: string = "top";
        public static Bottom: string = "bottom";
        public static Center: string = "center";
        public constructor() {

        }
        private responseSprite: ResponseSprite
        public   initRootNode($newPanle: TabPanel = null): void {
            this.responseSprite = new ResponseSprite;

   
            this.responseSprite.spWidth = Scene_data.stageWidth;
            this.responseSprite.spHeight = Scene_data.stageHeight
            this.panle = $newPanle;

    
            this.isRoot = true;
            this.id = "0";
        }

        public   initNode(): void {
            this.responseSprite = new ResponseSprite;
            this.responseSprite.spWidth = Scene_data.stageWidth;
            this.responseSprite.spHeight = Scene_data.stageHeight
 
        }

        public   initCtrl(): void {

         
        }

        public   getNodeByPanle($panle: TabPanel): LayoutNode {
            if (this.panle == $panle) {
                return this;
            } else {
                var node: LayoutNode;
                if (this.sun1Node) {
                    node = this.sun1Node.getNodeByPanle($panle);
                    if (node) {
                        return node;
                    }
                }

                if (this.sun2Node) {
                    node = this.sun2Node.getNodeByPanle($panle);
                    if (node) {
                        return node;
                    }
                }
            }
            return null;
        }
 
        public   draw(): void {
           
        }

        public   getIdle(): LayoutNode {
            if (this.sun1Node == null && this.sun2Node == null) {
                return this;
            } else {

                var node: LayoutNode;
                if (this.sun2Node) {
                    node = this.sun2Node.getIdle();
                    if (node) {
                        return node;
                    }
                }

                if (this.sun1Node) {
                    node = this.sun1Node.getIdle();
                    if (node) {
                        return node;
                    }
                }

            }
            return null;
        }

        public   addSunNode(direct: String, newPanle: TabPanel = null, $per: Number = 0.5): void {
            var sunNode1: LayoutNode = new LayoutNode;
            var sunNode2: LayoutNode = new LayoutNode;
            sunNode1.parentNode = this;
            sunNode2.parentNode = this;
            sunNode1.id = this.id + "1";
            sunNode2.id = this.id + "2";
            this.sun1Node = sunNode1;
            this.sun2Node = sunNode2;
            this.hasSun = true;

 
 
            sunNode1.draw();
            sunNode2.draw();
 
        }

        public   clear(): void {
           
        }

        public   removeNode(rNode: LayoutNode): void {
            if (rNode.isRoot) {
                return;
            }

            var needNode: LayoutNode;
 
        }

        public   parentDraw(): void {
           
        }

        public   getNeedNode(rNode: LayoutNode): LayoutNode {
            var needNode: LayoutNode;
            if (rNode == this.sun1Node) {
                needNode = this.sun2Node;
            } else {
                needNode = this.sun1Node;
            }
            if (needNode == null) {
                return this.parentNode.getNeedNode(this);
            } else {
                return needNode;
            }
        }

        private   drawCtrl(): void {
           

        }

    
        private onCtrlOver(event: MouseEvent): void {

        }
        private   onCtrlOut(event: MouseEvent): void {
     
        }
        protected   onCtrlMouseDown(event: MouseEvent): void {
 
        }

        protected   onMouseUp(event: MouseEvent): void {
 
        }

        protected   onMouseMove(event: MouseEvent): void {
            
        }

        public   getWidthScale(): Number {
       
                return 1;
       
        }

        public   getHeightScale(): Number {
        
                return 1;
     
        }

        public   getXScale(): Number {
  
                return 0;
        
        }

        public   getYScale(): Number {
 
                return 0;
 
        }
    }
}


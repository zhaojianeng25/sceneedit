﻿module materialui {

    export class MathCosNodeUI extends MathStaticNodeUI {
        public constructor() {
            super();
            this.left = 600
            this.top = 300;

            this.nodeTree = new NodeTreeCos;
            this.nodeTree.ui = this;
            this.nodeTree.type = NodeTree.COS;
            this.initItem();
            this.drawTitleToFrame("余弦(cos)")



        }


    }
}
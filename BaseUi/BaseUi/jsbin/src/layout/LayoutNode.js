var layout;
(function (layout) {
    var Scene_data = Pan3d.Scene_data;
    var LayoutNode = /** @class */ (function () {
        function LayoutNode() {
            this.parentWidthScale = 1;
            this.parentHeightScale = 1;
            this.parentXScale = 1;
            this.parentYScale = 1;
        }
        LayoutNode.prototype.initRootNode = function ($newPanle) {
            if ($newPanle === void 0) { $newPanle = null; }
            this.responseSprite = new layout.ResponseSprite;
            this.responseSprite.spWidth = Scene_data.stageWidth;
            this.responseSprite.spHeight = Scene_data.stageHeight;
            this.panle = $newPanle;
            this.isRoot = true;
            this.id = "0";
        };
        LayoutNode.prototype.initNode = function () {
            this.responseSprite = new layout.ResponseSprite;
            this.responseSprite.spWidth = Scene_data.stageWidth;
            this.responseSprite.spHeight = Scene_data.stageHeight;
        };
        LayoutNode.prototype.initCtrl = function () {
        };
        LayoutNode.prototype.getNodeByPanle = function ($panle) {
            if (this.panle == $panle) {
                return this;
            }
            else {
                var node;
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
        };
        LayoutNode.prototype.draw = function () {
        };
        LayoutNode.prototype.getIdle = function () {
            if (this.sun1Node == null && this.sun2Node == null) {
                return this;
            }
            else {
                var node;
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
        };
        LayoutNode.prototype.addSunNode = function (direct, newPanle, $per) {
            if (newPanle === void 0) { newPanle = null; }
            if ($per === void 0) { $per = 0.5; }
            var sunNode1 = new LayoutNode;
            var sunNode2 = new LayoutNode;
            sunNode1.parentNode = this;
            sunNode2.parentNode = this;
            sunNode1.id = this.id + "1";
            sunNode2.id = this.id + "2";
            this.sun1Node = sunNode1;
            this.sun2Node = sunNode2;
            this.hasSun = true;
            sunNode1.draw();
            sunNode2.draw();
        };
        LayoutNode.prototype.clear = function () {
        };
        LayoutNode.prototype.removeNode = function (rNode) {
            if (rNode.isRoot) {
                return;
            }
            var needNode;
        };
        LayoutNode.prototype.parentDraw = function () {
        };
        LayoutNode.prototype.getNeedNode = function (rNode) {
            var needNode;
            if (rNode == this.sun1Node) {
                needNode = this.sun2Node;
            }
            else {
                needNode = this.sun1Node;
            }
            if (needNode == null) {
                return this.parentNode.getNeedNode(this);
            }
            else {
                return needNode;
            }
        };
        LayoutNode.prototype.drawCtrl = function () {
        };
        LayoutNode.prototype.onCtrlOver = function (event) {
        };
        LayoutNode.prototype.onCtrlOut = function (event) {
        };
        LayoutNode.prototype.onCtrlMouseDown = function (event) {
        };
        LayoutNode.prototype.onMouseUp = function (event) {
        };
        LayoutNode.prototype.onMouseMove = function (event) {
        };
        LayoutNode.prototype.getWidthScale = function () {
            return 1;
        };
        LayoutNode.prototype.getHeightScale = function () {
            return 1;
        };
        LayoutNode.prototype.getXScale = function () {
            return 0;
        };
        LayoutNode.prototype.getYScale = function () {
            return 0;
        };
        LayoutNode.Left = "left";
        LayoutNode.Right = "right";
        LayoutNode.Top = "top";
        LayoutNode.Bottom = "bottom";
        LayoutNode.Center = "center";
        return LayoutNode;
    }());
    layout.LayoutNode = LayoutNode;
})(layout || (layout = {}));
//# sourceMappingURL=LayoutNode.js.map
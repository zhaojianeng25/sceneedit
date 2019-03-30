var editscene;
(function (editscene) {
    var UIManager = Pan3d.UIManager;
    var MouseType = Pan3d.MouseType;
    var ChangeNameModel = /** @class */ (function () {
        function ChangeNameModel() {
            var _this = this;
            this.onMouseDownFun = function ($evt) { _this.onMouseDown($evt); };
        }
        ChangeNameModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new ChangeNameModel();
            }
            return this._instance;
        };
        ChangeNameModel.prototype.setInputTxtPos = function () {
            var _this = this;
            if (!this.chatHtmlInput) {
                this.chatHtmlInput = document.createElement("input");
                this.chatHtmlInput.style.position = "absolute";
                this.chatHtmlInput.style["z-index"] = 100;
                //   this.chatHtmlInput.style.background = "transparent"
                //  this.chatHtmlInput.style.color = "#000000";
                document.body.appendChild(this.chatHtmlInput);
                this.chatHtmlInput.addEventListener("change", function (cevt) { _this.changeInputTxt(cevt); });
                document.addEventListener(MouseType.MouseDown, this.onMouseDownFun);
            }
        };
        ChangeNameModel.prototype.changeInputTxt = function (evt) {
            if (this.chatHtmlInput) {
                this.changeBfun(this.chatHtmlInput.value);
                win.LayerManager.isHideMouseEvent = false;
                document.body.removeChild(this.chatHtmlInput);
                this.chatHtmlInput = null;
                document.removeEventListener(MouseType.MouseDown, this.onMouseDownFun);
            }
        };
        ChangeNameModel.prototype.getTextMetrics = function ($str, fontsize) {
            if (fontsize === void 0) { fontsize = 12; }
            var $ctx = UIManager.getInstance().getContext2D(100, 100, false);
            $ctx.font = fontsize + "px serif";
            return $ctx.measureText($str);
        };
        ChangeNameModel.prototype.changeName = function (rect, str, bfun) {
            var _this = this;
            this.changeBfun = bfun;
            this.setInputTxtPos();
            win.LayerManager.isHideMouseEvent = true;
            this.chatHtmlInput.style.left = rect.x + "px";
            this.chatHtmlInput.style.top = rect.y + "px";
            this.chatHtmlInput.style.fontSize = String(12) + "px";
            this.chatHtmlInput.style.width = String(rect.width) + "px";
            this.chatHtmlInput.style.height = String(rect.height) + "px";
            this.chatHtmlInput.value = str;
            setTimeout(function () { _this.chatHtmlInput.focus(); }, 1);
        };
        ChangeNameModel.prototype.onMouseDown = function ($e) {
            if ($e.target != this.chatHtmlInput) {
                this.changeInputTxt(null);
            }
            else {
                console.log("还在");
            }
        };
        return ChangeNameModel;
    }());
    editscene.ChangeNameModel = ChangeNameModel;
})(editscene || (editscene = {}));
//# sourceMappingURL=ChangeNameModel.js.map
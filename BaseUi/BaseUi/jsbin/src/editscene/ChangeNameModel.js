var editscene;
(function (editscene) {
    var ChangeNameModel = /** @class */ (function () {
        function ChangeNameModel() {
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
                //this.chatHtmlInput.style.background = "transparent"
                this.chatHtmlInput.style.color = "#000000";
                document.body.appendChild(this.chatHtmlInput);
                this.chatHtmlInput.addEventListener("change", function (cevt) { _this.changeInputTxt(cevt); });
            }
        };
        ChangeNameModel.prototype.changeInputTxt = function (evt) {
            this.changeBfun(this.chatHtmlInput.value);
            win.LayerManager.isHideMouseEvent = false;
            document.body.removeChild(this.chatHtmlInput);
            this.chatHtmlInput = null;
        };
        ChangeNameModel.prototype.changeName = function (rect, str, bfun) {
            this.changeBfun = bfun;
            this.setInputTxtPos();
            win.LayerManager.isHideMouseEvent = true;
            this.chatHtmlInput.style.left = rect.x + "px";
            this.chatHtmlInput.style.top = rect.y + "px";
            this.chatHtmlInput.style.fontSize = String(12) + "px";
            this.chatHtmlInput.style.width = String(rect.width) + "px";
            this.chatHtmlInput.style.height = String(rect.height) + "px";
            this.chatHtmlInput.value = str;
            this.chatHtmlInput.focus();
        };
        return ChangeNameModel;
    }());
    editscene.ChangeNameModel = ChangeNameModel;
})(editscene || (editscene = {}));
//# sourceMappingURL=ChangeNameModel.js.map
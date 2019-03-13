var maineditor;
(function (maineditor) {
    var EditorModel = /** @class */ (function () {
        function EditorModel() {
            this.selectItem = [];
            this.fileItem = [];
        }
        EditorModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new EditorModel();
            }
            return this._instance;
        };
        EditorModel.prototype.addSelctItem = function (value, isShift) {
            console.log("isShift", isShift);
            if (isShift) {
                for (var i = 0; i < value.length; i++) {
                    if (this.selectItem.indexOf(value[i]) == -1) {
                        this.selectItem.push(value[i]);
                    }
                }
            }
            else {
                this.selectItem = value;
            }
        };
        EditorModel.prototype.mouseHitSprite = function (item, mouseVect2d, selectArr) {
            for (var i = 0; i < item.length; i++) {
                var hit = xyz.TooMathHitModel.testHitModel(item[i].dis, item[i].dis._scene, mouseVect2d);
                if (hit) {
                    selectArr.push(item[i]);
                }
            }
        };
        EditorModel.prototype.selectModel = function (mouseVect2d) {
            var tempItem = [];
            this.mouseHitSprite(this.fileItem, mouseVect2d, tempItem);
            return tempItem;
        };
        return EditorModel;
    }());
    maineditor.EditorModel = EditorModel;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=EditorModel.js.map
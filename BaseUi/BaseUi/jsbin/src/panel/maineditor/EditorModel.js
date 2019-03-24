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
        EditorModel.prototype.keyDeleSelectItem = function () {
            if (this.selectItem.length) {
                var truthBeTold = window.confirm("是否确定要删除选取的对象。");
                if (truthBeTold) {
                    this.deleSelectItem();
                }
                else {
                }
            }
        };
        EditorModel.prototype.deleSelectItem = function () {
            while (this.selectItem.length) {
                var vo = this.selectItem.pop();
                this.hierarchyListPanel.deleFile(this.fileItem, vo);
            }
            Pan3d.ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.CLEAR_XYZ_MOVE_DATA));
        };
        EditorModel.prototype.mouseHitSprite = function (item, mouseVect2d, selectArr) {
            var nearDis;
            var selectModel;
            for (var i = 0; i < item.length; i++) {
                var hit = xyz.TooMathHitModel.testHitModel(item[i].dis, item[i].dis._scene, mouseVect2d);
                if (hit > 0) {
                    if (!nearDis || hit < nearDis) {
                        nearDis = hit;
                        selectModel = item[i];
                    }
                }
            }
            if (selectModel) {
                selectArr.push(selectModel);
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
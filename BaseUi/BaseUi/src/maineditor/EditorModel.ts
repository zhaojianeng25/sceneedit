module maineditor {
    export class EditorModel {
        public static _instance: EditorModel;
        public static getInstance(): EditorModel {
            if (!this._instance) {
                this._instance = new EditorModel();
            }
            return this._instance;
        }
        constructor() {
            this.selectItem=[]
            this.fileItem=[]
        }
        public hierarchyListPanel: HierarchyListPanel
        public selectItem: Array<FolderMeshVo>

        public addSelctItem(value: Array<FolderMeshVo>, isShift: boolean): void {
            if (isShift) {
                for (var i: number = 0; i < value.length; i++) {
                    if (this.selectItem.indexOf(value[i]) == -1) {
                        this.selectItem.push(value[i]);
                    }
                }
            } else {
                this.selectItem = value
            }
  
        }
        public keyDeleSelectItem(): void {
            if (this.selectItem.length) {
                var truthBeTold = window.confirm("单击“确定”继续。单击“取消”停止。");
                if (truthBeTold) {
                    this.deleSelectItem()
                } else {

                }
            }
        }
        public deleSelectItem(): void {
            while (this.selectItem.length) {
                var vo: FolderMeshVo = this.selectItem.pop();
                this.hierarchyListPanel.deleFile(this.fileItem, vo);
            }
        }
        public fileItem: Array<FolderMeshVo>;

        private mouseHitSprite(item: Array<FolderMeshVo>, mouseVect2d: Vector2D,selectArr: Array<FolderMeshVo>): void {
            for (var i: number = 0; i < item.length; i++) {
                var hit: boolean = xyz.TooMathHitModel.testHitModel(item[i].dis, item[i].dis._scene, mouseVect2d);
                if (hit) {
                    selectArr.push(item[i])
                }
            }
        }
        public selectModel(mouseVect2d: Vector2D): Array<FolderMeshVo> {
            var tempItem: Array<FolderMeshVo>=[]
            this.mouseHitSprite(this.fileItem, mouseVect2d, tempItem)
            return tempItem
        }
        
    }
}
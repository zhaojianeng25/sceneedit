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
        public openFileByUrl(fileUrl: string): void {
      
            if (fileUrl.indexOf(".map") != -1) {
                Pan3d.  ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.LOAD_SCENE_MAP), fileUrl); //加载场景
                Pan3d. ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_MAIN_EDITOR_PANEL));
            }
            if (fileUrl.indexOf(".material") != -1) {

                Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.SHOW_MATERIA_PANEL), fileUrl);
            }

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
                var truthBeTold = window.confirm("是否确定要删除选取的对象。" );
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
            Pan3d.  ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.CLEAR_XYZ_MOVE_DATA))
        }
        public fileItem: Array<FolderMeshVo>;

        private mouseHitSprite(item: Array<FolderMeshVo>, mouseVect2d: Vector2D, selectArr: Array<FolderMeshVo>): void {

            var nearDis: number;
            var selectModel: FolderMeshVo;
            for (var i: number = 0; i < item.length; i++) {
                var hit: number = xyz.TooMathHitModel.testHitModel(item[i].dis, item[i].dis._scene, mouseVect2d);
                if (hit!=0) {
                    if (!nearDis || hit<nearDis ) {
                        nearDis = hit
                        selectModel= item[i]
                    } 
                }
            }
            if (selectModel) {
                console.log(nearDis)
                selectArr.push(selectModel)

                console.log("-----------------------")
            }
 
        }
        public selectModel(mouseVect2d: Vector2D): Array<FolderMeshVo> {
            var tempItem: Array<FolderMeshVo>=[]
            this.mouseHitSprite(this.fileItem, mouseVect2d, tempItem)
            return tempItem
        }
        
    }
}
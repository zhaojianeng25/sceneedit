module prop {
  
    export class UiMeshSprite extends win.Sprite {
        public resize(): void {
            super.resize();
            if (this.perent) {
                this.rect = this.perent.rect
            }  
            for (var i: number = 0; i < this._containerList.length; i++) {
                    this._containerList[i].left = this.rect.x
                    this._containerList[i].top = this.rect.y+100;
            }
            for (var i: number = 0; i < this.metaViewItem.length; i++) {
                this.metaViewItem[i].top = this.rect.y + this.metaViewItem[i].y;
                this.metaViewItem[i].width = this.rect.width;
                this.metaViewItem[i].resize();
            }
        }

        public onAdd(): void {
            for (var i: number = 0; i < this.metaViewItem.length; i++) {
                this.metaViewItem[i].onAdd()
            }
        }

        public onRemove(): void {
            for (var i: number = 0; i < this.metaViewItem.length; i++) {
                this.metaViewItem[i].onRemove()
          
            }
        }
     
     
        public addBaseMeshUi(value: BaseMeshUi) {
            this.addUIContainer(value.textureContext)
            this.resize();
        }
   
        private metaViewItem: Array<MetaDataView> = []
        public addMeshView(value: MetaDataView): void {
            this.metaViewItem.push(value)
        }

    }
}
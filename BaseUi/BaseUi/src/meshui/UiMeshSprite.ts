module prop {
  
    export class UiMeshSprite extends win.Sprite {
        public resize(): void {
            super.resize();
            if (this.perent) {
                this.rect = this.perent.rect
            }
            for (var i: number = 0; i < this._containerList.length; i++) {
                this._containerList[i].left = this.rect.x
                this._containerList[i].top = this.rect.y;
            }
        }
        public addBaseMeshUi(value: BaseMeshUi) {
            this.addUIContainer(value.textureContext)
            this.resize();
        }
        public romveBaseMeshUi(value: BaseMeshUi) {
            this.removeUIContainer(value.textureContext)
        }

    }
}
module scene3d.me {
    export class ExpTextJumpUiDrawAndRefreash256 extends Pan3d.me.ExpTextJumpUiDrawAndRefreash {

        protected drawTxtBydigitalAndtext($vo: Pan3d.me.TextJumpUiVo): number {
            var rec: Pan3d.me.UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = Pan3d.me.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var picid = $vo.type;
            var $width = 50;
            var $height = 25;
            var txtcolor: string;
            if ($vo.type == Pan3d.me.TextJumpType.EXPERIENCE) {
                txtcolor = Pan3d.me.ArtFont.num54
            }
            var distion = Pan3d.me.ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);
            distion += $width;
            Pan3d.me.UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new Pan3d.me.Rectangle(rec.pixelWitdh - distion, rec.pixelHeight - $height, $width, $height), Pan3d.me.UIData.publicUi);

            Pan3d.me. ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, rec.pixelWitdh - distion + $width + 2, rec.pixelHeight - $height);

            Pan3d.me.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);

            return distion;
        }


     
    }
}
module scene3d.me {
    export class OverrideBloodManager extends Pan3d.me.BloodManager {
        public static getInstance(): OverrideBloodManager {
            if (!Pan3d.me.BloodManager._instance) {
                console.log("一定要到这里--->复写飘字")
                Pan3d.me. BloodManager._instance = new OverrideBloodManager();
            }
            return <OverrideBloodManager>Pan3d.me.BloodManager._instance;
        }
        private _jumpText256_256: Pan3d.me.AlphaUiContianer
        constructor() {
            super()
 
            this._jumpText256_256 = new Pan3d.me.AlphaUiContianer(scene3d.me.ExpTextJumpUiDrawAndRefreash256, new Pan3d.me.Rectangle(0, 0, 256, 256), 2);
            this.uiContianerItem.push(this._jumpText256_256);
        }
        public setExpJump256_256Num($textJumpUiVo: Pan3d.me.TextJumpUiVo): void {
            this._jumpText256_256.showTemp($textJumpUiVo);
            console.log($textJumpUiVo)
        }

    }
}
﻿module scene2d.me
{


    export class Scene2dChar extends Pan3d.me.SceneChar {

        public setWeaponByAvatar(avatar: number, $suffix: string = ""): void {
            this.addPart(Pan3d.me.SceneChar.WEAPON_PART, Pan3d.me.SceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(avatar, $suffix));
        }


        public setWingByID($wingId: string): void {
            if (!this._wingDisplay) {
                this._wingDisplay = new Pan3d.me.SceneBaseChar();
            }
            this._wingDisplay.setRoleUrl(getRoleUrl($wingId));
            this._wingDisplay.setBind(this, Pan3d.me.SceneChar.WING_SLOT);
            Pan3d.me.SceneManager.getInstance().addMovieDisplay(this._wingDisplay);
        }


        public setMountById($mountId: string): void {
            if (!this.mountChar) {
                this.mountChar = new Pan3d.me.MountChar();
            }
            this.mountChar.setRoleUrl(getRoleUrl($mountId));
            this.setBind(this.mountChar, Pan3d.me.SceneChar.MOUNT_SLOT);
            Pan3d.me. SceneManager.getInstance().addMovieDisplay(this.mountChar);

            this.isMount = true
        }
        public set2dPos($x: number, $y: number): void {
            this.x = $x * Override2dEngine.htmlScale;
            this.z = $y * Override2dEngine.htmlScale / (Math.sin(45 * Math.PI / 180)) * -1;
            if (this.mountChar) {
                this.mountChar.x = this.x;
                this.mountChar.z = this.z;
            }
        }
        public set rotationY(value: number) {
            this._rotationY = value;
            if (this.mountChar) {
                this.mountChar.rotationY = this._rotationY;
            }
            this.updateMatrix();
            this.updateRotationMatrix();
        }
     

    }

}
/**
* name 
*/
module layapan_me {
    import CombineParticle = Pan3d.CombineParticle
    import MeshData = Pan3d.MeshData
    import BindParticle = Pan3d.BindParticle
    import Scene_data = Pan3d.Scene_data
    import ParticleManager = Pan3d.ParticleManager
    import GroupRes = Pan3d.GroupRes
    import GroupItem = Pan3d.GroupItem
    import Vector3D = Pan3d.Vector3D
    import BaseRes = Pan3d.BaseRes
    import Material = Pan3d.Material
    import TexItem = Pan3d.TexItem
    import MaterialBaseParam = Pan3d.MaterialBaseParam
    import Shader3D = Pan3d.Shader3D
    import MaterialAnimShader = Pan3d.MaterialAnimShader

    import Display3DSprite = Pan3d.Display3DSprite
    import ShadowManager = Pan3d.ShadowManager
    import Skill = Pan3d.Skill
    
 
  
    export class LayaSceneBaseChar extends Pan3d.Display3dMovie {
        private _avatar: number = -1;
   
        public _visible: boolean = true
        public changeColor: Array<number> = [1, 1, 1, 1]
        constructor() {
            super();
            this.x
        }
        public set alpha(value: number) {
            this._alpha = value;
            this.changeColor[0] = 1
            this.changeColor[1] = 1
            this.changeColor[2] = 1
            this.changeColor[3] = value
        }
        private _alpha: number = 1;
        public get alpha(): number {
            return this._alpha
        }
        public updateMaterialMesh($mesh: MeshData): void {
            if (this.changeColor[0] != 1 || this.changeColor[1] != 1 || this.changeColor[2] != 1 || this.changeColor[3] != 1) {
                if (!LayaSceneBaseChar.alphaShader) {
                    LayaSceneBaseChar.alphaShader = this.makeAlphaShader();
                }
                var $selfShader = $mesh.material.shader
                $mesh.material.shader = LayaSceneBaseChar.alphaShader
                Scene_data.context3D.setProgram(LayaSceneBaseChar.alphaShader.program);
                Scene_data.context3D.cullFaceBack(false);
                Scene_data.context3D.setBlendParticleFactors(-1);
                this.setVcMatrix($mesh);
                this.setMaterialTextureAlpha($mesh.material, $mesh.materialParam);
                this.setVa($mesh);
                Scene_data.context3D.setVc4fv($mesh.material.shader, "alphadata", this.changeColor);
                this.setMeshVc($mesh);
                Scene_data.context3D.drawCall($mesh.indexBuffer, $mesh.treNum);
                $mesh.material.shader = $selfShader;
            } else {
                super.updateMaterialMesh($mesh);
            }
        }
        public skillVo: Skill;
        protected _walkPath: Array<Vector3D>;
        public playSkill($skill: Skill): void {

            var $scene: LayaOverride2dSceneManager = <LayaOverride2dSceneManager>this._scene;
            this._walkPath = null;
            $scene.skillManager.playSkill(<OverrideSkill>$skill);
            this.skillVo = $skill;
        }
        public setMaterialTextureAlpha($material: Material, $mp: MaterialBaseParam = null): void {
            //透明的时候只显示一个主材质贴图
            var texVec: Array<TexItem> = $material.texList;
            for (var i: number = 0; i < texVec.length; i++) {
                if (texVec[i].isMain) {
                    var txte: WebGLTexture = texVec[i].texture;
                    var $has: boolean = false;
                    if ($mp) {
                        for (var j = 0; j < $mp.dynamicTexList.length; j++) {
                            if ($mp.dynamicTexList[j].target) {
                                if ($mp.dynamicTexList[j].target.name == texVec[i].name) {
                                    txte = $mp.dynamicTexList[j].texture;
                                }
                            }
                        }
                    }
                    Scene_data.context3D.setRenderTexture($material.shader, "alphatexture", txte, 0);
                }
            }
        }
        private static alphaShader: Shader3D
        private makeAlphaShader(): Shader3D {
            var shader: Shader3D = new MaterialAnimShader();
            shader.paramAry = [false, false, false, false, false, false, false, 0]
            shader.fragment =
                "precision mediump float;\n" +
                "uniform sampler2D alphatexture;\n" +
                "uniform vec4 alphadata;\n" +
                "varying vec2 v0;\n" +
                "void main(void){\n" +
                "vec4 ft0 = texture2D(alphatexture,v0);\n" +
                "gl_FragColor =ft0*alphadata;\n" +

                "}"
            var encodetf: boolean = shader.encode();
            return shader
        }


		public get visible(): boolean {
			return this._visible
		}
		public set visible(value: boolean) {
			this._visible = value
		}

		public setAvatar(num: number): void {

			if (this._avatar == num) {
				return;
			}
			this._avatar = num;
			this.setRoleUrl(this.getSceneCharAvatarUrl(num));


        }
        public set shadow(value: boolean) {
            var $scene: LayaOverride2dSceneManager = <LayaOverride2dSceneManager>this._scene;
            if (value) {
                if (!this._shadow) {
                    this._shadow = $scene.shadowManager.addShadow();
                }
            } else {
                if (this._shadow) {
                    $scene.shadowManager.removeShadow(this._shadow);
                }
            }
        }
		public update(): void {
			if (this.visible) {
				super.update()
			}
			if (this._shadow) {
				this._shadow._visible = this.visible;
			}
		}

		protected getSceneCharAvatarUrl(num: number): string {

			var $url: string = getRoleUrl(String(num))
			return getRoleUrl(String(num));
		}
		protected getSceneCharWeaponUrl(num: number, $suffix: string = ""): string {
			return getModelUrl(String(num + $suffix));
		}

		// 是否播放中
		isPlaying():boolean{
			// if(this._completeState != 1){
			// 	return true;
			// }
			
			return this._completeState != 1 || !this._curentFrame || (this._curentFrame < (this._animDic[this.curentAction].matrixAry.length - 1));
        }

        protected loadPartRes($bindSocket: string, groupRes: GroupRes, ary: Array<any>): void {
            if (this._hasDestory) {
                return;
            }
            for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                var item: GroupItem = groupRes.dataAry[i];

                var posV3d: Vector3D;
                var rotationV3d: Vector3D;
                var scaleV3d: Vector3D;
                if (item.isGroup) {
                    posV3d = new Vector3D(item.x, item.y, item.z);
                    rotationV3d = new Vector3D(item.rotationX, item.rotationY, item.rotationZ);
                    scaleV3d = new Vector3D(item.scaleX, item.scaleY, item.scaleZ);
                }

                if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                    var particle: CombineParticle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                    ary.push(particle);
                    particle.bindTarget = this;
                    particle.bindSocket = $bindSocket;
                    particle.dynamic = true;
                    (<LayaOverride2dSceneManager>this._scene).particleManager.addParticle(particle);
                    if (item.isGroup) {
                        particle.setGroup(posV3d, rotationV3d, scaleV3d);
                    }
                } else if (item.types == BaseRes.PREFAB_TYPE) {
                    var display: Display3DSprite = new Display3DSprite();
                    display.setObjUrl(item.objUrl);
                    display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                    display.dynamic = true;
                    ary.push(display);
                    display.setBind(this, $bindSocket);
                    this._scene.addSpriteDisplay(display);
                    if (item.isGroup) {
                        display.setGroup(posV3d, rotationV3d, scaleV3d);
                    }

                }

            }

            this.applyVisible();

        }

        public removeStage(): void {
            this._onStage = false;
            if (this._shadow) {
                ShadowManager.getInstance().removeShadow(this._shadow);
            }
            for (var key in this._partDic) {
                var ary: Array<any> = this._partDic[key];
                for (var i: number = 0; i < ary.length; i++) {
                    if (ary[i] instanceof CombineParticle) {
                        (<LayaOverride2dSceneManager>this._scene).particleManager.removeParticle(ary[i]);
                    } else if (ary[i] instanceof Display3DSprite) {
                        (<LayaOverride2dSceneManager>this._scene).removeSpriteDisplay(ary[i]);
                    }

                }

            }
        }
        public get px(): number {
            return this.x
        }
        public set px(value: number) {
            this.x = value
        }
        public get py(): number {
            return this.y
        }
        public set py(value: number) {
            this.y = value
        }
        public get pz(): number {
            return this.z
        }
        public set pz(value: number) {
            this.z = value
        }
        public addSkinMeshParticle(): void {
            if (!this._skinMesh) {
                return;
            }
            var dicAry: Array<CombineParticle> = new Array;
            this._partDic["mesh"] = dicAry;

            var meshAry: Array<MeshData> = this._skinMesh.meshAry;
            if (!meshAry) {
                return;
            }
            for (var i: number = 0; i < meshAry.length; i++) {
                var particleAry: Array<BindParticle> = meshAry[i].particleAry;
                for (var j: number = 0; j < particleAry.length; j++) {
                    var bindPartcle: BindParticle = particleAry[j];

                    var particle: CombineParticle;

                    particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + bindPartcle.url);

                    if (!particle.sourceData) {
                        console.log("particle.sourceData error");
                    }

                    particle.dynamic = true;

                    particle.bindSocket = bindPartcle.socketName;

                    dicAry.push(particle);

                    particle.bindTarget = this;

                    (<LayaOverride2dSceneManager>this._scene).particleManager.addParticle(particle);

                }
            }
        }
	}
}
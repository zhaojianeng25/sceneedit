module maineditor {

    import Matrix3D = Pan3d.Matrix3D
    import CombineParticle = Pan3d.CombineParticle
    import Display3DSprite = Pan3d.Display3DSprite
    import SkillStatcMesh = pack.SkillStatcMesh

    export class SkillSpriteDisplay extends Display3DSprite {
        public constructor() {
            super()
            this.waitLoadUrl = []

            this.roleChar = new layapan.LayaSceneChar();
        }
        private waitLoadUrl: Array<string>;
        public addSkillByUrl($url): void {
            if (this._scene) {
                this.loadTempByUrl($url)
            } else {
                this.waitLoadUrl.push($url);
            }
 
        }
        public addStage(): void {
            super.addStage()
            while (this.waitLoadUrl.length) {
                this.loadTempByUrl(this.waitLoadUrl.pop());
            }
        }
        public skillStaticMesh: pack.SkillStatcMesh;
        private roleChar: layapan.LayaSceneChar 
        private loadTempByUrl(value: string): void {

 
            pack.PackSkillManager.getInstance().getPrefabByUrl(value, (temp: SkillStatcMesh) => {
                this.skillStaticMesh = temp;
                this.skillStaticMesh.roleUrl = "role/ssqx.txt"
                this.skillStaticMesh.skillUrl = "pefab/技能/ssqx.txt"
 
                var tempScene: EdItorSceneManager = <EdItorSceneManager>this._scene
                this.roleChar.setRoleUrl(this.skillStaticMesh.roleUrl);
                tempScene.addMovieDisplay(this.roleChar)

            })

 
            /*
 
            var $skill: layapan.OverrideSkill = tempScene.skillManager.getSkill(value, "skill_0022")
            if ($skill) {
                $skill.reset();
                $skill.isDeath = false;
            }
            mainChar.playSkill($skill)

*/
 
 
        }
 
    }
}
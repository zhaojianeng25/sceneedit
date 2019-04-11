module maineditor {

    import Matrix3D = Pan3d.Matrix3D
    import CombineParticle = Pan3d.CombineParticle
    import Display3DSprite = Pan3d.Display3DSprite

    export class SkillSpriteDisplay extends Display3DSprite {
        public constructor() {
            super()
            this.waitLoadUrl = []
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
 
        private loadTempByUrl(value: string): void {

            var tempScene: EdItorSceneManager = <EdItorSceneManager>this._scene

            var mainChar: layapan.LayaSceneChar = new layapan.LayaSceneChar();
            mainChar.setRoleUrl("role/ssqx.txt");
            tempScene.addMovieDisplay(mainChar)
 
            var $skill: layapan.OverrideSkill = tempScene.skillManager.getSkill(value, "skill_0022")
            if ($skill) {
                $skill.reset();
                $skill.isDeath = false;
            }
            mainChar.playSkill($skill)
 
 
        }
 
    }
}
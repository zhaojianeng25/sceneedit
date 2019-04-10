module maineditor {

    import Matrix3D = Pan3d.Matrix3D
    import CombineParticle = Pan3d.CombineParticle
    import Display3DSprite = Pan3d.Display3DSprite

    export class SkillSpriteDisplay extends Display3DSprite {
        public constructor() {
            super()
 
        }
        public addSkillByUrl(value): void {

            console.log("value", value)

        }
 
    }
}
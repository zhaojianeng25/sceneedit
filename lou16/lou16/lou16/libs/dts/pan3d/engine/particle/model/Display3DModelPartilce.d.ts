declare module Pan3d.me {
    class Display3DModelPartilce extends Display3DParticle {
        protected _resultUvVec: Array<number>;
        constructor();
        readonly modeldata: ParticleModelData;
        creatData(): void;
        setVc(): void;
        setVa(): void;
        updateWatchCaramMatrix(): void;
        updateUV(): void;
    }
}

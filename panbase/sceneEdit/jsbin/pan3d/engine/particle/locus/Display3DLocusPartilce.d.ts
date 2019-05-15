declare module Pan3d.me {
    class Display3DLocusPartilce extends Display3DParticle {
        constructor();
        readonly locusdata: ParticleLocusData;
        creatData(): void;
        setVa(): void;
        setVc(): void;
        updateUV(): void;
    }
}

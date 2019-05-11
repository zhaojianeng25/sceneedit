declare module materialui {
    class NodeTree {
        static TEX: string;
        static TEX3D: string;
        static TEXCUBE: string;
        static OP: string;
        static ADD: string;
        static SUB: string;
        static MUL: string;
        static FUN: string;
        static DIV: string;
        static RCP: string;
        static MIN: string;
        static MAX: string;
        static FRC: string;
        static SQT: string;
        static RSQ: string;
        static POW: string;
        static LOG: string;
        static EXP: string;
        static NRM: string;
        static SIN: string;
        static COS: string;
        static CRS: string;
        static DP3: string;
        static DP4: string;
        static ABS: string;
        static NEG: string;
        static SAT: string;
        static LERP: string;
        static VEC3: string;
        static VEC2: string;
        static FLOAT: string;
        static NORMAL: string;
        static TIME: string;
        static TEXCOORD: string;
        static TEXCOORDLIGHT: string;
        static DYNVEC3: string;
        static PTCOLOR: string;
        static VERCOLOR: string;
        static HEIGHTINFO: string;
        static FRESNEL: string;
        static REFRACTION: string;
        static PANNER: string;
        inputVec: Array<NodeTreeInputItem>;
        outputVec: Array<NodeTreeOutoutItem>;
        ui: BaseMaterialNodeUI;
        type: string;
        paramName: string;
        canDynamic: boolean;
        regResultTemp: RegisterItem;
        regResultConst: RegisterItem;
        regResultTex: RegisterItem;
        regConstIndex: number;
        priority: number;
        shaderStr: string;
        static jsMode: boolean;
        constructor();
        addInput($in: NodeTreeItem): void;
        removeInput($in: NodeTreeItem): void;
        addOutput($in: NodeTreeItem): void;
        removeOutput($out: NodeTreeItem): void;
        static getID($constID: number): string;
        refreshID(): void;
        id: number;
        getObj(): Object;
        isDynamic: boolean;
        private _isDynamic;
        checkInput(): Boolean;
        getComponentID($id: number): string;
        releaseUse(): void;
    }
}

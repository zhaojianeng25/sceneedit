declare module editscene {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    class MenuListData {
        label: string;
        level: number;
        subMenu: Array<MenuListData>;
        select: boolean;
        key: string;
        constructor($label: string, $key?: string);
    }
    class LabelTxtVo extends Disp2DBaseText {
        uiScale: number;
        makeData(): void;
    }
    class EditTopMenuPanel extends Dis2DUIContianerPanel {
        static _instance: any;
        static getInstance(): EditTopMenuPanel;
        private _bottomRender;
        constructor();
        private winBg;
        private loadConfigCom;
        resize(): void;
        private menuXmlItem;
        initMenuData(value: any): void;
        private getMenu0;
        private getMenu1;
        private getMenu2;
        makeSceneTopMenu(): void;
        makeTextureTopMenu(): void;
        private menuBfun;
        private isRoleFile;
        private inputH5roleRes;
        private changeZZW;
        showMainUi(): void;
        private onStageMouseUp;
        showTempMenu($data: MenuListData, i: number, tx: number, ty: number): LabelTxtVo;
        clearTemp($data: any): void;
        private setColorByLevel;
        private removeOtherSonMenu;
        protected butMove(evt: InteractiveEvent): void;
        private bfun;
        protected onMouseUp(evt: InteractiveEvent): void;
        private showSon;
    }
}


 
import Graphics = Laya.Graphics;                //laya.display.Graphics;
import Stage = Laya.Stage
import TextInput = Laya.TextInput;              //laya.ui.TextInput;
import TextArea = Laya.TextArea;                //laya.ui.TextArea;
import Button = Laya.Button;                    //laya.ui.Button;
import Box = Laya.Box;                          //laya.ui.Box;
import ProgressBar = Laya.ProgressBar;          //laya.ui.ProgressBar;
import List = Laya.List;                        //laya.ui.List;
import LImage = Laya.Image;                     //laya.ui.Image;
import Label = Laya.Label;                      //laya.ui.Label;
import Panel = Laya.Panel;
import CheckBox = Laya.CheckBox;
import LEvent = Laya.Event;
import Socket = Laya.Socket;                    //laya.net.Socket;
 
import HttpRequest = Laya.HttpRequest;          //laya.net.HttpRequest;
import LocalStorage = Laya.LocalStorage;        //laya.net.LocalStorage

import Texture = Laya.Texture;                  //laya.resource.Texture;
import Templet = Laya.Templet;                  //laya.ani.bone.Templet
import Skeleton = Laya.Skeleton;

import Byte = Laya.Byte;                        //laya.utils.Byte;
import Handler = Laya.Handler;                  //laya.utils.Handler;
 
import Dictionary = Laya.Dictionary;            //laya.utils.Dictionary;

import Matrix = Laya.Matrix;                    //laya.maths.Matrix;
import Rectangle = Laya.Rectangle;              //laya.maths.Rectangle;
import Point = Laya.Point;                      //laya.maths.Point;

 
import EventDispatcher = Laya.EventDispatcher;  //laya.events.EventDispatcher 

// import SoundManager = Laya.SoundManager;        //laya.media.SoundManager;

import GlowFilter = Laya.GlowFilter;            //laya.filters.GlowFilter;
import ColorFilter = Laya.ColorFilter;          //laya.filters.ColorFilter;
 

import Timer = laya.utils.Timer;

//import Protocols = hanlder.Protocols;
 
import Scene_data = Pan3d.Scene_data;
 
import Display3D = Pan3d.Display3D;
import Display3dMovie = Pan3d.Display3dMovie;
import Browser = Laya.Browser;

import Game2dDemo= base.Game2dDemo
 

// 是否iphoneX
var onIPhoneX: boolean = false;

 

// 启动程序
class Launch {
    // 美术设计画布像素高宽
    widthDesginPixelw: number = 750;
    heightDesginPixelw: number = 1334;
    minSacleDesginPixelw: number = 0.5625;
    maxSacleDesginPixelw: number = 0.64;
    // 浏览器可视画布像素高宽
    private _clientWidth: number;
    private _clientHeight: number;
    // 浏览器可视高宽（在设备上的像素高宽）
    private _designWidth: number = 0;
    private _designHeight: number = 0;
    // 客户端画布缩放比
    private _clientScale: number = 1;
    // 场景缩放比(基于客户端画布缩放比)
    private _sceneScale: number = 1.17;
    private _tweenScale: boolean = false;
 
    // 是否休眠
    isBlur: boolean = false;

    private _showStat: boolean = false;
    get showStat(): boolean {
        return this._showStat;
    }
    set showStat(v: boolean) {
        this._showStat = v;
        this._showStat ? Laya.Stat.show() : Laya.Stat.hide();
    }
    get sceneScale():number{
        return this._sceneScale;
    }
    set sceneScale(v: number) {
        if (this._sceneScale == v) return;
        this._sceneScale = v;
        this.onResize();
    }
    private _canvas: HTMLCanvasElement;
    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    constructor() {
 

        isDebug = (location.href.indexOf("file") == 0);
        // 初始化舞台
        this. _canvas= Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);

        Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
        Pan3d.Scene_data.fileuiRoot = "res/";
        Pan3d.Scene_data.fileRoot = "res/";
        //   Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";
        Pan3d.Engine.init(this.canvas);


        // 是否IPhoneX
        if (Browser.onIPhone && Math.abs(Browser.pixelRatio - 3) < 0.01) {
            onIPhoneX = (Browser.clientWidth == 375 && Browser.clientHeight == 812) || (Browser.clientWidth == 812 && Browser.clientHeight == 375);
        }
        // 引擎有bug这个鬼东西暂时不能设置
        // Laya.AtlasResourceManager.atlasTextureWidth = 1024;
        // Laya.AtlasResourceManager.atlasTextureHeight = 1024;
        Laya.AtlasResourceManager.maxTextureCount = 1;

        // 抗锯齿
        Config.isAntialias = true;

        //启用DebugPanel调试面板
        //Laya.DebugTool.init();

        //log_level = 1;
        this.checkWorkerLoaderEnable();




        ////////////////连接服务器////////////////////////////////////
        logd("Browser.window.username:", Browser.window.username);
        logl("Browser.window.username:", Browser.window.username);
 
        //this.netWork.connectByUrl(Browser.window.server);
        // this.addNetworkListener(this.netWork);
        //game.modules.ModuleManager.init(game.modules.LoadModuleCmd);



        // this.showStat = isDebug;

        Laya.loader.maxLoader = 3;
        Laya.loader.retryNum = 10;
        Laya.loader.retryDelay = 500;

 
 

        
        let onPC = Browser.onPC;
        if (!onPC) {
            if (window.orientation == 0) {
                Laya.stage.screenMode = Stage.SCREEN_VERTICAL;
            }
            // else if (window.orientation == 90 || window.orientation == -90) {
            //     Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
            // }
            window.addEventListener("orientationchange", (e) => {
                this.lockOrientation = false;
                Laya.stage.screenMode = Stage.SCREEN_NONE;
            });
            // 默认场景最小
            // this._sceneScale = 0.8;
        }
        // Vesion.addSearchPath("CN/", "data.bin");

 
        logd('game_start');

        var picA: Laya.Image = new Laya.Image("res/ui/icon/lyf_64x.png");
        Laya.stage.addChild(picA)
        picA.scale(0.5, 0.5)
        picA.pos(600, 170)

        var spriteD: Game2dDemo = new Game2dDemo("res/ui/icon/512b.jpg", () => {
            spriteD.scale(2, 1)
        })
        Laya.stage.addChild(spriteD);
        spriteD.pos(200, 250);
    }
 
 

    private checkWorkerLoaderEnable(): void {
        let workerLoaderEnable = false;
   
    }
    
    private init(): void {
      
    }

    private _prevUpdateTimer: number;
    // 心跳更新
    private onUpdate(): void {
        let timer = Laya.timer.currTimer;
        let diff = timer - this._prevUpdateTimer;
        // logd('Launch.onUpdate', timer - this._prevUpdateTimer, diff);   
        this._prevUpdateTimer = timer;
        if (!diff) {
            return;
        }
        // 这样做才能防止白边
        this.checkClientSize();

        // 更新设计分辨率
        // Laya.stage.designWidth = this._designWidth;
        if (Laya.stage.width != this._designWidth)
            Laya.stage.width = this._designWidth;
        // Laya.stage.designHeight = this._designHeight;
        if (Laya.stage.height != this._designHeight)
            Laya.stage.height = this._designHeight;
        // 心跳
        // let diff = Laya.timer.delta;
        
   
    }

    // 鼠标按下
    private onMouseDown(e: LEvent): void {
  
    }

    // 鼠标移动
    private onMouseMove(e: LEvent): void {

    }
    
    // 鼠标弹起
    private onMouseUp(e: LEvent): void {
     
    }

    // 鼠标移开
    private onMouseOut(e: LEvent): void {
       
    }

    private onKeyDown(e: LEvent): void {
       
    }

    // 休眠
    private onBlur(): void {
        this.isBlur = true;
 
    }

    // 激活
    private onFocus(): void {
        this.isBlur = false;
    
    }
    // 游戏窗口尺寸发生变化
    onResize(): void {
        logd('Browser:', Browser.width, Browser.height, Browser.clientWidth, Browser.clientHeight, Browser.pixelRatio)
        logd('window:', window.innerWidth, window.innerHeight, window.outerWidth, window.outerHeight, window.devicePixelRatio)
        logd('screen:', screen.width, screen.height, screen.availWidth, screen.availHeight, screen.pixelDepth)
        logd('onIPhoneX', onIPhoneX)
        this.checkClientSize();
        let sceneScale = this._sceneScale;
        let clientScale = this._clientScale;
        let clientWidth = this._clientWidth;
        let clientHeight = this._clientHeight;
        // if (!Browser.onPC) {
        //     if (clientWidth > clientHeight) {
        //         // 如果是横屏模式  并且有之前的竖屏缩放数据
        //         if (this._verticalClientScale) {
        //             sceneScale = this._verticalClientScale / this._clientScale;
        //             this._verticalClientScale = 0;
        //         }
        //     }
        //     else {
        //         this._verticalClientScale = this._clientScale;
        //     }
        // }
    
        // alert(clientScale + ',' + sceneScale)
        this.onResize3D(sceneScale);
    }
    // 3d场景尺寸发生变化
    private onResize3D(sceneScale: number): void {
         
    }

    // 浏览器可视原始高宽
    private _browserClientWidth: number = 0;
    private _browserClientHeight: number = 0;
    private _prevBrowserClientWidth: number;
    private _prevBrowserClientHeight: number;

    private _lockOrientation: boolean = true;
    private set lockOrientation(v: boolean) {
        this._lockOrientation = v;
    }

    onPC: boolean = false;
    // 校验浏览器可视屏幕像素
    private checkClientSize(): void {
        let browser_clientWidth = Browser.clientWidth;
        let browser_clientHeight = Browser.clientHeight;
        this.onPC = Browser.onPC;
        if (!this.onPC && this._prevBrowserClientWidth) {
            if ((browser_clientWidth == this._prevBrowserClientWidth
                && browser_clientHeight != this._prevBrowserClientHeight)
                || (browser_clientHeight == this._prevBrowserClientHeight
                    && browser_clientWidth != this._prevBrowserClientWidth)) {
                // 呼出软键盘了
                // if(Laya.stage.screenMode == Stage.SCREEN_HORIZONTAL){
                //     // 如果自动横屏改成竖屏
                //     Laya.stage.screenMode = Stage.SCREEN_VERTICAL;
                //     this.verticalByInput = true;
                // }

                return;
            }
        }

        let __width = browser_clientWidth;
        let __height = browser_clientHeight;
        switch (Laya.stage.screenMode) {
            case Stage.SCREEN_VERTICAL:
                browser_clientHeight = Math.max(__width, __height);
                browser_clientWidth = Math.min(__width, __height);
                break;
            case Stage.SCREEN_HORIZONTAL:
                browser_clientHeight = Math.min(__width, __height);
                browser_clientWidth = Math.max(__width, __height);
                break;
        }

        if (this._browserClientWidth == browser_clientWidth && this._browserClientHeight == browser_clientHeight) {
            return;
        }

        this._browserClientWidth = browser_clientWidth;
        this._browserClientHeight = browser_clientHeight;
        this._prevBrowserClientWidth = browser_clientWidth;
        this._prevBrowserClientHeight = browser_clientHeight;

        this._designWidth = this._browserClientWidth * Browser.pixelRatio;
        this._designHeight = this._browserClientHeight * Browser.pixelRatio;

        // if (this._designWidth < this._designHeight && (this._designWidth < 1280 || this._designHeight < 720)) {
        //     // 屏幕太小适应手机的适配方案
        //     this.onPC = false;
        // }

        let wScale = this._designWidth / this.widthDesginPixelw;
        let hScale = this._designHeight / this.heightDesginPixelw;

        this._clientScale = Math.min(wScale, hScale);

        if (wScale > hScale) {
            this._clientWidth = this.heightDesginPixelw * (this._designWidth / this._designHeight);
            this._clientHeight = this.heightDesginPixelw;
        }
        else {
            this._clientWidth = this.widthDesginPixelw;
            this._clientHeight = this.widthDesginPixelw * (this._designHeight / this._designWidth);
        }

    }

    // 分享回调
    private _shareCallback: Function;
    set shareCallback(v: Function) {
        this._shareCallback = v;
    }
    private apiShareCallback = (...args) => {
        this._shareCallback && this._shareCallback.call(this);
        logd("分享成功");
    }

    // 支付回调
    private _payCallback: Function;
    set payCallback(v: Function) {
        this._payCallback = v;
    }
    private apiPayCallback = (...args) => {
        this._payCallback && this._payCallback.call(this);
        logd("支付成功");
    }

    // 关注回调
    private _focusCallback: Function;
    set focusCallback(v: Function) {
        this._focusCallback = v;
    }
    private apiFocusCallback = (...args) => {
        this._focusCallback && this._focusCallback.call(this);
        logd("关注成功");
    }
    public static initCanvas($caves: HTMLCanvasElement): void {

        new Launch();


    }
}

 

////////////////////////////////////////////////////////////
// 打印
let MAX_LOG_LEVEL = 4
let log_level = MAX_LOG_LEVEL

// 本地调试
var isDebug: boolean = false;

function logTrace(...args: any[]): void {
 
}
function logd(...args: any[]): void {
 
}

function logl(...args: any[]): void {
   
}

function logw(...args: any[]): void {
 
}

function loge(...args: any[]): void {
  
}
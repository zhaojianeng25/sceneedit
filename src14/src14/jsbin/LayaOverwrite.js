/*
* Laya引起函数重写
*/
var LayaOverwrite = /** @class */ (function () {
    function LayaOverwrite() {
    }
    LayaOverwrite.do = function () {
        try {
            this.LoaderManager_next();
            this.Image_getset_skin();
            this.WebGLImage_onresize();
            this.Clip_getset_skin();
            this.Button_getset_skin();
            this.Stat_show();
            this.Template_setData();
        }
        catch (error) {
            console.error(error);
        }
    };
    // 加载管理器的bug
    LayaOverwrite.LoaderManager_next = function () {
        var __proto = Laya.LoaderManager.prototype;
        var _next = __proto['_next'];
        __proto['_next'] = function () {
            if (this._loaderCount >= this.maxLoader)
                return;
            for (var i = 0; i < this._maxPriority; i++) {
                var infos = this._resInfos[i];
                while (infos.length) {
                    var info = infos.shift();
                    if (info)
                        return this._doLoad(info);
                }
                // if (infos.length > 0){
                //     var info=infos.shift();
                //     if (info)return this._doLoad(info);
                // }
            }
            this._loaderCount || this.event(/*laya.events.Event.COMPLETE*/ "complete");
        };
    };
    // 重写Image skin 素材自己管理
    LayaOverwrite.Image_getset_skin = function () {
        var __proto = LImage.prototype;
        Laya['getset'](false, __proto, 'skin', function () {
            return this._skin;
        }, function (value) {
            if (this._skin != value) {
                this['releaseRefAsset']();
                this._skin = value;
                if (value) {
                    var res = Laya.loader.getRes(this._skin);
                    if (res && !res.loadByRefAsset) {
                        this.source = res;
                        this.onCompResize();
                        // 非通过RefAsset下载的不需要自己管理资源
                        return;
                    }
                    var refAsset = RefAsset.Get(this._skin);
                    this['refAsset'] = refAsset;
                    if (refAsset) {
                        refAsset.retain();
                        if (!refAsset.parseComplete) {
                            refAsset.once(LEvent.COMPLETE, this, this['onRefAssetComplete']);
                        }
                        else {
                            this['onRefAssetComplete']();
                        }
                    }
                    else {
                        this['onRefAssetComplete']();
                    }
                    // Laya.loader.load(this._skin,Handler.create(this,this.setSource,[this._skin]),null,/*laya.net.Loader.IMAGE*/"image",1,true,this._group);
                }
                else {
                    this.source = null;
                }
            }
        });
        var __destroy = __proto.destroy;
        __proto.destroy = function (destroyChild) {
            this['releaseRefAsset']();
            __destroy.call(this, destroyChild);
        };
        /**
        *销毁对象并释放加载的皮肤资源。
        */
        __proto.dispose = function () {
            this.destroy(true);
        };
        __proto['releaseRefAsset'] = function () {
            var refAsset = this['refAsset'];
            if (refAsset instanceof RefAsset) {
                refAsset.off(LEvent.COMPLETE, this, this['onRefAssetComplete']);
                refAsset.release();
            }
            this['refAsset'] = null;
        };
        __proto['onRefAssetComplete'] = function () {
            var refAsset = this['refAsset'];
            this.source = refAsset ? Laya.loader.getRes(refAsset.url) : null;
            this.onCompResize();
        };
    };
    // 重写WebGLImage_onresize 小碎图不打大图 素材自己管理
    LayaOverwrite.WebGLImage_onresize = function () {
        var __proto = Laya.WebGLImage.prototype;
        var __onresize = __proto['onresize'];
        __proto['onresize'] = function () {
            this._w = this._image.width;
            this._h = this._image.height;
            // __onresize.call(this);
        };
    };
    // 重写Clip skin 素材自己管理
    LayaOverwrite.Clip_getset_skin = function () {
        var __proto = Laya.Clip.prototype;
        Laya['getset'](false, __proto, 'skin', function () {
            return this._skin;
        }, function (value) {
            if (this._skin != value) {
                this['releaseRefAsset']();
                this._skin = value;
                if (value) {
                    var res = Laya.loader.getRes(this._skin);
                    if (res && !res.loadByRefAsset) {
                        this._setClipChanged();
                        // 非通过RefAsset下载的不需要自己管理资源
                        return;
                    }
                    var refAsset = RefAsset.Get(this._skin);
                    this['refAsset'] = refAsset;
                    if (refAsset) {
                        refAsset.retain();
                        if (!refAsset.parseComplete) {
                            refAsset.once(LEvent.COMPLETE, this, this._setClipChanged);
                        }
                        else {
                            this._setClipChanged();
                        }
                    }
                    else {
                        this._setClipChanged();
                    }
                }
                else {
                    this._bitmap.source = null;
                }
            }
        });
        __proto['changeClip'] = function () {
            this._clipChanged = false;
            if (!this._skin)
                return;
            this.loadComplete(this._skin, Loader.getRes(this._skin));
        };
        __proto['releaseRefAsset'] = function () {
            var refAsset = this['refAsset'];
            if (refAsset instanceof RefAsset) {
                refAsset.off(LEvent.COMPLETE, this, this._setClipChanged);
                refAsset.release();
            }
            this['refAsset'] = null;
        };
        var __destroy = __proto.destroy;
        __proto.destroy = function (destroyChild) {
            this['releaseRefAsset']();
            __destroy.call(this, destroyChild);
        };
        __proto.dispose = function () {
            this.destroy(true);
        };
    };
    LayaOverwrite.Button_getset_skin = function () {
        var __proto = Button.prototype;
        Laya['getset'](false, __proto, 'skin', function () {
            return this._skin;
        }, function (value) {
            if (this._skin != value) {
                this['releaseRefAsset']();
                this._skin = value;
                var res = Laya.loader.getRes(this._skin);
                if (res && !res.loadByRefAsset) {
                    this.callLater(this.changeClips);
                    this._setStateChanged();
                    // 非通过RefAsset下载的不需要自己管理资源
                    return;
                }
                else {
                    var refAsset = RefAsset.Get(this._skin);
                    if (refAsset) {
                        this['refAsset'] = refAsset;
                        refAsset.retain();
                        if (!refAsset.parseComplete) {
                            refAsset.once(LEvent.COMPLETE, this, this['onRefAssetComplete']);
                        }
                        else {
                            this['onRefAssetComplete']();
                        }
                    }
                    else {
                        this['onRefAssetComplete']();
                    }
                }
            }
        });
        __proto['releaseRefAsset'] = function () {
            var refAsset = this['refAsset'];
            if (refAsset instanceof RefAsset) {
                refAsset.off(LEvent.COMPLETE, this, this['onRefAssetComplete']);
                refAsset.release();
            }
            this['refAsset'] = null;
        };
        __proto['onRefAssetComplete'] = function () {
            this.callLater(this.changeClips);
            this._setStateChanged();
        };
        var __destroy = __proto.destroy;
        __proto.destroy = function (destroyChild) {
            this['releaseRefAsset']();
            __destroy.call(this, destroyChild);
        };
    };
    LayaOverwrite.Stat_show = function () {
        var Stat = Laya.Stat;
        var __show = Stat.show;
        var isfrist = true;
        Stat.show = function (x, y) {
            __show.call(Stat, x, y);
            if (isfrist) {
                isfrist = false;
                Stat.hide();
                var _view = Stat['_view'];
                _view[_view.length] = { title: "AAtlasCount", value: "autoAtlasCount", color: "white", units: "int" };
                var str = gameConf[gameConf.game_data];
                if (str && str.length) {
                    var tStr = Sync.getTimeStr(Number(str.split('?v=')[1]) * 1000);
                    tStr = tStr.substr(5);
                    _view[_view.length] = { title: tStr, value: "compileTime", color: "white", units: "int" };
                    Stat['compileTime'] = '';
                }
                var pixel = Browser.pixelRatio;
                Stat['_vx'] = pixel * 75;
                for (var i = 0; i < _view.length; i++) {
                    _view[i].x = 4;
                    _view[i].y = i * Stat['_fontSize'] + 2 * pixel;
                }
                Stat['_height'] = pixel * (_view.length * 12 + 3 * pixel) + 4;
                var _canvas = new laya.resource.HTMLCanvas('2D');
                Stat['_canvas'] = _canvas;
                _canvas.size(Stat['_width'], Stat['_height']);
                var _ctx = _canvas.getContext('2d');
                Stat['_ctx'] = _ctx;
                _ctx.textBaseline = "top";
                _ctx.font = Stat['_fontSize'] + "px Sans-serif";
                _canvas.source.style.cssText = "pointer-events:none;background:rgba(150,150,150,0.8);z-index:100000;position: absolute;left:" + x + "px;top:" + y + "px;width:" + (Stat['_width'] / pixel) + "px;height:" + (Stat['_height'] / pixel) + "px;";
                Stat['_first'] = true;
                Stat.loop();
                // Stat['_first']=false;
                Browser.container.appendChild(_canvas.source);
                Stat.enable();
            }
        };
        var __loop = Stat.loop;
        Stat.loop = function () {
            __loop.call(Stat);
            Stat['autoAtlasCount'] = Laya.AtlasResourceManager.instance.getAtlaserCount();
        };
    };
    // 重写模板获取
    LayaOverwrite.Template_setData = function () {
        var tb_quest_copy = [];
        var tb_item_copy = [];
        var tb_map_copy = [];
        var tb_skills_copy = [];
        var tb_creature_copy = [];
        var setData = Template.setData;
        Template.setData = function (v) {
            setData.call(Template, v);
            // 地图数据优化
            var tb_map = Template.data["tb_map"];
            for (var _i = 0, tb_map_1 = tb_map; _i < tb_map_1.length; _i++) {
                var item = tb_map_1[_i];
                if (item && item.id) {
                    tb_map_copy[item.id] = item;
                }
            }
            Template.data["tb_map"] = tb_map_copy;
            // 技能数据优化
            var tb_skills = Template.data["tb_skills"];
            for (var _a = 0, tb_skills_1 = tb_skills; _a < tb_skills_1.length; _a++) {
                var item = tb_skills_1[_a];
                if (item && item.id) {
                    tb_skills_copy[item.id] = item;
                }
            }
            Template.data["tb_skills"] = tb_skills_copy;
            // 技能数据优化
            var tb_creature = Template.data["tb_creature"];
            for (var _b = 0, tb_creature_1 = tb_creature; _b < tb_creature_1.length; _b++) {
                var item = tb_creature_1[_b];
                if (item && item.id) {
                    tb_creature_copy[item.id] = item;
                }
            }
            Template.data["tb_creature"] = tb_creature_copy;
        };
        Template.getMapTempById = function (value) {
            return tb_map_copy[value];
        };
        Template.getSkillsTempById = function (value) {
            return tb_skills_copy[value];
        };
        Template.getCreatureTempById = function (value) {
            return tb_creature_copy[value];
        };
    };
    return LayaOverwrite;
}());
//# sourceMappingURL=LayaOverwrite.js.map
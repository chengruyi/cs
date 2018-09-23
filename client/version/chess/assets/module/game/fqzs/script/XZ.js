var beiMiCommon = require("BeiMiCommon");
cc.Class({
    extends: beiMiCommon,

    properties: {

        //分数资源
        atlas: {
            default: null,
            type: cc.SpriteAtlas
        },

        xz: {
            default: null,
            type: cc.Node
        },

        //切分操作
        base: 10,

        changeOne:{
            default: null,
            type: cc.Node
        },
        changeTwo:{
            default: null,
            type: cc.Node
        },
        changeThree:{
            default: null,
            type: cc.Node
        },
        changeFour:{
            default: null,
            type: cc.Node
        },
        
        //总分
        goldcoins: {
            default: null,
            type: cc.Label
        },

        getgoldcoins: {
            default: null,
            type: cc.Label
        },


        //下注
        tuzi: {
            default: null,
            type: cc.Node
        },

        houzi: {
            default: null,
            type: cc.Node
        },

        xiongmao: {
            default: null,
            type: cc.Node
        },
        shizi: {
            default: null,
            type: cc.Node
        },
        laoying: {
            default: null,
            type: cc.Node
        },

        kongque: {
            default: null,
            type: cc.Node
        },
        gezi: {
            default: null,
            type: cc.Node
        },
        yanzi: {
            default: null,
            type: cc.Node
        },
        feiqing: {
            default: null,
            type: cc.Node
        },
        zoushou: {
            default: null,
            type: cc.Node
        },
        baisha: {
            default: null,
            type: cc.Node
        },
        jinsha: {
            default: null,
            type: cc.Node
        },

            tuziSroce:0,
            houziSroce:0,
            xiongmaoSroce:0,
            shiziSroce:0,
            laoyingSroce:0,
            kongqueSroce:0,
            geziSroce:0,
            yanziSroce:0,
            feiqingSroce:0,
            baishaSroce:0,
            jinshaSroce:0,
            zoushouSroce:0,
    },

    // use this for initialization
    onLoad: function () {
        let self = this ;
        if(this.ready()){
            this.pva_format(cc.beimi.user.goldcoins, self);
            this.pvalistener(self , function (context) {
                context.pva_format(cc.beimi.user.goldcoins, context) ;
            });
        }
    },

    cancel:function(){

    },


    continue:function(){

    },

    getSroce:function(){
        var sroce = new Map();
        sroce.set("tuzi",this.tuziSroce);
        sroce.set("houzi",this.houziSroce);
        sroce.set("xiongmao",this.xiongmaoSroce);
        sroce.set("shizi",this.shiziSroce);
        sroce.set("laoying",this.laoyingSroce);
        sroce.set("kongque",this.kongqueSroce);
        sroce.set("gezi",this.geziSroce);
        sroce.set("yanzi",this.yanziSroce);
        sroce.set("feiqing",this.feiqingSroce);
        sroce.set("baisha",this.baishaSroce);
        sroce.set("jinsha",this.jinshaSroce);
        sroce.set("zoushou",this.zoushouSroce);
        console.log(JSON.stringify(sroce));
        socket.emit("searchroom" , JSON.stringify(sroce));
    },

    onCloseClick:function(){
        this.closeOpenWin();
    },

    pva_format:function(coins , object){
        if(coins > 9999){
            var num = coins / 10000  ;
            object.goldcoins.string = num.toFixed(2) + '万';
        }else{
            object.goldcoins.string = coins;
        }
    },

    onXZclick:function(event, data){
        var  sroceBind= this.xz.getComponent("SroceBind");
        var isReady=sroceBind.getIsReady();
        if(!isReady){
            return;
        }
        if(1==data){
            if(this.tuziSroce+this.base<10000){
                this.tuziSroce+=this.base;
                this.showSrore(this.tuzi,this.tuziSroce);
                cc.beimi.sroce.set("1",this.tuziSroce);
            }
        }else if(2==data){
            if(this.tuziSroce+this.base<10000){
                this.houziSroce+=this.base;
                this.showSrore(this.houzi,this.houziSroce);
                cc.beimi.sroce.set("2",this.houziSroce);
            }
        }else if(3==data){
            if(this.xiongmaoSroce+this.base<10000){
                this.xiongmaoSroce+=this.base;
                this.showSrore(this.xiongmao,this.xiongmaoSroce);
                cc.beimi.sroce.set("3",this.xiongmaoSroce);
            }
        }else if(4==data){
            if(this.shiziSroce+this.base<10000){
                this.shiziSroce+=this.base;
                this.showSrore(this.shizi,this.shiziSroce);
                cc.beimi.sroce.set("4",this.xiongmaoSroce);
            }
        }else if(5==data){
            if(this.laoyingSroce+this.base<10000){
                this.laoyingSroce+=this.base;
                this.showSrore(this.laoying,this.laoyingSroce);
                cc.beimi.sroce.set("5",this.xiongmaoSroce);
            }
        }else if(6==data){
            if(this.kongqueSroce+this.base<10000){
                this.kongqueSroce+=this.base;
                this.showSrore(this.kongque,this.kongqueSroce);
                cc.beimi.sroce.set("6",this.xiongmaoSroce);
            }
        }else if(7==data){
            if(this.geziSroce+this.base<10000){
                this.geziSroce+=this.base;
                this.showSrore(this.gezi,this.geziSroce);
                cc.beimi.sroce.set("7",this.xiongmaoSroce);
            }
        }else if(8==data){
            if(this.yanziSroce+this.base<10000){
                this.yanziSroce+=this.base;
                this.showSrore(this.yanzi,this.yanziSroce);
                cc.beimi.sroce.set("8",this.xiongmaoSroce);
            }
        }else if(9==data){
            if(this.feiqingSroce+this.base<10000){
                this.feiqingSroce+=this.base;
                this.showSrore(this.feiqing,this.feiqingSroce);
                cc.beimi.sroce.set("9",this.xiongmaoSroce);
            }
        }else if(10==data){
            if(this.baishaSroce+this.base<10000){
                this.baishaSroce+=this.base;
                this.showSrore(this.baisha,this.baishaSroce);
                cc.beimi.sroce.set("10",this.xiongmaoSroce);
            }
        }else if(11==data){
            if(this.jinshaSroce+this.base<10000){
                this.jinshaSroce+=this.base;
                this.showSrore(this.jinsha,this.jinshaSroce);
                cc.beimi.sroce.set("11",this.xiongmaoSroce);
            }
        }else if(12==data){
            if(this.zoushouSroce+this.base<10000){
                this.zoushouSroce+=this.base;
                this.showSrore(this.zoushou,this.zoushouSroce);
                cc.beimi.sroce.set("12",this.xiongmaoSroce);
            }
        }
        for (var item of cc.beimi.sroce.entries()) {
            console.log(item[0] + " = " + item[1]);
        }
    },

    showSrore:function(shuxing,tuziSroce){
        var one=tuziSroce%10;
        var two=Math.floor(tuziSroce%100/10);
        var three=Math.floor(tuziSroce%1000/100);
        var four=Math.floor(tuziSroce%10000/1000);
        shuxing.getChildByName("1").getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-"+one);
        shuxing.getChildByName("2").getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-"+two);
        shuxing.getChildByName("3").getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-"+three);
        shuxing.getChildByName("4").getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-"+four);
    },
    

    changeScore:function(){
        if(this.base==1000){
            this.base=1;
        }else{
            this.base=this.base*10;
        }
        if(this.base==1){
            this.changeOne.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-1");
            this.changeTwo.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-0");
            this.changeThree.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-0");
            this.changeFour.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-0");
        }else if(this.base==10){
            this.changeOne.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-0");
            this.changeTwo.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-1");
            this.changeThree.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-0");
            this.changeFour.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-0");
        }else if(this.base==100){
            this.changeOne.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-0");
            this.changeTwo.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-0");
            this.changeThree.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-1");
            this.changeFour.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-0");
        }else if(this.base==1000){
            this.changeOne.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-0");
            this.changeTwo.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-0");
            this.changeThree.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-0");
            this.changeFour.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-1");
        }
    },

});

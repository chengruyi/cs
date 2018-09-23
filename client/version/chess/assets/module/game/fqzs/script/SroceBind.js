var beiMiCommon = require("BeiMiCommon");
cc.Class({
    extends: beiMiCommon,

    properties: {

        //是否可以下注
        isReady:true,

    },

    // use this for initialization
    onLoad: function () {
        
    },

    getIsReady:function(){
        return this.isReady;
    },
    
    setIsReady:function(){
        console.log("false");
        this.isReady=false;
    },

});

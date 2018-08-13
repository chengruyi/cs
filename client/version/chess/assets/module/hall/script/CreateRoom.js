var beiMiCommon = require("BeiMiCommon");
cc.Class({
    extends: beiMiCommon,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        roomoption: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    createRoom:function(){
        
        if(this.roomoption){
            cc.beimi.openwin = cc.instantiate(this.roomoption) ;
            cc.beimi.openwin.parent = this.root();
        }
    }

});

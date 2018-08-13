cc.Class({

    extends: cc.Component,

    properties: {
        mask: {
            default: null,
            type: cc.Node,
            displayName: '遮罩'
        },
    
        label: {
            default: null,
            type: cc.Node,
            displayName: '文本'
        },
    
        text: {
            default: [],
    
            type: [cc.String],
        }
    },
    
    // LIFE-CYCLE CALLBACKS:
    
    // onLoad() {
    
    //     // this.text = [];
    // },
    
    start() {
    
        cc.log(this);
    
    },
    
    /**
     * 播放公告
     * @param {*} data -- 公告内容
     * @example 当我们向公告组件传递新公告值（data）时，如果已经有公告在播放了，
     * 我会通过 addNotice 函数将公告保存。当前公告播放完毕后，我们在继续播
     * 放之后添加的公告，如果当前前并没有公告播放，那么直接播放接收到的公告。
     */
    noticePlay(data) {
    
        var self = this;
    
        if (self.node.opacity == 255) {
    
            self.addNotice(data);
        } else {
    
            self.text = [];
    
            self.addNotice(data);
    
            self.addData()
    
        }
    
    },
    
    /**
     * 存储公告
     * @param {*} data 
     */
    addNotice(data) {
    
        if (data == undefined) return;
    
        this.text.push(data);
    
        return this.text
    },
    
    /**
     * 开启公告滚动
     */
    addData() {
    
        var self = this;
    
        self.node.opacity = 255;
    
        self.label.position = cc.v2(0, -45)
    
        let i = 0;
    
        self.rollNotice(function() {}, i)
    
    
    
    },
    
    /**
     * 公告滚动
     * @param {*} callback 
     * @param {*} i 
     */
    rollNotice(callback, i) {
    
        var self = this;
    
    
        self.label.$str(self.text[i]);
    
        // 比较文本宽度与遮罩宽度
        if (self.label.width <= self.mask.width) {
    
            self.label.position = cc.v2(-self.label.width / 2, -45)
    
            self.label.runAction(cc.sequence(
    
                cc.moveTo(.5, cc.v2(-self.label.width / 2, 0)),
    
                cc.callFunc(function() {
    
                    // 开起执行一次的倒计时，倒计时结束播放下一条公告
                    cui.timer.create(function() {
    
                        // 上移
                        self.label.runAction(cc.sequence(
    
                            cc.moveTo(.5, cc.v2(-self.label.width / 2, 45)),
    
                            cc.callFunc(function() {
    
                                // 将滚动内容放置在遮罩外
                                self.label.y = -45;
    
                                i += 1;
    
                                if (i >= self.text.length) {
                                    self.node.opacity = 0;
                                    return callback()
                                } else {
    
                                    return self.rollNotice(callback, i)
                                };
                            })));
    
    
                    }, 5000 + self.label.width * 10, 'notice');
    
                    // cc.log(times);
    
                })
    
            ));
    
    
        } else {
    
            self.label.position = cc.v2(0, -45);
    
            self.label.runAction(cc.sequence(
    
                cc.moveTo(.2, cc.v2(0, 0)),
    
                cc.moveTo(self.label.width / 100, cc.v2(-self.label.width - self.mask.width / 2, 0)),
    
                cc.callFunc(function() {
    
                    i += 1;
    
                    if (i >= self.text.length) {
                        self.node.opacity = 0;
                        return callback()
                    } else {
    
                        return self.rollNotice(callback, i)
                    };
    
                })));
        }
    },
    
    // update (dt) {},
});


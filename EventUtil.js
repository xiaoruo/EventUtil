/**
 * @author [xiaoruo]
 * [EventUtil 跨浏览器事件对象]
 * @type {Object}
 */
var EventUtil = {
    /**
     * [addHandler 添加跨浏览器事件]
     * @param {[Object]} element [事件对象]
     * @param {[String]} type    [事件类型]
     * @param {[Function]} handler [事件函数]
     */
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    /**
     * [removeHandler 移除事件]
     * @param {[Object]} element [事件对象]
     * @param {[String]} type    [事件类型]
     * @param {[Function]} handler [事件函数]
     */
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },

    /**
     * [getEvent 跨浏览器事件]
     * @param  {[Object]} event [事件对象]
     * @return {[Object]}       [事件对象]
     */
    getEvent: function(event) {
        return event ? event : window.event;
    },

    /**
     * [getTarget 事件目标]
     * @param  {[Object]} event [事件对象]
     * @return {[Object]}       [事件目标]
     */
    getTarget: function(event) {
        return event.target || event.srcElement;
    },

    /**
     * [getRelatedTarget 与事件目标相关的节点]这个属性只对mouseover和mouseout有用（mouseover是离开的那个节点或mouseout时进入的那个节点）
     * @param  {[Object]} event [事件对象]
    * @return {[Object]}       [相关节点]
     */
    getRelatedTarget: function(event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }

    },

    /**
     * [preventDefault 取消默认事件]
     * @param  {[Object]} event [事件对象]
     */
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    /**
     * [stopPropagation 取消事件的冒泡或捕获行为]
     * @param  {[Object]} event [事件对象]
     */
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },


    /**
     * [getCharCode 获取键盘码]
     * @param  {[Object]} event [事件对象]
     * @return {[number]}       [键盘码]
     */
    getCharCode: function(event) {
        if (typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },

    /**
     * [getButton 获取鼠标按键]
     * @param  {[Object]} event [事件对象]
     */
    getButton: function(event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            switch (event.button) {
                case 0://没有按下按钮
                case 1://按下主鼠标按钮
                case 3://同时按下主次鼠标按钮
                case 5://同时按下主中间
                case 7://同时按下三个
                    return 0;//主
                case 2://按下了次鼠标按钮
                case 6://同时按下次中间
                    return 2;//中间
                case 4://按下鼠标中间按钮
                    return 1;//次
            }
        }
    },

    /**
     * [getWheelDelta 鼠标滚轮事件]
     * @param  {[Object]} event [事件对象]
     * @return {[Number]}       [鼠标滚轮数值]上滚为正下滚为负
     */
    getWheelDelta: function(event) {
        if (event.wheelDelta) {
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },


    /**
     * [getClipboardText 获取剪切板数据]
     * @param  {[Object]} event [事件对象]
     * @return {[String]}       [剪切板数据]
     */
    getClipboardText: function(event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },


    /**
     * [setClipboardText 为剪切板赋予数据]
     * @param  {[Object]} event [事件对象]
     */
    setClipboardText: function(event, value) {
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", value);
        } else if (window.clipboardData) {
            window.clipboardData.setData("text", value);
        }
    }
};

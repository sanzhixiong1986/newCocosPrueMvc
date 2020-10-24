const {ccclass, property} = cc._decorator;

import app from "./App";
import { AppFacade } from "./core/AppFacade";
import {NotificationConst} from "./core/NotificationConst";
import ControllerCommand from "./core/ControllerCommand";

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    start () {
        // init logic
        //this.label.string = this.text;
    }
    frameSuccess(){
        this.label.string = "puremvc框架 初始化完毕";
    }

    onClick(){
        console.log("点击操作");
        app.sendNotification(NotificationConst.LOGIN,ControllerCommand);
    }

    loginSuccess(msg:string){
        this.label.string = msg;
    }
}

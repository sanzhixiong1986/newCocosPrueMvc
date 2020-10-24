/**
 * Created by jsroads on 2020/6/11.2:42 下午
 * Note:
 */
import {NotificationConst} from "./NotificationConst";
import BaseMediator from "./BaseMediator";
import {cccExtensionClass} from "../../lib/ccc";
@cccExtensionClass
export default class AppMediator extends BaseMediator {
    private canvas:any = null;
    private component:any = null;
    constructor(viewComponent?: any) {
        super(null, viewComponent);
        AppMediator.NAME = this.mediatorName;
    }
    protected lazyEventListener() {
        // this.facade.registerMediator(new MainSceneMediator());
    }
    public onRegister(): void {
        /*这个地方可以初始化加载场景*/
        // this.facade.registerMediator(new LoadSceneMediator());
        /*回调主场景初始化完毕*/
        this.canvas = cc.director.getScene().getChildByName("Canvas");
        this.component = this.canvas.getComponent("Helloworld");
        if (this.component && this.component.frameSuccess) {
            this.component.frameSuccess();
        } else {
            console.log("初始场景没有脚本组件！")
        }
    }

    public listNotificationInterests(): string[] {
        return [
            NotificationConst.LOGIN_SUCCESS,
            NotificationConst.SHOW_LOADING,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        switch (notification.getName()) {
            case NotificationConst.SHOW_LOADING:
                this.lazyEventListener();
                break;
            case NotificationConst.LOGIN_SUCCESS:
                console.log("登陆成功");
                this.component.loginSuccess("登陆成功");
                break;
            default:
        }
    }
}
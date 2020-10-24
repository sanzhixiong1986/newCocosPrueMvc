/**
 * Created by jsroads on 2020/6/17.3:27 下午
 * Note:
 */
import LoginProxy from "../model/proxy/LoginProxy";
import SimpleCommand = puremvc.SimpleCommand;

/**
 * LoginCommand 登陆的操作
 * execute 监听事件发生的操作
 */
export default class LoginCommand extends SimpleCommand {
    constructor() {
        super();
    }
    //在这里监听这个事件操作
    public execute(notification: puremvc.INotification): void {
        console.log(notification);
        
        let proxy: LoginProxy = <LoginProxy>this.facade.retrieveProxy(LoginProxy.NAME);
        //notification.getBody() 发送的数据
        proxy.login(notification.getBody());
    }
}
/**
 * Created by jsroads on 2020/6/11.3:00 下午
 * Note:
 */
import BaseProxy from "./BaseProxy";
import {NotificationConst} from "../../core/NotificationConst";
import {cccExtensionClass} from "../../../lib/ccc";

@cccExtensionClass
export default class LoginProxy extends BaseProxy {
    constructor(proxyName?: string, data?: any) {
        super(null, data);
        LoginProxy.NAME = this.proxyName;
    }
    //登陆发送消息返回消息操作
    public login(data) {
        if(null == data) return;
        this.sendNotification(NotificationConst.LOGIN_SUCCESS);
    }
}

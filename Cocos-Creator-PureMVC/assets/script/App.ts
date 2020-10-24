/**
     .__  .__              .__  __                         .__          
    |  | |__| ____   ____ |__|/  |_  _____  ______ ______ |  |   ____  
    |  | |  |/ ___\ /    \|  \   __\ \__  \ \____ \\____ \|  | _/ __ \ 
    |  |_|  / /_/  >   |  \  ||  |    / __ \|  |_> >  |_> >  |_\  ___/ 
    |____/__\___  /|___|  /__||__|   (____  /   __/|   __/|____/\___  >
        /_____/      \/                \/|__|   |__|             \/
 *                               神兽保佑
 *                              代码无BUG!
 */
import IMediator = puremvc.IMediator;
import IProxy = puremvc.IProxy;
import Browser from "./channel/Browser";
import {AppFacade} from "./core/AppFacade";

const {ccclass,disallowMultiple, menu,executionOrder} = cc._decorator;
@ccclass
@disallowMultiple()
@menu('常住节点组件/App')
@executionOrder(-10000)
export default class App extends cc.Component {
    protected onLoad() {
        /** 添加当前节点为常住节点*/
        cc.game.addPersistRootNode(this.node);
    }
    /**
     * 初始化信息操作
     */
    start() {
        console.log("puremvc框架开始初始化...");
        App.instance.startup();
        if (Browser.onAndroid) {
            console.log("Android添加监听返回键")
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        }
    }
    /**
     * 
     * @param event 安卓点击后退按钮的游戏结束
     */
    private onKeyDown(event):void {
        switch (event.keyCode) {
            case cc.macro.KEY.back:
                cc.game.end();
                break;
            default:
        }
    }

    public static registerProxy( proxy:IProxy ):void{
        this.instance.registerProxy(proxy);
    }

    public static retrieveProxy(name: string,data:any): IProxy {
        let proxy =  this.instance.retrieveProxy(name);
        proxy.setData(data);
        return proxy;
    }

    public static removeProxy(name: string): IProxy {
        return this.instance.removeProxy(name);
    }

    public static registerMediator( mediator:IMediator ):void{
        this.instance.registerMediator(mediator);
    }

    public static retrieveMediator(name: string,node:cc.Node): IMediator {
        if(!this.instance.hasMediator(name)){
            console.error(`Mediator ${name} 未注册`);
        }
        let mediator =  this.instance.retrieveMediator(name);
        mediator.setViewComponent(node);
        return mediator;
    }

    public static removeMediator(name: string): IMediator {
        return this.instance.removeMediator(name);
    }

    public static sendNotification(name:string, body?:any, type?:string):void{
        this.instance.sendNotification(name,body,type);
    }

    public static get instance():AppFacade{
        return  AppFacade.getInstance();
    }
}

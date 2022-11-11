import { BlockConstructor } from '../models/class-type';
import { Props } from '../models/props';
import Route from './route';


export default class Router  {
    static __instance: Router;
    routes: Route[] = [];
    history: History = window.history;
    private _currentRoute?: Route;
    private _rootQuery = '';
    
    constructor(
        // pathname: string, view: any, 
        rootQuery: string) {
        // super(pathname, view, { rootQuery });
        if (Router.__instance) {
            return Router.__instance;
        }
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: BlockConstructor<Props>): Router {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }

    start(): void {
        window.onpopstate = event => {
           
            if (event.currentTarget != null) {
                this._onRoute((event.currentTarget as Window).location.pathname);
            }
        };
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string): void {
       
        const route = this.getRoute(pathname);
        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route?.render();
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
       
        this._onRoute(pathname);
    }

    back(): void {
        this.history.back();
    }

    forward(): void {
        this.history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }
}
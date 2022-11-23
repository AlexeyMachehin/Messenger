import { BlockConstructor } from "../models/class-type";
import { Props } from "../models/props";
import Route from "./route";
import userController from "../../controllers/user-controllers";
import { ROUTES } from "./routes";

export default class Router {
  static __instance: Router;
  routes: Route[] = [];
  history: History = window.history;
  private _currentRoute?: Route;
  private _rootQuery = "";
  private pathNamesWithAuth: string[] = [];
  private pathNamesWithoutAuth: string[] = [];

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(
    pathname: string,
    block: BlockConstructor<Props>,
    isAuth: boolean = true
  ): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    if (isAuth) {
      this.pathNamesWithAuth.push(pathname);
    } else {
      this.pathNamesWithoutAuth.push(pathname);
    }
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = (event) => {
      if (event.currentTarget != null) {
        this._onRoute(
          (event.currentTarget as Window).location.pathname as string
        );
      }
    };
    this._onRoute(window.location.pathname as string);
  }

  private _onRoute(pathname: string): void {
    const pathTemplate = this._checkRoute(pathname);
    let route = this.getRoute(pathTemplate);
    userController.getUser().then((result) => {
      if (!result) {
        route = this.getRoute(ROUTES.Login)
      }
    });
    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route?.render();
  }

  private _checkRoute(pathname: string): string {
    let route = "/";

    this.pathNamesWithAuth.forEach((path) => {
      const pathParts = path.split("/");
      pathParts.shift();
      let replacedPath = path.replace(/[{][A-Za-z]+}$/g, "[A-Za-z0-9-]*");
      const regexp = new RegExp(`^${replacedPath}$`, "g");

      if (regexp.test(pathname)) {
        route = path;
      }
    });

    return route;
  }

  go(pathname: string, state?: object): void {
    window.history.pushState(state, "", pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }

  getParams(): any {
    return window.history.state;
  }
}

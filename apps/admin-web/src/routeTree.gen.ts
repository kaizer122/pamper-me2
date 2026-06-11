import { Route as rootRoute } from "./routes/__root.js";
import { Route as IndexRoute } from "./routes/index.js";
import { Route as LoginRoute } from "./routes/login.js";

const routeTree = rootRoute.addChildren([IndexRoute, LoginRoute]);
export { routeTree };

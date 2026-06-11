import { Route as rootRoute } from "./routes/__root.js";
import { Route as IndexRoute } from "./routes/index.js";

const routeTree = rootRoute.addChildren([IndexRoute]);
export { routeTree };

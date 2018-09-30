const path = require("path");
const { ensureDir } = require("fs-extra");
const polka = require("polka");
const helmet = require("helmet");
const session = require("express-session");
const LevelStore = require("level-session-store")(session);
const serveStatic = require("serve-static");
const { sessionSecret, sessionStorePath } = require("./config");
const { host, port } = require("../common/config");
const { setupWss } = require("./ws-server");

const setup = async () => {
  const env = process.env.NODE_ENV || "development";

  await ensureDir(sessionStorePath);

  const app = polka().listen({ host, port }, () =>
    console.log(`Running on port: ${host}:${port}`),
  );

  const sessionStore = new LevelStore(sessionStorePath);

  const sessionMiddleware = session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: env !== "development" },
    // for larger, distributed, APIs use redis or something else instead
    store: sessionStore,
  });

  setupWss(app, sessionMiddleware);

  app
    .use(helmet())
    .use(sessionMiddleware)
    .use(serveStatic(path.join(__dirname, "/public")));
};

setup();

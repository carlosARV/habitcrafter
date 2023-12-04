const express = require("express");
const {connectDB} = require("./database");
const http = require("http");
const path = require("path");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const _handlebars = require("handlebars");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const formatDateHelper = require("./helpers/formatDate");
require('dotenv').config();

connectDB();
const webpush = require("./webpush"); // Importamos el módulo webpush

require("./config/passport");

const app = express();
const server = http.createServer(app);

//Settings
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(_handlebars),
    helpers: {
      formatDate: formatDateHelper.formatDate
    }
  })
);

app.set("view engine", ".hbs");

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/notes.routes"));
app.use(require("./routes/routines.routes"));
app.use(require("./routes/users.routes"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Iniciar el servidor
server.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en el puerto: `, process.env.PORT || 4000);
});

module.exports = { app, server };

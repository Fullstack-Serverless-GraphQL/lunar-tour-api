require("dotenv").config({
  path: "./.env",
});

if (process.env.NODE_ENV !== "test") {
  throw Error("Non-test environment");
}

import infoRoute from "./info";

const wrap =
  (fn) =>
  (...args) =>
    fn(...args).catch(args[2]);

function main(app) {
  app.get("/api/getTeam", wrap(infoRoute.getTeam));
  app.post("/api/updateMoney", wrap(infoRoute.updateMoney));
  app.post("/api/initData", wrap(infoRoute.initData));
}

export default main;

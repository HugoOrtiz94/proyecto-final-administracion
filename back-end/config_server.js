const secret = "123Q1gg162131@f578";
const saltRounds = 10;
const version = "1.0.1 - NAOJ ";
const debugDB = false;
const localServer = false;
const port = localServer ? "4200" : "443";
const urlPortal = localServer
  ? "http://localhost:3000"
  : "https://app.naojapp.org";

module.exports = {
  debugDB,
  localServer,
  port,
  secret,
  saltRounds,
  urlPortal,
  version,
};

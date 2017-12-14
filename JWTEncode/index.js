let jwt = require('jwt-simple');
let uuid = require('uuid');

module.exports = {
  
  encode: function(scope, userId, deviceId, secret) {
  
    scope = scope ? scope : "likindo";
    userId = userId ? userId : "guest";
    deviceId = deviceId ? deviceId : "";
    secret = secret ? secret : "SECRET";

    let jti = uuid.v4();
    let iat = (Date.now() / 1000);
    let exp = (Date.now() + (60 * 60 * 24 * 365 * 100 * 1000)) / 1000;
    
    let decodedJWT = {
      id_user   : userId,
      jti       : jti,
      iat       : iat,
      exp       : exp,
      scope     : scope
    }

    switch(scope) {
      case "mobile":
        decodedJWT.logged = true;
        decodedJWT.device_id = deviceId;
        break;

      case "parent":
        decodedJWT.id_parent = "?";
        break;

      case "store":
        decodedJWT.id_parent = "?";
        decodedJWT.id_store = "?";
        break;

      case "likindo":
        break;
        
      default:
        throw new Error("Invalid Scope");
    }

    let encodedJWT = jwt.encode(decodedJWT, secret);

    console.log("");
    console.log("# Scope       : " + scope);
    console.log("# User ID     : " + userId);

    if (decodedJWT.device_id) {
      console.log("# Device ID   : " + deviceId);
    }

    if (decodedJWT.logged) {
      console.log("# Logged      : " + decodedJWT.logged);
    }
    
    console.log("# JTI         : " + jti);
    console.log("# IAT         : " + iat);
    console.log("# EXP         : " + exp);
    console.log("# Secret      : " + secret);
    console.log("");
    console.log("# Encoded JWT :");
    console.log("");
    console.log(encodedJWT);
  }
}
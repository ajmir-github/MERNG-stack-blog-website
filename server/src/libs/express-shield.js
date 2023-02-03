function shield(rules) {
  // can have sinlge rule or multi rules ({GET:rule, POST:rule ...})
  return async (request, response, next) => {
    try {
      const rule = typeof rules === "function" ? rules : rules[request.method];
      const result = await rule(request);
      if (!result) return response.status(403).send("Access denied!");
      if (result instanceof Error)
        return response.status(403).send(result.message);
      return next();
    } catch (error) {
      return response.status(500).send("Server failed!");
    }
  };
}

function and(...funcs) {
  return async (context) => {
    try {
      for (const func of funcs) {
        const result = await func(context);
        // if one is false or type of error
        if (!result || result instanceof Error) return result;
      }
      return true;
    } catch (error) {
      // if not type of error return false
      return error instanceof Error ? error : false;
    }
  };
}

function or(...funcs) {
  return async (context) => {
    try {
      let result = false;
      for (const func of funcs) {
        result = await func(context);
        // if one is false or type of error
        if (result && !(result instanceof Error)) break;
      }
      return result;
    } catch (error) {
      // if not type of error return false
      return error instanceof Error ? error : false;
    }
  };
}

function allow() {
  return true;
}
function deny() {
  return false;
}

module.exports = { shield, and, or, allow, deny };

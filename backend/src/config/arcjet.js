const ENV = require("./env");

let ajInstance = null;
let arcjetRules = null;

// Helper function to dynamically import Arcjet module components
async function initArcjet() {
  if (!ajInstance) {
    // Dynamically import the ES Module inside this CommonJS file
    const { default: arcjet, tokenBucket, shield, detectBot } = await import("@arcjet/node");
    
    arcjetRules = { tokenBucket, shield, detectBot };
    
    ajInstance = arcjet({
      key: ENV.ARCJET_KEY,
      characteristics: ["ip.src"],
      rules: [
        shield({ mode: "LIVE" }),
        detectBot({
          mode: "LIVE",
          allow: ["CATEGORY:SEARCH_ENGINE"],
        }),
        tokenBucket({
          mode: "LIVE",
          refillRate: 10,
          interval: 10,
          capacity: 15,
        }),
      ],
    });
  }
  return { aj: ajInstance, rules: arcjetRules };
}

// Export the initializer instead of a static instance
module.exports = { initArcjet };
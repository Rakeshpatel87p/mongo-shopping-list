/*
Software engineernig habbit / principle
1. TEST
2. DEVELOPMENT
3. PRODUCTION / Deployment
*/
// What is this doing?
module.exports = global.environment || process.env.NODE_ENV || 'development'
// ENVIRONMENT VARIABLES (GOOGLE)
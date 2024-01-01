// ################ CONSOLE ################ //
module.exports.resolveConsoleLog = function resolveConsoleLog(v) {
  console.log(v);
};
module.exports.resolveConsoleTrace = function resolveConsoleTrace() {
  console.trace();
};
// SYNC
module.exports.resolveSyncConsoleLog = function resolveSyncConsoleLog(v) {
  console.log(v);
};
module.exports.resolveSyncConsoleTrace = function resolveSyncConsoleTrace() {
  console.trace();
};


// ################ EXIT ################ //
module.exports.resolveExit = function resolveExit() {
  process.exit(0);
};
module.exports.resolveSyncExit = function resolveSyncExit() {
  process.exit(0);
};


// ################ THROW ################ //
module.exports.resolveThrow = function resolveThrow() {
  process.exit(0);
};
module.exports.resolveSyncThrow = function resolveSyncThrow() {
  process.exit(0);
};


// ################ FILELOG ################ //
module.exports.resolveFileLog = function resolveFileLog() {
  process.exit(0);
};
module.exports.resolveSyncFileLog = function resolveSyncFileLog() {
  process.exit(0);
};


// ################ APPLY_FN ################ //
module.exports.resolveApplyFn = function resolveApplyFn() {
  process.exit(0);
};
module.exports.resolveSyncApplyFn = function resolveSyncApplyFn() {
  process.exit(0);
};

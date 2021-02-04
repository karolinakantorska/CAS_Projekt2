function errorMessagesEditGuide(args) {
  if (args.email === "") {
    throw new Error(`Please enter the email`);
  }
  if (!args.name) {
    throw new Error(`Please enter the name`);
  }
  if (!args.password) {
    throw new Error(`Please enter the password`);
  }
}
exports.errorMessagesEditGuide = errorMessagesEditGuide;

function isLoggedInn(ctx) {
  if (!ctx.request.userId) {
    throw new Error("You must be logged in to do this!");
  }
}
exports.isLoggedInn = isLoggedInn;
function hasPermission(ctx, permission) {
  isLoggedInn(ctx);
  console.log(ctx.request.user.permissions);
  if (ctx.request.user.permissions !== permission) {
    throw new Error(`You do not have ${permission} permission to do this!`);
  }
}
exports.hasPermission = hasPermission;
function hasOneOfPermissions(ctx, permission1, permission2) {
  isLoggedInn(ctx);
  if (
    ctx.request.user.permissions === permission1 ||
    ctx.request.user.permissions === permission2
  ) {
    return;
  } else {
    throw new Error(`You do not have ${permission1} or ${permission2} permission!`);
  }
}
exports.hasOneOfPermissions = hasOneOfPermissions;

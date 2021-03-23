function isLoggedInn(ctx) {
  if (!ctx.request.userId) {
    throw new Error("You must be logged in to do this!");
  }
}
exports.isLoggedInn = isLoggedInn;

function hasPermission(ctx, permission) {
  isLoggedInn(ctx);
  if (ctx.request.userPermission !== permission) {
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
function ownReservation(ctx, id) {
  if (ctx.request.user.permissions === "GUIDE " && ctx.request.user.id === id) {
    return;
  } else {
    throw new Error(`You are not alowet to change reservations from other guides!`);
  }
}
exports.ownReservation = ownReservation;

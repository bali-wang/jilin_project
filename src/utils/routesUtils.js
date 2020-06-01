const hasPermission = (roles, route) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
};
const currentRoleRoutes = (roles, routes) => {
  const roleRoutes = [];
  if (routes.length > 0) {
    routes.forEach(route => {
      const currentRoute = { ...route };
      if (hasPermission(roles, route)) {
        if (route.children) {
          route.children.currentRoleRoutes(roles, route.children);
        }
        roleRoutes.push(currentRoute);
      }
    });
  }
  return roleRoutes;
};

export default currentRoleRoutes;

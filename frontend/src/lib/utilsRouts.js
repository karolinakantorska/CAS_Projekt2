import Router from 'next/router';
export function routeToGuidesList() {
  Router.push({
    pathname: '/guides',
  });
}
export function routeToEditGuide(id) {
  Router.push({
    pathname: '/edit_guide',
    query: { id },
  });
}

export function routeToSignin() {
  Router.push({
    pathname: '/signin_page',
  });
}

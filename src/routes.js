import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));
const createDriver = React.lazy(() => import('./Demo/Dashboard/createDriver'));
const Popup = React.lazy(() => import('./Demo/Dashboard/Popup'));
const track = React.lazy(() => import('./Demo/Dashboard/track'));
const addorder = React.lazy(() => import('./Demo/Dashboard/addorder'));

const Orders = React.lazy(() => import('./Demo/Dashboard/Orders'));





const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/dashboard/createDriver', exact: true, name: 'createDriver', component: createDriver },
    { path: '/dashboard/Popup', exact: true, name: 'Popup', component: Popup },
    { path: '/dashboard/track', exact: true, name: 'track', component: track },
    { path: '/dashboard/addorder', exact: true, name: 'addorder', component: addorder },
    { path: '/dashboard/Orders', exact: true, name: 'Orders', component: Orders },
    
  



  
];

export default routes;
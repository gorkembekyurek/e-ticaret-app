import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'register',
    component: RegisterPage
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./pages/product-detail/product-detail.module').then(m => m.ProductDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

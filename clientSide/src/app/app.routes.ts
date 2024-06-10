import { Routes } from '@angular/router';
import { UserRegistrationComponent } from "./components/user-registration/user-registration.component"
import { UserAuthenticationComponent } from './components/user-authentication/user-authentication.component';
import { CompanyRegistrationAndManagementComponent } from './components/company-registration-and-management/company-registration-and-management.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';
import { OrderReleaseComponent } from './components/order-release/order-release.component';
import { ClientRegistrationAndManagementComponent } from './components/client-registration-and-management/client-registration-and-management.component';
import { ProductRegistrationAndManagementComponent } from './components/product-registration-and-management/product-registration-and-management.component';

export const routes: Routes = [
    {
        path: "/",
        component: UserRegistrationComponent
    },
    {
        path: "/api/auth",
        component: UserAuthenticationComponent
    },
    {
        path: "/api/company",
        component: CompanyRegistrationAndManagementComponent
    },
    {
        path: "/api/order-management",
        component: OrderManagementComponent
    },
    {
        path: "/api/order-release",
        component: OrderReleaseComponent
    },
    {
        path: "/api/client",
        component: ClientRegistrationAndManagementComponent
    },
    {
        path: "/api/product",
        component: ProductRegistrationAndManagementComponent
    }
];

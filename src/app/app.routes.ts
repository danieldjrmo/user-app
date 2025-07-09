import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ContactComponent } from './contact/contact';

export const routes: Routes = [
    
    {
        path: "home",
        component: HomeComponent,
        title: "Home"
    },
    {
        path: "contact",
        component: ContactComponent,
        title: "Contact"
    },
];

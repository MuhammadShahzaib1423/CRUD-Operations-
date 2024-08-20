import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const _router = inject(Router);
    const token = localStorage.getItem('token');
    if (token) {
        return true;
    } else {
        alert('You need to login first');
        _router.navigate(['/Login']);
        

    }
}
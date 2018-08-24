import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {LoopBackAuth} from "../shared/sdk/services/core/index";
import {LoopBackConfig, User, UserApi} from "../shared/sdk/index";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: LoopBackAuth, private userApi: UserApi) {
    LoopBackConfig.setBaseURL(environment.api.url);
    LoopBackConfig.setApiVersion(environment.api.version);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if ( this.auth.getCurrentUserData() ) {
      return new Observable<boolean>((observer) => {

        this.userApi.findById(this.auth.getCurrentUserId()).subscribe((user: User) => {
          observer.next(true);
          observer.complete();
        }, (err) => {
          this.router.navigate(['home/login'], {queryParams: {returnUrl: state.url}});
          observer.next(false);
          observer.complete();
        });
      });
    } else {
      this.router.navigate(['home/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

}

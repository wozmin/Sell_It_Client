import {
  HttpHandler, HttpInterceptor, HttpRequest, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse,
  HttpUserEvent, HttpErrorResponse
} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {filter, take, switchMap, finalize} from "rxjs/operators";
import {catchError} from "rxjs/internal/operators/catchError";
import {JwtToken} from "../models/auth/jwt-token.model";
import {Router} from "@angular/router";
import {SpinnerService} from '../services/ui/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router, private _spinnerService: SpinnerService) {
  }

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {

    return next.handle(this.addTokenToRequest(request, this.authService.getAccessToken()))
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            this._spinnerService.isLoading.next(false);

            switch ((<HttpErrorResponse>err).status) {
              case 401:
                return this.handle401Error(request, next);
              case 404:
                this.router.navigateByUrl('/not-found');
                break;
              case 500:
                this.router.navigateByUrl('');
                break;
              default:
                return throwError(err);
            }
          } else {
            return throwError(err);
          }
        }));
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string) : HttpRequest<any> {
    if (token) {
      request = request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }
    return request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    const refreshToken = this.authService.getRefreshToken();
    if(!refreshToken){
      this.router.navigateByUrl('sign-in');
    }
    if(!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.authService.refreshAccessToken()
        .pipe(
          switchMap((jwtToken: JwtToken) => {
            if(jwtToken) {
              this.tokenSubject.next(jwtToken.access);
              this.authService.saveTokens(jwtToken);
              return next.handle(this.addTokenToRequest(request, jwtToken.access))
            }
            this.router.navigateByUrl('/sign-in');
            return <any>this.authService.logout();
          }),
          catchError(err => {
            this.authService.logout();
            return throwError(err);
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          }));
    } else {
      this.isRefreshingToken = false;

      return this.tokenSubject
        .pipe(filter(token => token != null),
          take(1),
          switchMap(token => {
            return next.handle(this.addTokenToRequest(request, token));
          }));
    }
  }
}

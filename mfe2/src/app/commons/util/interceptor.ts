import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptorFunctional: HttpInterceptorFn = (req, next) => {
    const authToken = window.localStorage.getItem("token");
    // Clone the request and add the authorization header
    const authReq = req.clone({
        setHeaders: {
            authorization: `Bearer ${authToken}`
        }
    });

    return next(authReq);
};
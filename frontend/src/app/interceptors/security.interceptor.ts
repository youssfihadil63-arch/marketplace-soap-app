import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const securityInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Intercepteur de sécurité activé pour:', req.url);

  const secureReq = req.clone({
    setHeaders: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    }
  });

  return next(secureReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Erreur HTTP interceptée:', {
        url: req.url,
        status: error.status,
        message: error.message
      });

      const customError = handleHttpError(error);
      return throwError(() => customError);
    })
  );
};

function handleHttpError(error: HttpErrorResponse): any {
  switch (error.status) {
    case 0:
      return {
        code: 'NETWORK_ERROR',
        message: 'Erreur de connexion au serveur',
        details: 'Vérifiez votre connexion internet'
      };
    
    case 401:
      return {
        code: 'UNAUTHORIZED',
        message: 'Authentification requise',
        details: 'Veuillez vous reconnecter'
      };
    
    case 403:
      return {
        code: 'FORBIDDEN',
        message: 'Accès refusé',
        details: 'Vous n\'avez pas les permissions nécessaires'
      };
    
    case 404:
      return {
        code: 'NOT_FOUND',
        message: 'Ressource non trouvée',
        details: 'La ressource demandée n\'existe pas'
      };
    
    case 500:
      return {
        code: 'SERVER_ERROR',
        message: 'Erreur interne du serveur',
        details: 'Veuillez réessayer plus tard'
      };
    
    default:
      return {
        code: `HTTP_${error.status}`,
        message: 'Erreur inattendue',
        details: error.message
      };
  }
}
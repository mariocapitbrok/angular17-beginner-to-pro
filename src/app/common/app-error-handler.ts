import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // Log the error to the console
    console.error('Global Error Handler:', error);

    // Use 'alert' only if it's available (i.e., in a browser environment)
    if (typeof window !== 'undefined' && window.alert) {
      window.alert('An unexpected error occurred. (Global error handler)');
    }
  }
}

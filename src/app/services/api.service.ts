import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	private baseUrl: string;

	constructor(private http: Http) {
		this.baseUrl = environment.API_ENDPOINT;
  }

  getHttpHeaders(uploadFile: boolean = false) {
		const headers = new Headers();

		if (!uploadFile) {
			headers.append('Accept', 'application/json');
			headers.append('Content-Type', 'application/json');
		}

		else {
			// headers.append('enctype', 'multipart/form-data');
		}

		// Send token
		const authToken = localStorage.getItem('authToken');
		if (authToken) {
			headers.append('Authorization', authToken);
		}

		return headers;
	}

  	/**
	 * HTTP Get
	 * @param res
	 * @returns {Observable<R>}
	 */
	httpGet(endpoint: string) {
		// Add timestamp to avoid cache
		if (endpoint.indexOf('?') >= 0) {
			endpoint += '&'
		}
		else {
			endpoint += '?'
		}
		const timestamp = + new Date();
		endpoint += '_t=' + timestamp;

		return this.http.get(this.baseUrl + endpoint) //, { headers: this.getHttpHeaders() })
			.pipe(map((response: any) => response.json()))
			.pipe(catchError(this.handleError));
  }
  
  	/**
	 * Handle error
	 * @param error
	 * @returns {any}
	 */
	private handleError(error: any) {
		console.error(error);
		return Observable.throw(error.json() || 'Server error');
	}
  
}

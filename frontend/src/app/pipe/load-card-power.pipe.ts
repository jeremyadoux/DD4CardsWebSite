import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PowerApi } from '../shared/sdk/services/custom';
import { environment } from '../../environments/environment';
import { LoopBackConfig } from '../shared/sdk';

@Pipe({
  name: 'loadcardpower'
})
export class LoadCardPowerPipe implements PipeTransform {

  constructor(
    private http: HttpClient,
    private powerApi: PowerApi
  ) {
    LoopBackConfig.setBaseURL(environment.api.url);
    LoopBackConfig.setApiVersion(environment.api.version);
  }

  transform(id: string) {

    return new Observable<string>((observer) => {
      // This is a tiny blank image
      observer.next('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');

      // The next and error callbacks from the observer
      const {next, error} = observer;

      this.powerApi.card(id).subscribe((response: string) => {
        observer.next(response);
      });

      return {unsubscribe() {  }};
    });
  }
}

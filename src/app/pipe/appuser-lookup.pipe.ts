import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { lastValueFrom, Observable } from 'rxjs';
import { AppUser } from '../model/appuser.model';
import { selectAppUser, selectAppUserById } from '../state/appUser.selector';

@Pipe({
  name: 'appuserLookup'
})
export class AppuserLookupPipe implements PipeTransform {

  constructor(private store: Store){}

  transform(value: string, ...args: unknown[]): Observable<AppUser | undefined> {
    return this.store.select(selectAppUserById({appUserId : value}));
  }

}

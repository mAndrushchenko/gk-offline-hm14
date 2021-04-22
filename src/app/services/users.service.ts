import { Injectable } from '@angular/core';
import { TUser } from '../model/users';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private amountOfUsers = 500;
  private usersUrl = `https://randomuser.me/api/?results=${this.amountOfUsers}`;

  // start pagination page
  private page = 1;

  public users$ = new Subject<TUser[]>();
  public page$ = new Subject<number>();

  constructor(private api$: ApiService) {
    this.page$.next(this.page);
  }

  getData(): void {
    const userList: TUser[] = [];
    this.api$.getData(this.usersUrl).subscribe((data: any) => {
      data.results.forEach((item: any) => {
        const newUser: TUser = {
          dob: item.dob.date,
          email: item.email,
          gender: item.gender,
          name: `${item.name.first} ${item.name.last}`,
          picture: item.picture.thumbnail
        };
        userList.push(newUser);
      });
      this.setUsers(userList);
    });
  }

  setAmountOfUsers(newAmount: number): void {
    if (!(newAmount % 100) && (newAmount <= 5000)) {
      this.usersUrl = `https://randomuser.me/api/?results=${newAmount}`;
    } else {
      throw new Error('Wrong amount of users. Must be %100 ang <= 5000.');
    }
  }

  getUsers(): Observable<TUser[]> {
    return this.users$.asObservable();
  }

  setUsers(newList: TUser[]): void {
    this.users$.next(newList);
  }

  deleteUsers(): void {
    this.users$.next([]);
  }

  setPage(newPage: number): void {
    this.page$.next(this.page = newPage);
  }

  onPrev(): void {
    if (this.page > 1) {
      this.page$.next(this.page -= 1);
    }
  }

  onNext(totalPages: number): void {
    if (this.page < totalPages) {
      this.page$.next(this.page += 1);
    }
  }

  getPage(): Observable<number> {
    return this.page$.asObservable();
  }
}

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TUser } from '../../model/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: TUser[] = [];
  firstPage = 1;
  loading = false;
  firstLoad = true;
  isExist = false;

  constructor(private users$: UsersService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.firstLoad = false;
  }

  deleteUsers(): void {
    this.users$.deleteUsers();
    this.users$.setPage(this.firstPage);
    this.isExist = false;
    this.router.navigate(['users']).then();
    localStorage.removeItem('users');
  }

  getUsers(): void {
    this.loading = true;
    const localData = localStorage.getItem('users');
    this.users$.setPage(this.firstPage);

    if (localData) {
      this.isExist = true;
      this.users$.setUsers(JSON.parse(localData));
      this.loading = false;
    } else if (!localData && !this.firstLoad) {
      this.users$.getData();
      this.users$.getUsers().subscribe(data => {
        if (data) {
          this.users = data;
          this.isExist = true;
        }
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }
}


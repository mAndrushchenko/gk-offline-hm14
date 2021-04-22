import { Component, OnInit } from '@angular/core';
import { TUser } from '../../../model/users';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  users: TUser[] = [];
  totalRecords = 0;
  itemsOnPage = 10;
  totalPages = 0;
  page = 1;

  constructor(private route: ActivatedRoute, private router: Router, private users$: UsersService) {
    this.users$.setPage(this.page);
  }

  ngOnInit(): void {
    const localData = localStorage.getItem('users');
    if (localData) {
      this.users$.setUsers(JSON.parse(localData));
      this.users = JSON.parse(localData);
      this.setParams();
    }

    this.users$.getUsers().subscribe(data => {
      if (data.length) {
        this.users = data;
        this.setParams();
        localStorage.setItem('users', JSON.stringify(this.users));
      } else {
        this.users = [];
        this.setParams(0);
      }
    });

    this.users$.getPage().subscribe(data => {
      this.page = data;
    });

    this.route.firstChild?.params.subscribe((params: Params) => {
      this.page = Number(params.id);
      this.getPage();
    });
  }

  setParams(reset?: number): void {
    if (reset) {
      this.totalRecords = reset;
      this.totalPages = reset;
    } else {
      this.totalRecords = this.users.length;
      this.totalPages = this.totalRecords / this.itemsOnPage;
    }
  }

  setNotFound(): void {
    this.router.navigate(['/not-found']).then();
  }

  setNavigatePage(newPage: number): void {
    this.router.navigate(['users/page', newPage]).then(
      () => this.getPage()
    );
  }

  getPage(): void {
    if (this.page) {
      if (this.page > this.totalPages || this.page < 1) {
        this.setNotFound();
      }
      this.users$.setPage(this.page);
    } else {
      this.setNotFound();
    }
  }

  onSelect(newPage?: number): void {
    if (newPage) {
      this.page = newPage;
      this.setNavigatePage(newPage);
    } else {
      this.setNavigatePage(this.page);
    }
  }

  onPrev(): void {
    this.users$.onPrev();
    this.onSelect(this.page);
    this.getPage();
  }

  onNext(): void {
    this.users$.onNext(this.totalPages);
    this.onSelect(this.page);
    this.getPage();
  }
}

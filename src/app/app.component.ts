import { Component, OnDestroy } from '@angular/core';
import { Router, Event as NavigationEvent, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'hm14';
  location = '';
  currentRoute$: Subscription;

  constructor(private router: Router) {
    this.currentRoute$ = this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if (event instanceof NavigationStart) {
            this.location = event.url;
          }
        });
  }

  ngOnDestroy(): void {
    this.currentRoute$.unsubscribe();
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hm14';
  location = '';

  public currentLink(link: string): void {
    this.location = link;
  }
}

import { Component } from '@angular/core';
import { TNasaData } from '../../model/nasa';
import { NasaService } from '../../services/nasa.service';

@Component({
  selector: 'app-nasa',
  templateUrl: './nasa.component.html',
  styleUrls: ['./nasa.component.scss']
})
export class NasaComponent {
  items: TNasaData[] = [];
  dataExist = false;
  loading = false;
  firstRequest = false;

  constructor(private nasa$: NasaService) {
  }

  getData(): void {
    this.items = [];
    this.firstRequest = true;
    this.loading = true;

    this.nasa$.getNasaData().subscribe((data: any) => {
      const { items } = data.collection;
      if (!items || !items.length) {
        this.loading = false;
        this.dataExist = false;
        return;
      }

      items.forEach((item: any) => {
        if (item.links) {
          const description = item.data[0].description;
          if (description && description.length < 1500) {
            const newCard: TNasaData = {
              href: item.href,
              image: item.links[0].href,
              description,
              date: item.data[0].date_created
            };
            this.items.push(newCard);
          }
        }
      });
      if (this.items.length) {
        this.dataExist = true;
      }
      this.loading = false;
    });
  }

  onSearch(event: any, value: string): void {
    event.preventDefault();
    if (value) {
      this.nasa$.onSearchNasa(value);
      this.getData();
    }
  }
}

import { Component } from '@angular/core';
import { articlesData } from '../../services/modal/data/artcles-data';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent {
  articles = articlesData;
}

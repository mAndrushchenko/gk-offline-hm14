import { Component, Input, OnInit } from '@angular/core';
import { TArticle } from '../../../services/modal/data/artcles-data';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  @Input() article!: TArticle;
}

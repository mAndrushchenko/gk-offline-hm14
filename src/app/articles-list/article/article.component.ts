import { Component, Input, OnInit } from '@angular/core'
import { TArticle } from './data/artcles-data'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() article!: TArticle
  ngOnInit(): void {}
}

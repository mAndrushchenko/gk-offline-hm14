import { Component, OnInit } from '@angular/core'
import { articlesData } from './article/data/artcles-data'

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  articles = articlesData

  ngOnInit(): void {}
}

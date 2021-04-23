import { Component, Input, OnInit } from '@angular/core';
import { Topic } from '../../../model/blog';
import { select, Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { AppState } from '../../../model/app.store';
import { editTopic, removeTopic } from '../../../store/blog/blog.actions';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  @Input() topic!: Topic;
  // @HostBinding('@destroyAnimation')
  // public myStatusExp: any;

  destroy = 'destroy'
  isEdit = false;
  inputFields = {
    title: '',
    description: ''
  };


  // topics$ = this.store.pipe(select(state => state.topics))

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
  }

  onEdit(): void {
    console.log(this.topic.description);
    this.isEdit = !this.isEdit;
  }

  onSaveChanges(): void {
    this.store.dispatch(editTopic({
      ...this.topic,
      title: this.inputFields.title,
      description: this.inputFields.description
    }))
  }

  onRemove(id: number): void {
    this.store.dispatch(removeTopic({ id }));
  }

  ngOnInit(): void {
    this.inputFields.title = this.topic.title;
    this.inputFields.description = this.topic.description;
  }
}

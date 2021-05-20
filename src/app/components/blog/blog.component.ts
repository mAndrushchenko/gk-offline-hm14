import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../model/app.store';
import { addTopic, setTopics } from '../../store/blog/blog.actions';
import { Topic } from '../../model/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  showEditor = false;
  topicForm!: FormGroup;
  animateDuration: number | null = null;
  topicData = {
    title: '',
    description: ''
  };

  topics$ = this.store.pipe(select(state => {
    window.localStorage.setItem('topics', JSON.stringify(state.topics));
    return state.topics;
  }));

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
  }

  resetFields() {
    this.topicForm.reset();
    this.topicData.title = '';
    this.topicData.description = '';
  }

  addTopic({ title, description }: { title: string, description: string }): void {

    const newTopic: Topic = {
      title,
      description,
      id: Date.now(),
      date: new Date()
    };
    this.store.dispatch(addTopic(newTopic));

    this.resetFields();
    this.animateDuration = setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 0);
    this.showEditor = false;
  }

  onCloseEditor(): void {
    this.resetFields();
    this.showEditor = false;
  }

  onShowEditor(): void {
    this.resetFields();
    this.showEditor = true;
  }

  ngOnInit(): void {
    const localData = window.localStorage.getItem('topics');
    if (localData) {
      const topics = JSON.parse(localData);
      this.store.dispatch(setTopics({ topics }));
    }

    this.topicForm = this.fb.group({
      title: [this.topicData.title, [
        Validators.minLength(3),
        Validators.required
      ]],
      description: [this.topicData.description, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500)
      ]]
    });
  }

  ngOnDestroy(): void {
    this.animateDuration = null;
  }

  get title(): AbstractControl | null {
    return this.topicForm.get('title');
  }

  get description(): AbstractControl | null {
    return this.topicForm.get('description');
  }

}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogComponent } from './blog.component';
import { DebugElement } from '@angular/core';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { topicReducer } from '../../store/blog/blog.reducer';
import { TopicComponent } from './topic/topic.component';
import { Topic } from '../../model/blog';
import { MockStore } from '@ngrx/store/testing';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let de: DebugElement;
  let store: MockStore;
  const initialState: Topic[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({ topics: topicReducer })
      ],
      declarations: [ BlogComponent, TopicComponent ],
      providers: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle editor', () => {
    expect(component.showEditor).toBeFalse()
    component.onShowEditor()
    expect(component.showEditor).toBeTruthy()
    component.onCloseEditor()
    expect(component.showEditor).toBeFalse()
    component.onShowEditor()
    expect(component.showEditor).toBeTruthy()
    component.addTopic({title: 'qwerty', description: 'abc asd qwe zxc qwe'})
    expect(component.showEditor).toBeFalse()
  });

  it('should be falsy on init', () => {
    let { title, description } = component.topicData
      expect(!!title).toBeFalse()
      expect(!!description).toBeFalse()
  });

  it('should be valid after setting data to the form', () => {
    component.onShowEditor()
    component.addTopic({title: 'qwerty', description: 'abc asd qwe zxc qwe'})
    let { title, description } = component.topicData
    expect(!!title).toBeFalse()
    expect(!!description).toBeFalse()
  });

});

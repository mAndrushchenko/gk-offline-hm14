import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogComponent } from './blog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { topicReducer } from '../../store/blog/blog.reducer';
import { TopicComponent } from './topic/topic.component';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

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
    expect(component.showEditor).toBeFalse();
    component.onShowEditor();
    expect(component.showEditor).toBeTruthy();
    component.onCloseEditor();
    expect(component.showEditor).toBeFalse();
    component.onShowEditor();
    expect(component.showEditor).toBeTruthy();
    component.addTopic({ title: 'qwerty', description: 'abc asd qwe zxc qwe' });
    expect(component.showEditor).toBeFalse();
  });

  it('should be falsy on init', () => {
    const { title, description } = component.topicData;
    expect(!!title).toBeFalse();
    expect(!!description).toBeFalse();
  });

  it('should be empty form after data added', () => {
    component.onShowEditor();
    component.addTopic({ title: 'test', description: 'test description' });
    const { title, description } = component.topicData;
    expect(!!title).toBeFalse();
    expect(!!description).toBeFalse();
  });
});

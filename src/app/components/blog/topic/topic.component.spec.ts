import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicComponent } from './topic.component';
import { newStateItem } from '../../../store/blog/blog.reducer.spec';
import { BlogComponent } from '../blog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { topicReducer } from '../../../store/blog/blog.reducer';

describe('TopicComponent', () => {
  let component: TopicComponent;
  let fixture: ComponentFixture<TopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({ topics: topicReducer })
      ],
      declarations: [ BlogComponent, TopicComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicComponent);
    component = fixture.componentInstance;
    component.topic = newStateItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

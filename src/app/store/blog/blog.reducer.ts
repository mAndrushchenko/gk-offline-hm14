import { createReducer, on } from '@ngrx/store';
import { addTopic, removeTopic, editTopic, setTopics } from './blog.actions';
import { Topic } from '../../model/blog';

export const initialState: Topic[] = [];


export const topicReducer = createReducer(
  initialState,
  on(addTopic, (state, action) => [ ...state, action ]),

  on(removeTopic, (state, action) => {
    return state.filter(topic => topic.id !== action.id);
  }),

  on(editTopic, (state, action) => {
    return state.map(topic => {
      if (topic.id === action.id) {
        return {
          ...topic,
          title: action.title,
          description: action.description
        };
      } else {
        return topic;
      }
    });
  }),

  on(setTopics, (state, action) => {
    return action.topics;
  })
);

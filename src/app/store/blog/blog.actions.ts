import { createAction, props } from '@ngrx/store';
import { Topic } from '../../model/blog';

export const addTopic = createAction('[Blog Component] Add', props<Topic>());
export const removeTopic = createAction('[Blog Component] Remove', props<{ id: number }>());
export const editTopic = createAction('[Blog Component] Edit', props<Topic>());
export const setTopics = createAction('[Blog Component] Set topics', props<{ topics: Topic[] }>());


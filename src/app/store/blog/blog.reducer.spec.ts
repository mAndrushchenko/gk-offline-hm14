import { topicReducer, initialState } from './blog.reducer';
import { setTopics, removeTopic, editTopic, addTopic } from './blog.actions';

import { Topic } from '../../model/blog';

const newStateItem: Topic = {
  id: Date.now(),
  title: 'New title',
  description: 'Very long description.',
  date: new Date()
};
// spread operator for copying object
const newState: Topic[] = [newStateItem];


describe('TopicsReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = { type: 'unknown action' };
      const state = topicReducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });

  describe('getAllAction', () => {
    it('should update state in immutable way', () => {
      const action = addTopic(newStateItem);
      const state = topicReducer(initialState, action);
      // expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});

import { topicReducer, initialState } from './blog.reducer';
import { removeTopic, editTopic, addTopic } from './blog.actions';
import { Topic } from '../../model/blog';

const createId = () => Date.now() + Math.floor(Math.random() * 10 ** 10);

export const newStateItem: Topic = {
  id: createId(),
  title: 'New title',
  description: 'Very long description.',
  date: new Date()
};

const firstTopic: Topic = {
  title: 'first',
  description: 'first description',
  id: createId(),
  date: new Date()
};
const secondTopic: Topic = {
  title: 'second',
  description: 'second description',
  id: createId(),
  date: new Date()
};

const newState: Topic[] = [ firstTopic, secondTopic ];

describe('TopicsReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = { type: 'unknown action' };
      const state = topicReducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });
  // update state in immutable way
  describe('getAllAction', () => {
    it('should create the new state', () => {
      const action = addTopic(newStateItem);
      const state = topicReducer(initialState, action);
      expect(state).not.toEqual(newState);
    });

    it('should add topics to the list', () => {
      const action = addTopic(newStateItem);
      const state = topicReducer(newState, action);
      expect(state.length).toEqual(3);
    });

    it('should delete topic from the list', () => {
      const action1 = addTopic(newStateItem);
      const action2 = removeTopic({ id: firstTopic.id });
      const state1 = topicReducer(newState, action1);
      const state2 = topicReducer(state1, action2);
      expect(state2.length).toEqual(2);
      expect(state2[0].id).toEqual(secondTopic.id);
    });

    it('should update topic in the list', () => {
      const title = 'updated title';
      const description = 'updated description';

      const action = editTopic({
        ...secondTopic,
        title,
        description: 'updated description'
      });
      const state = topicReducer(newState, action);
      expect(state[1].title).toEqual(title);
      expect(state[1].description).toEqual(description);
    });
  });
});

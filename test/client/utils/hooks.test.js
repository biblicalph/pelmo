
import { useForm, useSetPageTitle } from 'App/utils/hooks';
import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

const hooksDataTest = "hooks.container";
const formMeta = {
  errorMessage: '',
  isSubmitting: false,
  resp: null
};

const HooksComponent = (props) => {
  const hooks = props.hook();
  return (
    <div data-test={hooksDataTest} hooks={hooks} />
  );
};

describe('Hooks spec', () => {
  let wrapper;
  let initialFormState;
  let event;

  beforeEach(() => {
    initialFormState = {
      name: {
        validate: jest.fn().mockImplementation(() => true)
      },
      email: {
        value: 'johndoe@gmail.com',
        validate: jest.fn().mockImplementation(() => true)
      }
    };
    event = {
      target: {
        name: 'name',
        value: 'John'
      },
      preventDefault: jest.fn()
    };
  });

  describe('useSetPageTitle', () => {
    const title = 'Welcome to weather app';

    beforeEach(() => {
      global.document = {};
      wrapper = mount(<HooksComponent hook={() => useSetPageTitle(title)} />)
    });

    it('should set the document title', () => {
      expect(global.document.title).toEqual(`Pelmorex Weather App: ${title}`);
    });
  });

  describe('useForm', () => {
    describe('No initial state', () => {
      let hooks;

      beforeEach(() => {
        wrapper = mount(<HooksComponent hook={() => useForm()} />);
        const props = wrapper.find(`[data-test="${hooksDataTest}"]`).props();
        hooks = props.hooks;
      });

      it('should return the correct response', () => {
        expect(hooks).toEqual({
          inputs: {},
          onInputChange: expect.any(Function),
          onSubmit: expect.any(Function),
          meta: formMeta,
          resetForm: expect.any(Function)
        });
      });

      it('should add input to state when "onInputChange" is invoked', () => {
        act(() => hooks.onInputChange(event));
        wrapper.update();
        const props = wrapper.find(`[data-test="${hooksDataTest}"]`).props();
        expect(props.hooks.inputs).toEqual({
          [event.target.name]: {
            value: event.target.value
          }
        });
      });
    });
    
    describe('With initial state', () => {
      const asyncCallback = jest.fn();
      let hooks;

      beforeEach(() => {
        asyncCallback.mockClear();
        asyncCallback.mockImplementation(() => Promise.resolve({}));
        wrapper = mount(<HooksComponent hook={() => useForm({ stateSchema: initialFormState, asyncCallback })} />);
        const props = wrapper.find(`[data-test="${hooksDataTest}"]`).props();
        hooks = props.hooks;
      });

      it('should return the correct response', () => {
        expect(hooks).toEqual({
          inputs: initialFormState,
          onInputChange: expect.any(Function),
          onSubmit: expect.any(Function),
          meta: formMeta,
          resetForm: expect.any(Function)
        });
      });

      it('should set input value when "onInputChange" is invoked', () => {
        act(() => hooks.onInputChange(event));
        wrapper.update();
        const props = wrapper.find(`[data-test="${hooksDataTest}"]`).props();
        expect(props.hooks.inputs).toEqual({
          name: {
            value: event.target.value,
            validate: expect.any(Function)
          },
          email: {
            value: initialFormState.email.value,
            validate: expect.any(Function)
          }
        });
      });

      describe('onSubmit', () => {
        it('should invoke "preventDefault"', async () => {
          await act(async () => await hooks.onSubmit(event));
          expect(event.preventDefault).toHaveBeenCalledTimes(1);
        });
  
        it('should invoke input validators', async () => {
          await act(async () => await hooks.onSubmit(event));
          expect(initialFormState.email.validate).toHaveBeenCalledTimes(1);
          expect(initialFormState.name.validate).toHaveBeenCalledTimes(1);
        });
        
        it('should set "hasError=true" for each invalid input', async () => {
          initialFormState.email.validate.mockImplementationOnce(() => false);
          await act(async () => await hooks.onSubmit(event));
          wrapper.update();
  
          const props = wrapper.find(`[data-test="${hooksDataTest}"]`).props();
          expect(props.hooks.inputs).toEqual({
            name: expect.objectContaining({
              hasError: false
            }),
            email: expect.objectContaining({
              hasError: true
            })
          });
        });

        it('should set correct meta for successful request', async () => {
          await act(async () => await hooks.onSubmit(event));
          wrapper.update();

          const props = wrapper.find(`[data-test="${hooksDataTest}"]`).props();
          expect(props.hooks.meta).toEqual({
            ...formMeta,
            resp: {}
          });
        });

        it('should set correct meta for failed request', async () => {
          const error = new Error('Something bad');
          asyncCallback.mockImplementationOnce(() => Promise.reject(error));
          await act(async () => await hooks.onSubmit(event));
          wrapper.update();

          const props = wrapper.find(`[data-test="${hooksDataTest}"]`).props();
          expect(props.hooks.meta).toEqual({
            ...formMeta,
            errorMessage: error.message
          });
        });

        it('should invoke async callback', async () => {
          await act(async () => await hooks.onSubmit(event));
          
          expect(asyncCallback).toHaveBeenCalledTimes(1);
          expect(asyncCallback).toHaveBeenCalledWith({
            name: initialFormState.name.value,
            email: initialFormState.email.value
          });
        });
      });
    });
  });
});
import Contact from 'App/components/contact/Contact';
import { mount, shallow } from 'enzyme';
import React from 'react';

describe('Contact component spec', () => {
  let wrapper;

  describe('Form components', () => {
    beforeEach(() => {
      wrapper = shallow(<Contact />);
    });

    it('should render contact us header', () => {
      expect(wrapper.find('[data-test="contact-form.header"]')).toHaveLength(1);
    });
  
    it('should render name input', () => {
      expect(wrapper.find('[data-test="contact-form.name-input"]')).toHaveLength(1);
    });
  
    it('should render email input', () => {
      expect(wrapper.find('[data-test="contact-form.email-input"]')).toHaveLength(1);
    });
  
    it('should render phone number input', () => {
      expect(wrapper.find('[data-test="contact-form.phone-input"]')).toHaveLength(1);
    });
  
    it('should render submit button', () => {
      expect(wrapper.find('[data-test="contact-form.submit-btn"]')).toHaveLength(1);
    });
  });

  describe('Validation', () => {
    beforeEach(() => {
      wrapper = mount(<Contact />);
    });

    it('should display validation error if field is invalid', () => {
      wrapper.simulate('submit');
      const nameInput = wrapper.find('[data-test="contact-form.name-input"]');
      const emailInput = wrapper.find('[data-test="contact-form.email-input"]');
      const phoneInput = wrapper.find('[data-test="contact-form.phone-input"]');

      expect(nameInput.props()).toHaveProperty('error', expect.any(String));
      expect(emailInput.props()).toHaveProperty('error', expect.any(String));
      expect(phoneInput.props()).toHaveProperty('error', expect.any(String));
    });
  });
});
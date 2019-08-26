

import 'App/components/contact/contact.css';
import FormInput from 'App/components/formInput/FormInput';
import { getApiUrl, isValidEmail, isValidString, makePost, useForm, useSetPageTitle } from 'App/utils';
import React from 'react';

const successMessage = 'Your details have been submitted. Thank you!';
const initialFormState = {
  name: {
    validate: isValidString
  },
  email: {
    validate: isValidEmail
  },
  phoneNumber: {
    validate: isValidString
  }
};

const postContactForm = (data) => makePost({
  url: getApiUrl({ path: 'contact-us' }),
  data
});

const Contact = () => {
  useSetPageTitle('Contact Us');
  const {inputs, onInputChange, onSubmit, meta} = useForm({ 
    stateSchema: initialFormState,
    asyncCallback: postContactForm  
  });

  return (
    <section className="contact-container">
      <h2 data-test="contact-form.header">Contact Us</h2>
      <form className="contact-form" onSubmit={onSubmit}>
        {meta.errorMessage && (
          <div 
            data-test="contact-form.error-message"
            className="contact-form-message form-error-message">
            {meta.errorMessage}
          </div>)}
        {meta.resp && (
          <div 
            data-test="contact-form.success-message" 
            className="contact-form-message form-success-message">
            {successMessage}
          </div>)}
        <FormInput 
          label="Name" 
          name="name"
          placeholder="Your fullname" 
          value={inputs.name.value} 
          onChange={onInputChange}
          error={inputs.name.hasError ? 'Name is required' : ''}
          data-test="contact-form.name-input"
          />
        <FormInput 
          label="Email Address" 
          placeholder="Your email address"
          type="email" 
          name="email"
          value={inputs.email.value} 
          onChange={onInputChange}
          error={inputs.email.hasError ? 'A valid email is required' : ''}
          data-test="contact-form.email-input"
          />
        <FormInput 
          label="Phone Number"
          placeholder="Your phone number" 
          name="phoneNumber"
          value={inputs.phoneNumber.value}
          onChange={onInputChange}
          error={inputs.phoneNumber.hasError ? 'Phone number is required' : ''}
          data-test="contact-form.phone-input"
          />
        <button 
          type="submit" 
          disabled={meta.isSubmitting}
          data-test="contact-form.submit-btn"
          className="contact-form-submit-btn">{meta.isSubmitting ? 'Submitting...' : 'Submit'} </button>
      </form>
    </section>
  );
};

export default Contact;
import React from 'react'

import './Form.css'

export default ({
  name = 'enquiries',
  subject = 'lizkirkpersonaltraining enquiry', // optional subject of the notification email
  action = ''
}) => (
    <form 
        method="POST"
        data-netlify-recaptcha="true"
        data-netlify="true"
        className='Form'
        name={name}>
    <input type='hidden' name='form-name' value={name} />
        <div className="Form--Group">
            <label className="Form--Label">
                <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Firstname"
                name="firstname"
                required
                />
                <span>Firstname</span>
            </label>
            <label className="Form--Label">
                <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Lastname"
                name="lastname"
                required
                />
                <span>Lastname</span>
            </label>
        </div>
        <label className="Form--Label">
        <input
            className="Form--Input Form--InputText"
            type="email"
            placeholder="Email"
            name="emailAddress"
            required
        />
        <span>Email address</span>
        </label>

        <label className="Form--Label">
        <textarea
            className="Form--Input Form--Textarea Form--InputText"
            placeholder="Message"
            name="message"
            rows="10"
            required
        />
        <span>Message</span>
        </label>
        <label className="Form--Label Form-Checkbox">
        <input
            className="Form--Input Form--Textarea Form--CheckboxInput"
            name="newsletter"
            type="checkbox"
        />
        <span>Get new updates via email</span>
        </label>
    <div data-netlify-recaptcha="true"></div>
    <input
        className="Button Form--SubmitButton"
        type="submit"
        value="Enquire"
    />
  </form>
)

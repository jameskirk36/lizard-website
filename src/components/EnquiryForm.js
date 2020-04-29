import React from 'react'

import './Form.css'

export default ({
  name = 'enquiries',
  subject = 'lizkirkpersonaltraining enquiry', // optional subject of the notification email
  action = ''
}) => (
    <form 
        method="POST"
        netlify-recaptcha="true"
        netlify="true"
        netlify-honeypot="not-today"
        className='Form'
        name={name}>
    <input name='form-name' value={name} hidden />
    <input name="not-today" hidden />
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
    <div netlify-recaptcha="true"></div>
    <input
        className="Button Form--SubmitButton"
        type="submit"
        value="Enquire"
    />
  </form>
)

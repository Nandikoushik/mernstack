
import './style.css'
function contact() {
  return (
<div class="content">
<div class="container">
<div class="row align-items-stretch justify-content-center no-gutters">
<div class="col-md-7">
<div class="form-h-100-contact-wrap-p-5">
<h3 class="error"><b>Let's Talk</b></h3>
<form class="mb-5"  id="contactForm" name="contactForm" novalidate="novalidate" className="contactForm">
<div class="row">
<div class="col-md-6 form-group mb-3">
<label for="" class="col-form-label"><b>Name *</b></label>
<input type="text" class="form-control error" name="name" id="name" placeholder="Your name" aria-required="true" aria-invalid="true"/><label id="name-error" class="error" for="name">Please enter your name</label>
</div>
<div class="col-md-6 form-group mb-3">
<label for="" class="col-form-label"><b>Email *</b></label>
<input type="email" class="form-control error" name="email" id="email" placeholder="Your email" aria-required="true"/><label id="email-error" class="error" for="email">Please enter a valid email address</label>
</div>
</div>
<div class="row">
<div class="col-md-12 form-group mb-3">
<label for="budget" class="col-form-label"><b>Subject</b></label>
<input type="text" class="form-control" name="subject" id="subject" placeholder="Your subject"/>
</div>
</div>
<div class="row mb-5">
<div class="col-md-12 form-group mb-3">
<label for="message" class="col-form-label"><b>Message *</b></label>
<textarea class="form-control error" name="message" id="message" cols="30" rows="4" placeholder="Write your message" aria-required="true"></textarea><label id="message-error" class="error" for="message">Please enter a message</label>
</div>
</div>
<div class="row justify-content-center">
<div class="col-md-5 form-group text-center">
<input type="submit" value="Send Message" class="btn-btn-block-btn-primary-rounded-0-py-2-px-4" disabled/>
<span class="submitting"></span>
</div>
</div>
</form>
<div id="form-message-warning mt-4"></div>
<div id="form-message-success"><b>
Your message was sent, thank you!</b>
</div>
</div>
</div>
</div>
</div>
</div>
  );
}
export default contact;

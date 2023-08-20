import React, { useState, useRef } from 'react'
import emailjs from "@emailjs/browser";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import './Contact.css'

const Contact = () => {
  const form = useRef();
  const [done, setDone] = useState(false)
  const [notDone, setNotDone] = useState(false)
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setDone(false)
    setNotDone(false)
  }

  const sendEmail = (e) => {
    e.preventDefault();

    if (!formData.from_name || !formData.reply_to || !formData.message) {
      setNotDone(true)
    } else {

      //  Please use your own credentials from emailjs or i will recive your email

      emailjs
        .sendForm(
          "service_8pfougm",
          "template_wqyu1zc",
          form.current,
          "hahS5JmrAgICUmpGs"
        )
        .then(
          (result) => {
            console.log(result.text);
            setDone(true);
            mailSendDone(e);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  const mailSendDone=(e)=>{
    e.preventDefault();
    setTimeout(()=>{
      setDone(false);
    },5000)
  }


  return (
    <Container  className='contact'>
      <Row >
        <Col md={6} className="c-left" >
          <h1  style={{'color':'red'}}>Get in Touch</h1>
          <h1 className="yellow">Contact me on</h1>
          <br />
          <h3 style={{ fontFamily: 'monospace', color: 'red' }}>[ +91  9564621375 ]</h3>
          <br />
          <h3 style={{ fontFamily: 'monospace', color: 'green' }}>[  careerkoushik2023@gmail.com  ]</h3>
        </Col>
        <Col md={6} className="c-right">
          <form ref={form} onSubmit={sendEmail}>
            <input type="text" name="from_name" className="user" placeholder="Name" onChange={handleChange} defaultValue="" />
            <input type="email" name="reply_to" className="user" placeholder="Email" onChange={handleChange} defaultValue="" />
            <textarea name="message" className="user" placeholder="Message" onChange={handleChange} defaultValue="" />
            <span className='not-done' >{notDone && "Please, fill all the input field before click on Send Button"}</span>
            <Button type="submit" className="button" disabled={done}>Send</Button>
            <span className='done'>{done && "Thanks for contacting with me and be sure i have recieved your mail.If you need me Urgent , you can conatct me on Linkedin Also."}</span>
          </form>
        </Col>
      </Row>
    </Container>
  )
}

export default Contact
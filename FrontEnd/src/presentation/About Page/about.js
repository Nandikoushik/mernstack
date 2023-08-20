import { useLocation } from "react-router";
import "./aboutstyle.css";
function About() {
  const location = useLocation();
  console.log(location.state);
  return (
    <div className="about" id="about">
      <h1 style={{color:'red'}}>About Page</h1>
      <h4 style={{color:'white'}}>
        It is a technology platform offering a variety of services at
        home. Customers use our platform to book services such as beauty
        treatments, haircuts, massage therapy, cleaning, plumbing, carpentry,
        appliance repair, painting etc. These services are delivered in the
        comfort of their home and at a time of their choosing. We promise our
        customers a high quality, standardised and reliable service experience.
        To fulfill this promise, we work closely with our hand-picked service
        partners, enabling them with technology, training, products, tools,
        financing, insurance and brand, helping them succeed and deliver on this
        promise.{" "}
      </h4>
    </div>
  );
}

export default About;

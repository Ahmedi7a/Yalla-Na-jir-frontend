import React from "react";

const teamMembers = [
  {
    name: "Sayed Haider",
    role: "Software Developer",
    image: "./enhanced-image copy.png",
    linkedin: "https://www.linkedin.com/in/sayed-haider-al-hashemi"
  },
  {
    name: "Ahmed Abdulla",
    role: "Software Developer",
    image: "./ahmedii.png",
    linkedin: "https://www.linkedin.com/in/ahmed-abdulla-amralla"
  },
  {
    name: "Mahmood Almajed",
    role: "Software Developer",
    image: "./out.png",
    linkedin: "https://www.linkedin.com/in/mahmood-almajed"
  },
  {
    name: "Abbas Hussain",
    role: "Software Developer",
    image: "./enhanced-image.png",
    linkedin: "https://www.linkedin.com/in/abbashussainj"
  },
];

const About = () => {
  return (
    <section className="py-1" style={{marginBottom:40}}>
      <div className="container text-center">
        <h1 className="mb-5 fw-bold" style={{ marginTop: 50 }}>Our Team</h1>
        <div className="row justify-content-center g-4">
        <p style={{maxWidth: "1000px", marginBottom: 30}}>Rent<span className="text-warning fw-bold">X</span>press is created by a team of four passionate developers committed to revolutionizing car rentals.
                 We aim to provide a seamless, secure, and user-friendly platform that connects car owners with renters effortlessly.
                  With a focus on convenience, trust, and accessibility, we make finding and listing cars easier than ever. 
                  Your perfect ride is just a few clicks away!</p>
          {teamMembers.map((member, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="team-card-link">
                <div className="team-card shadow-sm">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-100"
                  />
                  <div className="team-info">
                    <h5>{member.name}</h5>
                    <p>{member.role}</p>
                    <i className="bi bi-linkedin"></i>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

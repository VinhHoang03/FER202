function Footer({ myprofile }) {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="text-center p-3">
        <img src={myprofile.avatar} alt="Avatar" style={{width: '50px', height: '50px',  }}></img>
        <h5>{myprofile.name}</h5>
        <p>{myprofile.email}</p>
      </div>
    </footer>
  )
}

export default Footer;
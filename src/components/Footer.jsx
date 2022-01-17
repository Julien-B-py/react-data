function Footer(props) {
  return (
    <div className="footer">
      <div className="container">
        <p>
          ❝ <i>{props.quote}</i> ❞ {props.author && "- " + props.author}
        </p>
        © {new Date().getFullYear()},{" "}
        <a href="https://github.com/Julien-B-py">
          Julien BEAUJOIN <i className="fab fa-github"></i>
        </a>
      </div>
    </div>
  );
}

export default Footer;

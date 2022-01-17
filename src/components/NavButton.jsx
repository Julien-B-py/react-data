function NavButton(props) {
  return (
    <a
      className={"fas fa-caret-" + props.direction + " custom-button"}
      onClick={() => props.onPictureChange(props.direction)}
    ></a>
  );
}

export default NavButton;

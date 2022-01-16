function NavButton(props) {
  return (
    <a
      className={"fas fa-caret-" + props.direction + " custom-button"}
      onClick={() => props.onPictureChange()}
    ></a>
  );
}

export default NavButton;

import closeIcon from "../images/Close_Icon.png";
import { useEffect } from "react";

export default function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  btnText,
  onSubmit,
}) {

  //закрытие по esc
  function handleEscClose(evt) {
    evt.key === "Escape" && onClose();
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => 
    document.removeEventListener("keydown", handleEscClose);
  });

  //разметка
  return (
    <div
      className={`popup popup_type-${name} 
    ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button className="popup__btn-close" type="button">
          <img
            className="popup__btn-close-pic"
            src={closeIcon}
            alt="Закрыть"
            onClick={onClose}
          />
        </button>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type-${name}`}
          action="popup__form"
          name="popup__name"
          method="post"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__btn popup__btn-create" type="submit">
            {btnText || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

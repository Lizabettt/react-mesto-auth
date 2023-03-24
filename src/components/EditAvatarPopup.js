// import { useRef } from "react";
import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatarUser,
}) {
  // const avatar = useRef();

  //По заданию надо конечно использовать useRef,
  // но по логике надо сюда useEffect. .....

  const { values, setValues, handleChange } = useForm({});

  useEffect(() => {
    setValues({});
  }, [setValues, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatarUser({
      avatar: values.avatar,
    });
  }

  return (
    <PopupWithForm
      name="user-foto"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-input">
        <input
          className="popup__input popup__input_type_avatar"
          id="popupAvatar"
          type="text"
          placeholder="Введите адрес"
          name="avatar"
          minLength="2"
          maxLength="200"
          required
          autoComplete="off"
          // ref={avatar}
          value={values.avatar || ""}
          onChange={handleChange}
        />
        <span className="popup__help popupAvatar-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDataCards, setDataCards] = useState({});
  const [chooseCard, setChooseCard] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]); //перенесли из мейн

  //смена аватара
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  //смена профиля
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  //добавление новой карточки
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  //посмотреть карточку поближе:)
  const handleShowСardClick = (card) => {
    setChooseCard(true);
    setDataCards(card);
  };

  // 1.Есть лайк? 2. запрос в апи на обновление
  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (selectedCard) => selectedCard._id === currentUser._id
    );
    api
    .changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) =>
        state.map((selectedCard) =>
          selectedCard._id === card._id ? newCard : selectedCard
        )
      );
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //удаляем карточку
  const handleCardDelete = (card) => {
    api
    .deleteCard(card._id)
    .then(() => {
      setCards(() =>
        cards.filter((selectedCard) => 
        selectedCard._id !== card._id)
      );
    })
    .catch((err) => {
      console.log(err);
    });
  };

  //все закрой
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setChooseCard(null);
  }

  //грузим карточки и инфо пользователя с сервера
  useEffect(() => {
    Promise.all([api.getUserData(), api.getAllCards()])
    .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      }
    )
    .catch((err) => {
      console.log(err);
    });
  }, []);

  //меняем инфо пользователя
  function handleUpdateUser(data) {
    api
    .changeUserData(data)
    .then(setCurrentUser, closeAllPopups())
    .catch((err) => {
      console.log(err);
    });
  }

  //меняем аватарку
  function handleUpdateUserAvatar(data) {
    api
    .changeAvatar(data)
    .then(setCurrentUser, closeAllPopups())
    .catch((err) => {
      console.log(err);
    })
  }
  //
  function handleAddPlaceSubmit(data) {
    api
    .createNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()})    
    .catch((err) => {
      console.log(err);
    });
  }

  //разметка
  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Main
            changeAvatar={handleEditAvatarClick}
            changeProfile={handleEditProfileClick}
            addPlace={handleAddPlaceClick}
            cards={cards}
            showСard={handleShowСardClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
          />
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatarUser={handleUpdateUserAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          btnText="Да"
        ></PopupWithForm>

        <ImagePopup
          name="img"
          card={isDataCards}
          isOpen={chooseCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

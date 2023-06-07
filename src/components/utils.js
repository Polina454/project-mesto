import { cardsContainer } from "./index.js";
import { createCard } from "./card";


 export function renderPopup(cardInfo){
  cardsContainer.prepend(createCard(cardInfo));
 }



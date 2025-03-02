import { CardInterface } from "@/interface/card.interface";
import { GoCommentDiscussion, GoMortarBoard } from "react-icons/go";

export const cardLinks: CardInterface[] = [
  {
    name: 'Chat',
    link: 'simple-chat',
    icon: <GoCommentDiscussion size={24}/>
  },
  {
    name: 'Game',
    link: 'game-chat',
    icon: <GoMortarBoard size={24} />
  }
];
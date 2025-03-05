import { CardInterface } from "@/interface/card.interface";
import { GoCommentDiscussion, GoHome, GoMortarBoard } from "react-icons/go";

export const cardLinks: CardInterface[] = [
  {
    name: 'Home',
    link: '',
    icon: <GoHome size={24}/>
  },
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
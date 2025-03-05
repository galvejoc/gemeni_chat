export interface typeGameInterface {
  type: string;
  level: string[];
}

export interface responseGameInterface {
  question: string;
  answers: string[];
  trueAnswers: number;
}

export interface scoreInterface {
  score: number;
  newScore: number;
}

export interface selectGameInterface {
  type: string;
  level: string;
  setType : (a: string)=> void;
  setLevel: (a: string)=> void;
  gameSelect: typeGameInterface[];
}

export interface gameFormInterface {
  addNewScore: ()=> void, 
  deleteNewScore: ()=> void, 
  type: string, 
  level: string,
}


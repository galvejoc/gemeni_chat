import { responseGameInterface, typeGameInterface } from "@/interface";

export const typeGameEs: typeGameInterface[] = [
  {
    type: "Mastematicas",
    level: [
      'Sumas, restas, multiplicaciones simples.',
      'Fracciones, porcentajes, reglas de tres.',
      'Álgebra, ecuaciones, problemas de lógica compleja']
  },
  {
    type: "Cultura General",
    level: [
      'Capitales del mundo, banderas, países más grandes.',
      'Capitales del mundo, banderas, países más grandes.',
      'Hechos históricos poco conocidos, tratados y guerras.']
  },
  {
    type: "Ciencia y Tecnología",
    level: [
      'El sistema solar, los planetas, los cinco sentidos.',
      'Descubrimientos científicos, tipos de energía, física básica.',
      'Biotecnología, inteligencia artificial, teorías avanzadas.']
  },
  {
    type: "Cine y Series",
    level: [
      'Películas de Disney, personajes famosos.',
      'Premios Oscar, directores famosos, sagas populares.',
      'Cine clásico, películas de culto, referencias ocultas.']
  },
  {
    type: "Literatura y Mitología",
    level: [
      'Cuentos clásicos, autores famosos.',
      'Obras literarias importantes, mitología griega y nórdica.',
      'Literatura medieval, novelas filosóficas, poesía antigua.']
  },
  {
    type: "Deportes",
    level: [
      'Reglas básicas de fútbol, baloncesto, tenis.',
      'Jugadores históricos, récords olímpicos.',
      'Estadísticas avanzadas, momentos históricos de los deportes.']
  },
  {
    type: "Música",
    level: [
      'Canciones famosas, instrumentos musicales básicos.',
      'Bandas icónicas, géneros musicales.',
      'Teoría musical, historia de la música, compositores clásicos.']
  },
  {
    type: "Adivinanzas y Lógica",
    level: [
      'Acertijos sencillos de lógica.',
      'Problemas de pensamiento lateral.',
      'Enigmas matemáticos, acertijos complejos.']
  },
]

export const empyResponseGameInterface: responseGameInterface = {
  question: '',
  answers: ['', '', '', ''],
  trueAnswers: 0,
}
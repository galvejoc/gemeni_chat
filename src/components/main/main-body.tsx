import { cardLinks } from "@/constants/card-link";
import { Card } from "./card";

export function BodyPrincipal() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4">
      {cardLinks.map((card, index) => (
        <Card name={card.name} link={card.link} key={index} />
      ))}
    </div>
  )
}

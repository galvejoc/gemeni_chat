import { cardLinks } from "@/constants/card-link";
import { Card } from "./card";

export function BodyPrincipal() {
  return (
    <div className=" container mx-auto px-4">
      <h1 className=" text-3xl font-bold text-center mb-2">Home</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 mt-3">
        {cardLinks.map((card, index) => (
          <Card name={card.name} link={card.link} key={index} />
        ))}
      </div>
    </div>
  )
}

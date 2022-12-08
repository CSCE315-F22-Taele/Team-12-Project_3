import { StaticImageData } from "next/image";
import Reveille from "../../public/ReveillePic.jpg";
import BaconBurger from "../../public/images/BaconBurger.webp";
import BBQSauce from "../../public/images/BBQSauce.png";
import BlackBeanBurger from "../../public/images/BlackBeanBurger.jpg";
import CaesarSalad from "../../public/images/CaesarSalad.jpg";
import ChickenSandwich from "../../public/images/ChickenSandwich.png";
import ChickenTenders from "../../public/images/ChickenTenders.jpeg";
import ChocolateIceCreamCup from "../../public/images/ChocolateIceCreamCup.jpg";
import ChocolateAggieShake from "../../public/images/ChocolateShake.jpg";
import ClassicBurger from "../../public/images/ClassicBurger.jpg";
import CookieSandwich from "../../public/images/CookieSandwich.webp";
import Cups from "../../public/images/Cups.png";
import DietPepsi from "../../public/images/DietPepsi.jpg";
import Forks from "../../public/images/Forks.png";
import FrenchFries from "../../public/images/FrenchFries.jpg";
import GigEmPattyMelt from "../../public/images/GigEmPattyMelt.jpg";
import GigEmSauce from "../../public/images/GigEmSauce.png";
import HoneyMustard from "../../public/images/HoneyMustard.png";
import Knives from "../../public/images/Knives.jpg";
import Pepsi from "../../public/images/Pepsi.jpg";
import Plates from "../../public/images/Plates.png";
import RanchSauce from "../../public/images/RanchSauce.webp";
import SpicyRanchSauce from "../../public/images/SpicyRanchSauce.jpg";
import Spoons from "../../public/images/Spoons.png";
import StrawberryIceCreamCup from "../../public/images/StrawberryIceCreamCup.jpg";
import StrawberryAggieShake from "../../public/images/StrawberryShake.jpg";
import Tissues from "../../public/images/Tissues.png";
import VanillaIceCreamCup from "../../public/images/VanillaIceCreamCup.jpg";
import VanillaAggieShake from "../../public/images/VanillaShake.jpg";

// export const images: StaticImageData[] = [
//     BaconBurger, BBQSauce, BlackBeanBurger, CaesarSalad, ChickenSandwich, ChickenTenders, 
//     ChocolateAggieShake, ChocolateIceCreamCup, ClassicBurger, CookieSandwich, Cups, DietPepsi, Forks,
//     FrenchFries, GigEmPattyMelt, GigEmSauce, HoneyMustard, Knives, Pepsi, Plates, RanchSauce, 
//     SpicyRanchSauce, Spoons, StrawberryAggieShake, StrawberryIceCreamCup, Tissues, VanillaAggieShake, VanillaIceCreamCup
// ]

export const images: { [itemName: string]: StaticImageData } = {
    "Bacon Burger": BaconBurger,
    "BBQ Sauce": BBQSauce,
    "Black Bean Hamburger": BlackBeanBurger,
    "Caesar Salad": CaesarSalad,
    "Chicken Sandwich": ChickenSandwich,
    "Chicken Tenders": ChickenTenders,
    "Chocolate Aggie Shake": ChocolateAggieShake,
    "Chocolate Ice Cream Cup": ChocolateIceCreamCup,
    "Classic Hamburger": ClassicBurger,
    "Cookie Sandwich": CookieSandwich,
    "Cups": Cups,
    "Diet Pepsi": DietPepsi,
    "Forks": Forks,
    "French Fries": FrenchFries,
    "Gig Em Patty Melt": GigEmPattyMelt,
    "Gig Em Sauce": GigEmSauce,
    "Honey Mustard Sauce": HoneyMustard,
    "Knives": Knives,
    "Pepsi": Pepsi,
    "Plates": Plates,
    "Ranch Sauce": RanchSauce,
    "Spicy Ranch Sauce": SpicyRanchSauce,
    "Spoons": Spoons,
    "Strawberry Aggie Shake": StrawberryAggieShake,
    "Strawberry Ice Cream Cup": StrawberryIceCreamCup,
    "Tissues": Tissues,
    "Vanilla Aggie Shake": VanillaAggieShake,
    "Vanilla Ice Cream Cup": VanillaIceCreamCup,
    "None": Reveille
}

// export default {
//     images
// }

export default function app () {
    return <></>;
}
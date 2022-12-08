import { StaticImageData } from "next/image";
import Reveille from "@/p/ReveillePic.jpg";
import BaconBurger from "@/p/images/BaconBurger.webp";
import BBQSauce from "@/p/images/BBQSauce.png";
import BlackBeanBurger from "@/p/images/BlackBeanBurger.jpg";
import CaesarSalad from "@/p/images/CaesarSalad.jpg";
import ChickenSandwich from "@/p/images/ChickenSandwich.png";
import ChickenTenders from "@/p/images/ChickenTenders.jpeg";
import ChocolateIceCreamCup from "@/p/images/ChocolateIceCreamCup.jpg";
import ChocolateAggieShake from "@/p/images/ChocolateShake.jpg";
import ClassicBurger from "@/p/images/ClassicBurger.jpg";
import CookieSandwich from "@/p/images/CookieSandwich.webp";
import Cups from "@/p/images/Cups.png";
import DietPepsi from "@/p/images/DietPepsi.jpg";
import Forks from "@/p/images/Forks.png";
import FrenchFries from "@/p/images/FrenchFries.jpg";
import GigEmPattyMelt from "@/p/images/GigEmPattyMelt.jpg";
import GigEmSauce from "@/p/images/GigEmSauce.png";
import HoneyMustard from "@/p/images/HoneyMustard.png";
import Knives from "@/p/images/Knives.jpg";
import Pepsi from "@/p/images/Pepsi.jpg";
import Plates from "@/p/images/Plates.png";
import RanchSauce from "@/p/images/RanchSauce.webp";
import SpicyRanchSauce from "@/p/images/SpicyRanchSauce.jpg";
import Spoons from "@/p/images/Spoons.png";
import StrawberryIceCreamCup from "@/p/images/StrawberryIceCreamCup.jpg";
import StrawberryAggieShake from "@/p/images/StrawberryShake.jpg";
import Tissues from "@/p/images/Tissues.png";
import VanillaIceCreamCup from "@/p/images/VanillaIceCreamCup.jpg";
import VanillaAggieShake from "@/p/images/VanillaShake.jpg";

// export const images: StaticImageData[] = [
//     BaconBurger, BBQSauce, BlackBeanBurger, CaesarSalad, ChickenSandwich, ChickenTenders,
//     ChocolateAggieShake, ChocolateIceCreamCup, ClassicBurger, CookieSandwich, Cups, DietPepsi, Forks,
//     FrenchFries, GigEmPattyMelt, GigEmSauce, HoneyMustard, Knives, Pepsi, Plates, RanchSauce,
//     SpicyRanchSauce, Spoons, StrawberryAggieShake, StrawberryIceCreamCup, Tissues, VanillaAggieShake, VanillaIceCreamCup
// ]

export let images: { [itemName: string]: StaticImageData } = {
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
	Cups: Cups,
	"Diet Pepsi": DietPepsi,
	Forks: Forks,
	"French Fries": FrenchFries,
	"Gig Em Patty Melt": GigEmPattyMelt,
	"Gig Em Sauce": GigEmSauce,
	"Honey Mustard Sauce": HoneyMustard,
	Knives: Knives,
	Pepsi: Pepsi,
	Plates: Plates,
	"Ranch Sauce": RanchSauce,
	"Spicy Ranch Sauce": SpicyRanchSauce,
	Spoons: Spoons,
	"Strawberry Aggie Shake": StrawberryAggieShake,
	"Strawberry Ice Cream Cup": StrawberryIceCreamCup,
	Tissues: Tissues,
	"Vanilla Aggie Shake": VanillaAggieShake,
	"Vanilla Ice Cream Cup": VanillaIceCreamCup,
	None: Reveille,
};

// export default {
//     images
// }

export default function app() {
	return <></>;
}

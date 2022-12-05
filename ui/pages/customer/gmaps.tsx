import { Grid } from "@mui/material";
import Map from "../../components/gmaps/Map";
import Header from "../../components/gmaps/Header";
import List from "../../components/gmaps/List";
import { GetServerSidePropsContext } from "next";
import { useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { serverSideInstance } from "../../components/utils";
import { placesData } from "../../components/gmaps/placesData";

const getPlacesData = async (
	type: string,
	sw: google.maps.LatLng,
	ne: google.maps.LatLng
) => {
	try {
		const {
			data: { data },
		} = await axios.get(
			`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
			{
				params: {
					bl_latitude: sw.lat(),
					bl_longitude: sw.lng(),
					tr_longitude: ne.lng(),
					tr_latitude: ne.lat(),
				},
				headers: {
					"X-RapidAPI-Key":
						process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY ?? "",
					"X-RapidAPI-Host":
						process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST ?? "",
				},
			}
		);

		return data;
	} catch (error) {
		console.error(error);
	}
};

type Libraries = (
	| "drawing"
	| "geometry"
	| "localContext"
	| "places"
	| "visualization"
)[];

export interface Place {
	latitude?: string;
	longitude?: string;
	name?: string;
	rating?: string;
	num_reviews?: string;
	price_level?: string;
	ranking?: string;
	awards?: any[];
	cuisine?: any[];
	address?: string;
	phone?: string;
	web_url?: string;
	website?: string;
	photo?: any;
}

export interface GBounds {
	ne?: google.maps.LatLng;
	sw?: google.maps.LatLng;
}

interface thisProps<T extends Place> {
	libraries: Libraries;
	placesData: T[];
}

export default function GMaps<T extends Place>({
	libraries,
	placesData,
}: thisProps<T>) {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "", // NEXT_PUBLIC_
		libraries: libraries,
	});

	const [coordinates, setCoordinates] = useState<google.maps.LatLngLiteral>({
		lat: 0,
		lng: 0,
	});
	const [bounds, setBounds] = useState<GBounds>({});
	const [type, setType] = useState<string>("restaurants");
	const [rating, setRating] = useState<number>(0);
	const [childClicked, setChildClicked] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [places, setPlaces] = useState<T[]>(placesData);
	const [filteredPlaces, setFilteredPlaces] = useState<T[]>([]);
	const [autoComplete, setAutoComplete] =
		useState<google.maps.places.Autocomplete | null>(null);

	const onLoad = (autoC: google.maps.places.Autocomplete) =>
		setAutoComplete(autoC);

	const onPlaceChanged = () => {
		const lat = autoComplete!.getPlace().geometry!.location!.lat();
		const lng = autoComplete!.getPlace().geometry!.location!.lng();

		setCoordinates({ lat, lng });
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				setCoordinates({ lat: latitude, lng: longitude });
			}
		);
	}, []);

	/* useEffect(() => {
		if (bounds && bounds.sw && bounds.ne) {
			setIsLoading((isLoading) => !isLoading);
			// getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
			// 	setPlaces(
			// 		data?.filter(
			// 			(place: any) => place.name && Number(place.num_reviews) > 0
			// 		)
			// 	);
			// 	setFilteredPlaces([]);
			// 	setIsLoading(false);
			// });
		}
	}, [coordinates]); */

	useEffect(() => {
		if (!places) return;

		const filtered = places.filter(
			(place) => Number(place.rating) > rating
		);

		setFilteredPlaces(filtered);
	}, [rating]);

	if (!isLoaded) {
		return "Loading...";
	}

	return (
		<>
			<Header
				onLoad={onLoad}
				onPlaceChanged={onPlaceChanged}
			/>
			<Grid container style={{ width: "100%" }}>
				<Grid item xs={12} md={4}>
					<List
						type={type}
						setType={setType}
						rating={rating}
						setRating={setRating}
						places={filteredPlaces.length ? filteredPlaces : places}
						childClicked={childClicked}
						isLoading={isLoading}
					/>
				</Grid>
				<Grid item xs={12} md={8}>
					<Map
						coordinates={coordinates}
						setCoordinates={setCoordinates}
						setBounds={setBounds}
						places={filteredPlaces.length ? filteredPlaces : places}
						setChildClicked={setChildClicked}
					/>
				</Grid>
				<div>{JSON.stringify(bounds)}</div>
			</Grid>
		</>
	);
}

export async function getStaticProps() {
	/* const {
		data: { data },
	} = await axios({
		url: `https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`,

		params: {
			bl_latitude: 30.59080297509117,
			bl_longitude: -96.3755940492834,
			tr_longitude: -96.2877034242834,
			tr_latitude: 30.648268524517892,
		},
		headers: {
			"X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY ?? "",
			"X-RapidAPI-Host": process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST ?? "",
		},
	}); */

	return {
		props: {
			libraries: ["places", "geometry", "drawing"],
			placesData: placesData,
		},
	};
}

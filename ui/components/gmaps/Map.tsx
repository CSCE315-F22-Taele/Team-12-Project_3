import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {
	Paper,
	Rating,
	styled,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { GoogleMap, InfoBox } from "@react-google-maps/api";
import { Dispatch, SetStateAction, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { GBounds, Place } from "../../pages/customer/gmaps";
import mapTheme from "./mapTheme";

interface Props<T extends Place> {
	setCoordinates: Dispatch<SetStateAction<google.maps.LatLngLiteral>>;
	setBounds: Dispatch<SetStateAction<GBounds>>;
	coordinates: google.maps.LatLngLiteral;
	places: T[];
	setChildClicked: Dispatch<SetStateAction<number | null>>;
}

const infoOptions = { closeBoxURL: "", enableEventPropagation: true };

const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: "10px",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	width: "100px",
})) as typeof Paper;

const MarkerDiv = styled("div")(({ theme }) => ({
	// position: "relative",
	// transform: "translate(-50%, -50%)",
	zIndex: 1,
	"&:hover": { zIndex: 2 },
}));

export default function Map<T extends Place>({
	setCoordinates,
	setBounds,
	coordinates,
	places,
	setChildClicked,
}: Props<T>) {
	// if width larger than 600px, isDesktop is true
	const isDesktop = useMediaQuery("(min-width:600px)");

	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [trackCenterChanges, setTrackCenterChanges] = useState([1]);
	const [trackBoundChanges, setTrackBoundChanges] = useState([2]);

	useDebounce(
		() =>
			setCoordinates({
				lat: map!.getCenter()!.lat(),
				lng: map!.getCenter()!.lng(),
			}),
		500,
		[trackCenterChanges]
	);

	useDebounce(
		() =>
			setBounds({
				ne: map?.getBounds()?.getNorthEast(),
				sw: map?.getBounds()?.getSouthWest(),
			}),
		500,
		[trackBoundChanges]
	);

	return (
		<GoogleMap
			mapContainerStyle={{
				width: "100%",
				height: "100vh",
			}}
			center={coordinates}
			zoom={14}
			options={{
				disableDefaultUI: true,
				zoomControl: true,
				styles: mapTheme,
			}}
			onLoad={(map) => setMap(map)}
			onCenterChanged={() => {
				setTrackCenterChanges([1]);
			}}
			onBoundsChanged={() => {
				setTrackBoundChanges([2]);
			}}>
			{places?.map((place, i) => (
				<InfoBox
					key={i}
					options={infoOptions}
					position={
						new google.maps.LatLng(
							Number(place.latitude),
							Number(place.longitude)
						)
					}>
					<MarkerDiv onClick={() => setChildClicked(i)}>
						{!isDesktop ? (
							<LocationOnOutlinedIcon
								color="primary"
								fontSize="large"
							/>
						) : (
							<StyledPaper elevation={3}>
								<Typography variant="subtitle2" gutterBottom>
									{place.name}
								</Typography>
							</StyledPaper>
						)}
					</MarkerDiv>
				</InfoBox>
			))}
		</GoogleMap>
	);
}

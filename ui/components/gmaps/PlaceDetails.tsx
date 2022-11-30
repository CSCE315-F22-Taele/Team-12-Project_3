import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Rating,
	Typography,
} from "@mui/material";
import { RefObject } from "react";
import { Place } from "../../pages/customer/gmaps";

interface Props<T extends Place> {
	place: T;
	selected: boolean;
	refProp: RefObject<HTMLElement>;
}

export default function PlaceDetails<T extends Place>({
	place,
	selected,
	refProp,
}: Props<T>) {
	if (selected)
		refProp?.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});

	return (
		<Card
			elevation={6}
			style={{ marginRight: "20px", marginBottom: "20px" }}>
			<CardMedia
				style={{
					height: 330,
				}}
				image={
					"https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
				}
				title={place.name}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5">
					{place.name}
				</Typography>
				<Box display="flex" justifyContent="space-between" my={2}>
					<Rating
						name="read-only"
						value={Number(place.rating)}
						precision={0.1}
						readOnly
					/>
					<Typography component="legend">
						{place.num_reviews} review
						{Number(place.num_reviews) > 1 && "s"}
					</Typography>
				</Box>
				<Box display="flex" justifyContent="space-between">
					<Typography component="legend">Price</Typography>
					<Typography gutterBottom variant="subtitle1">
						{place.price_level}
					</Typography>
				</Box>
				<Box display="flex" justifyContent="space-between">
					<Typography component="legend">Ranking</Typography>
					<Typography gutterBottom variant="subtitle1">
						{place.ranking}
					</Typography>
				</Box>
				{place?.awards?.map((award, index) => (
					<Box
						key={index}
						display="flex"
						justifyContent="space-between"
						my={1}
						alignItems="center">
						<img src={award.images?.small} />{" "}
						{/* TODO: EDIT back */}
						<Typography variant="subtitle2" color="textSecondary">
							{award.display_name}
						</Typography>
					</Box>
				))}
				{place?.cuisine?.map(({ name }, index) => (
					<Chip
						key={index}
						size="small"
						label={name}
						sx={{
							margin: "5px 5px 5px 0",
						}}
					/>
				))}
				{place.address && (
					<Typography
						gutterBottom
						variant="body2"
						color="textSecondary"
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							marginTop: "10px",
						}}>
						<LocationOnIcon />
						{place.address}
					</Typography>
				)}
				{place.phone && (
					<Typography
						variant="body2"
						color="textSecondary"
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}>
						<PhoneIcon /> {place.phone}
					</Typography>
				)}
			</CardContent>
			<CardActions>
				<Button
					size="small"
					color="primary"
					onClick={() => window.open(place.web_url, "_blank")}>
					Trip Advisor
				</Button>
				<Button
					size="small"
					color="primary"
					onClick={() => window.open(place.website, "_blank")}>
					Website
				</Button>
			</CardActions>
		</Card>
	);
}

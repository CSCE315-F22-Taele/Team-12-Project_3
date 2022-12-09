import {
	CircularProgress,
	FormControl,
	Grid, InputLabel,
	MenuItem,
	Select,
	Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
	createRef,
	Dispatch,
	RefObject,
	SetStateAction,
	useEffect,
	useState
} from "react";
import { Place } from "../../pages/customer/gmaps";
import PlaceDetails from "./PlaceDetails";

interface Props<T extends Place> {
	places: T[];
	childClicked: number | null;
	isLoading: boolean;
	type: string;
	setType: Dispatch<SetStateAction<string>>;
	rating: number;
	setRating: Dispatch<SetStateAction<number>>;
}

export default function List<T extends Place>({
	places,
	childClicked,
	isLoading,
	type,
	setType,
	rating,
	setRating,
}: Props<T>) {
	const theme = useTheme();
	const [elRefs, setElRefs] = useState<RefObject<HTMLElement>[]>([]);

	useEffect(() => {
		setElRefs(
			Array(places?.length)
				.fill(0)
				.map((_, i) => elRefs[i] || createRef<HTMLElement>())
		);
	}, [places]);

	return (
		<div
			style={{
				padding: "25px",
			}}>
			<Typography
				variant="h4"
				style={{
					marginTop: 50,
				}}>
				Food & Dining around you
			</Typography>
			<FormControl
				variant="standard"
				sx={{
					margin: theme.spacing(1),
					minWidth: 120,
					marginBottom: "30px",
				}}>
				<InputLabel id="type">Restaurants</InputLabel>
				{/* <Select
					id="type"
					value={type}
					// input={<InputBase />}
					onChange={(e) => setType(e.target.value)}>
					<MenuItem value="restaurants">Restaurants</MenuItem>
					<MenuItem value="hotels">Hotels</MenuItem>
					<MenuItem value="attractions">Attractions</MenuItem>
				</Select> */}
			</FormControl>
			<FormControl
				variant="standard"
				sx={{
					margin: theme.spacing(1),
					minWidth: 120,
					marginBottom: "30px",
				}}>
				<InputLabel id="rating">Rating</InputLabel>
				<Select
					id="rating"
					value={rating}
					onChange={(e) => setRating(Number(e.target.value))}>
					<MenuItem value={0}>All</MenuItem>
					<MenuItem value={3}>Above 3.0</MenuItem>
					<MenuItem value={4}>Above 4.0</MenuItem>
				</Select>
			</FormControl>
			{isLoading ? (
				<div
					style={{
						height: "600px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<CircularProgress size="5rem" />
				</div>
			) : (
				<>
					<Grid
						container
						sx={{
							maxHeight: "60vh",
							overflow: "auto",
						}}>
						{places?.map((place, i) => (
							<Grid key={i} item xs={12}>
								<PlaceDetails
									selected={Number(childClicked) === i}
									refProp={elRefs[i]}
									place={place}
								/>
							</Grid>
						))}
					</Grid>
				</>
			)}
		</div>
	);
}

import { useEffect } from "react";
import useTimeout from "./useTimeout";

/**
 * after dependencies stop changing for length of the delay, run callback,
 */
export default function useDebounce(
	callback: () => void,
	delay: number,
	dependencies: any[]
) {
	const { reset, clear } = useTimeout(callback, delay);
	// reset timeout when dependencies or reset function changes (/ reset timer when a dependency changes to prevent callback from running before length of the delay passes)
	useEffect(reset, [...dependencies, reset]);
	// don't run callback on first render by clearing timeout
	useEffect(clear, []);
}

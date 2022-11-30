import { useCallback, useEffect, useRef } from "react";

export default function useTimeout(callback: () => void, delay: number) {
	// if multiple components are using this hook, useRef ensures that callbackRef stays the same as long as same callback passed in
	const callbackRef = useRef<() => void | null>(callback);
	const timeoutRef = useRef<NodeJS.Timeout | null>();

	// only if content of callback changes, callbackRef updated
	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	// like useMemo but for functions
	// set timeout when delay amount changes
	const set = useCallback(() => {
		timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
	}, [delay]);

	// set on first render since refs are undefined before first render
	const clear = useCallback(() => {
		timeoutRef.current && clearTimeout(timeoutRef.current);
	}, []);

	// on changes, call set function, and clear useEffect with clear
	useEffect(() => {
		set();
		return clear;
	}, [delay, set, clear]);

	const reset = useCallback(() => {
		clear();
		set();
	}, [clear, set]);

	return { reset, clear };
}

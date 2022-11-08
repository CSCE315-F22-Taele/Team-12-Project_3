import router from "next/router";
import { useCallback, useEffect } from "react";
import { createGlobalState } from "react-use";
import { IHookStateSetAction } from "react-use/lib/misc/hookState";

export const useGlobalUser = createGlobalState<string>("");

export const routerPush = (
	userType: string,
	setUserType: (state: IHookStateSetAction<string>) => void
) => {
	router.push("/" + userType, undefined, { shallow: true });
	setUserType(() => userType);
};

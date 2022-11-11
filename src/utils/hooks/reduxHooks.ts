import {AppDispatch, RootState} from "../../redux/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

// Custom typed redux hooks
export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
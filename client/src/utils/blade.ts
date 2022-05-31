import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectBlade, selectBladeError} from "../store/blade.slice";
import {Blade, BladeType} from "../types/blade";
import * as bladeSlice from "../store/blade.slice"

export const useBlade = () => {
    const dispatch: (...args: any[]) => Promise<Blade | null> = useDispatch()
    const blade = useSelector(selectBlade)
    const error = useSelector(selectBladeError)

    const getBlade = useCallback(
        (bladeId: string | number, bladeType: BladeType) => dispatch(bladeSlice.getBlade(bladeId, bladeType)),
        [dispatch]
    )

    const updateBlade = useCallback(
        (bladeId: string | number, bladeType: BladeType, blade: Partial<Blade>) => {
            return dispatch(bladeSlice.updateBlade(bladeId, bladeType, blade))
        },
        [dispatch]
    )

    const createBlade = useCallback(
        (blade: Partial<Blade>) => dispatch(bladeSlice.createBlade(blade)),
        [dispatch]
    )

    const deleteBlade = useCallback(
        (bladeId: string | number, bladeType: BladeType) => dispatch(bladeSlice.deleteBlade(bladeId, bladeType)),
        [dispatch]
    )

    const removeBladeError = useCallback(
        () => dispatch(bladeSlice.removeBladeError()),
        [dispatch]
    )

    const removeBlade = useCallback(
        () => dispatch(bladeSlice.setBlade(null)),
        [dispatch]
    )

    return {
        blade,
        error,
        getBlade,
        updateBlade,
        createBlade,
        deleteBlade,
        removeBlade,
        removeBladeError
    }
}
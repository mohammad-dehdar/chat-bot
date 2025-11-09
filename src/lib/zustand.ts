import { useSyncExternalStore } from 'react';

export type StateListener<TState> = (state: TState, previousState: TState) => void;

export type SetState<TState> = (
    partial: Partial<TState> | ((state: TState) => Partial<TState>),
    replace?: boolean,
) => void;

export type GetState<TState> = () => TState;

export type Subscribe<TState> = (listener: StateListener<TState>) => () => void;

export interface StoreApi<TState> {
    getState: GetState<TState>;
    setState: SetState<TState>;
    subscribe: Subscribe<TState>;
}

export type UseBoundStore<TState> = {
    (): TState;
    <TSelected>(selector: (state: TState) => TSelected): TSelected;
} & StoreApi<TState>;

export type StateCreator<TState> = (
    set: SetState<TState>,
    get: GetState<TState>,
    api: StoreApi<TState>,
) => TState;

export const create = <TState>(initializer: StateCreator<TState>): UseBoundStore<TState> => {
    let state: TState;
    const listeners = new Set<StateListener<TState>>();

    const getState: GetState<TState> = () => state;

    const setState: SetState<TState> = (partial, replace) => {
        const nextStatePartial =
            typeof partial === 'function' ? (partial as (state: TState) => Partial<TState>)(state) : partial;

        const nextState = replace
            ? (nextStatePartial as TState)
            : ({ ...state, ...nextStatePartial } as TState);

        if (Object.is(nextState, state)) {
            return;
        }

        const previousState = state;
        state = nextState;
        listeners.forEach((listener) => listener(state, previousState));
    };

    const subscribe: Subscribe<TState> = (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    const api: StoreApi<TState> = {
        getState,
        setState,
        subscribe,
    };

    state = initializer(setState, getState, api);

    const useStore = (<TSelected>(selector?: (state: TState) => TSelected) => {
        const selectorFn = selector ?? ((s: TState) => s as unknown as TSelected);
        return useSyncExternalStore(
            subscribe,
            () => selectorFn(state),
            () => selectorFn(state),
        );
    }) as UseBoundStore<TState>;

    useStore.getState = getState;
    useStore.setState = setState;
    useStore.subscribe = subscribe;

    return useStore;
};

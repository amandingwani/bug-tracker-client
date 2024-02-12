import { DefaultValues } from "react-hook-form";

export const OWNER_OPTIONS = ['All', 'Me', 'Other users'] as const;
export type OwnerOptions = typeof OWNER_OPTIONS[number]

export type StatusFilter = {
    OPEN: boolean,
    IN_PROGRESS: boolean,
    ON_HOLD: boolean,
    COMPLETED: boolean,
    CANCELED: boolean,
    TESTING: boolean,
    DEPLOYED: boolean,
}

export type FilterData = { owner: OwnerOptions, status: StatusFilter }

export const defaultFilterData: FilterData = {
    owner: 'All',
    status: {
        OPEN: true,
        IN_PROGRESS: true,
        ON_HOLD: true,
        COMPLETED: true,
        CANCELED: true,
        TESTING: true,
        DEPLOYED: true,
    },
}

export const defaultFilterValues: DefaultValues<FilterData> = defaultFilterData;
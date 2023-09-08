import { createSelector } from "reselect";

const selectCategoryReducer = (state) =>state.categories;

export const selectCategoriesArray = createSelector(
    [selectCategoryReducer],
    (categoryReducerSlice) => categoryReducerSlice.categoriesArray
)

//memoized selector because we used createSelector
export const selectCategoriesMap = createSelector(
    [selectCategoriesArray],
    (categoriesArray) => categoriesArray.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
      }, {})
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoryReducerSlice) => categoryReducerSlice.isLoading
)

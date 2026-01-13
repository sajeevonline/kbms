# Walkthrough: Detail Preview Pane

We added a **high-context preview pane** to allow users to inspect documents without losing their search place.

## Interaction Flow
1.  **Search**: User enters a query (e.g., "roadmap").
2.  **View List**: Search results appear in the main column.
3.  **Click Result**: Clicking a result card activates the **Detail Pane**.
4.  **Preview**: The right sidebar (Filters) slides out and is replaced by the **Document Preview**.
    -   Shows Title, Author, Date.
    -   "GovGuard Verified" badge.
    -   Mocked content preview.
    -   "Chat with this Document" button.
5.  **Close**: Clicking the `→` arrow closes the preview and restores the Filters.

## Visuals
-   **Animation**: Smooth `slide-in-from-right` transition.
-   **Highlighted State**: The selected card in the main list gets a blue background `bg-blue-50` to indicate active selection.

## Verification
-   [x] **Selection**: Clicking a card correctly swaps the right panel.
-   [x] **Dismissal**: Clicking the close arrow restores the facet view.
-   [x] **Responsiveness**: Logic respects the `hidden lg:block` constraints on mobile.

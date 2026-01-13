# Task: Redesign Chat as Search Engine

## Status
- [x] Planning
    - [x] Design Search Engine Layout
- [x] Implementation
    - [x] Update `ChatPage.tsx`
        - [x] Create "Hero State" (Centered Search Bar)
        - [x] Create "Results List State" (Glean-like Layout)
            - [x] Top Bar with Tabs/Filters (All, From, Date)
            - [x] Main Column: Vertical list of result cards (Title, snippet, author, source icon)
            - [x] Right Sidebar: Source facets (Sticky position)
        - [x] Create "Detail Preview Pane"
            - [x] Slide-out panel on right (replacing/overlaying facets)
            - [x] Document content preview
            - [x] "Chat with this doc" action
        - [x] Remove "Answer Generation" focus (move to "Summarize" button on cards)
- [x] Verification
    - [x] Verify Hero transition
    - [x] Verify rich content in new layout

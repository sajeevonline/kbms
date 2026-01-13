# Implementation Plan - Search Engine UI

The goal is to pivot the interface from a conversational "Chat" to a knowledge-centric "Search Engine".

## UI States

### 1. Hero State (Initial)
-   **Centered Layout**: Large, welcoming search bar in the middle of the screen.
-   **Visuals**: Company branding/Logo above the bar.
-   **Suggestions**: "Try searching for..." pills below the bar.

### 2. Results State (Active) - "The List View"
-   **Header**: Sticky search bar at top.
-   **Filters Row**: Dropdowns for "All filters", "Updated", "From", "Type".
-   **Main Layout**: Two-column layout (Main Content + Right Facets).
    -   **Center Column (Results)**:
        -   Vertical stack of RESULT CARDS.
        -   Each card: Source Icon, Title (Blue Link), Snippet with keyword highlighting, Metadata (Author, Date, Source).
        -   Actions: "Summarize" button on each card.
    -   **Right Column (Facets/Preview)**: 
        -   **Default**: List of Sources with counts (e.g., "Google Drive 1k", "Slack 1k").
        -   **On Selection**: Replaced by **Detail Preview Pane**:
            -   Header: Title + "Open Original" button.
            -   GovGuard: "Access Verified - Confidential".
            -   Body: Full text preview.
            -   Footer: "Chat with this document" input.

## Styling
-   **Clean & Dense**: High information density but readable.
-   **Source Branding**: Use distinct icons colors (Blue for Word, Green for Excel, etc. or platform icons).
-   **Highlights**: Bold matching keywords in snippets.

## Styling Changes
-   **Remove Bubbles**: Text should appear directly on the canvas, like a document.
-   **Typography**: Larger headers, serif fonts for body text (optional, for "readable" feel).
-   **Focus**: Emphasis on the *Answer*, not the *Conversation*.

## Component Logic
-   `ChatPage.tsx`: Refactor to toggle between `Hero` and `Results` views based on `messages.length`.
-   Keep the same underlying `messages` state but render it differently (show only standard "latest query" view dynamics).

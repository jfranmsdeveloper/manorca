# Event Manager Release

## Features Implemented
1.  **Event Management System**:
    -   New **Agenda** section in the Admin Panel (`/admin/events`).
    -   **Calendar View**: Visual interface to browse events.
    -   **Add Event**: Modals to create new events with Title, Date, Time, Type, and Location.
    -   **Persistence**: Events are saved to `localStorage` ('manorca_events').

2.  **Public Website Integration**:
    -   The **Eventos** section now loads events dynamically from the admin panel.
    -   Automatically calculates "Days Until" and formats dates.
    -   Merges dynamic events with existing static examples for better initial presentation.

## How to Test
1.  Navigate to **Panel de Gestión** (Footer > Panel).
2.  Login with `manorca` / `OrtegaCaballero2026`.
3.  Go to **Agenda** in the sidebar.
4.  Click on any date to add a test event.
5.  Go back to the public site and scroll to the **Eventos** section to see it live.

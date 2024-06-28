# Electron Browser

An Electron-based browser application that supports multiple tabs and basic navigation features such as loading URLs and navigating back.

## Features

- **Multiple Tabs**: Open multiple tabs within the same window.
- **URL Loading**: Load any URL into the currently active tab.
- **Back Navigation**: Navigate back to the previous page in the currently active tab's history.
- **New Tab**: Open a default URL in a new tab.

## Installation

To get started with this project, follow the steps below:

1. **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the application**:

    ```bash
    npm start
    ```

## Project Structure

The project consists of the following main files:

- `index.html`: The main HTML file containing the layout of the application.
- `main.js`: The main process script that creates the browser window and handles tab management.
- `preload.js`: The script that is preloaded into each web page for context isolation.
- `renderer.js`: The renderer process script that handles user interactions and updates the UI.

## File Descriptions

### index.html

The HTML file defines the structure of the user interface, including the controls for navigation and tab management.

### main.js

This file sets up the main Electron window and manages the creation of tabs, handling of IPC events, and navigation within the tabs.

### preload.js

The preload script exposes a limited set of APIs to the renderer process for secure communication with the main process.

### renderer.js

The renderer script handles user interactions, such as loading URLs, creating new tabs, and navigating back.

## Usage

### Opening a URL

1. Enter the URL in the input field at the top.
2. Click the "Load URL" button to load the URL in the currently active tab.

### Creating a New Tab

1. Click the "New Tab" button to open a new tab with a default URL (`https://tieba.baidu.com/`).

### Navigating Back

1. Click the "Back" button to navigate to the previous page in the currently active tab's history.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## Acknowledgments

- [Electron](https://electronjs.org/) for providing the framework to build this application.
- [Node.js](https://nodejs.org/) for the backend runtime environment.
- All contributors and users who have provided feedback and suggestions.


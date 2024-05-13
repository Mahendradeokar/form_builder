## Form Generator Application

Users can effortlessly drag and drop diverse form controls from the left panel onto the canvas. On the right panel, they can configure the properties of each control. Much of the management is handled by a configuration file/form state, serving as the single source of truth.

### Available Controls
- Checkbox
- Text Input
- Textarea
- Switch
- Radio Button
- Dropdown
- Extendable...

### Configurable Properties
- **Options**: For Checkbox, Radio, and Dropdown controls
- **Label**
- **Placeholder**
- **Description**
- **Extendable...**

### Validation
Validation supports both string and object formats. Validation criteria include:
- Minimum length
- Maximum length
- Required field
- Format based on regular expressions (regex)
- Extendable...

### Extensibility:
The application is highly extensible. Adding new controls, properties, and validation rules requires minimal additional code related to the specific control, its icon, configuration, and type.

### Implementation Details
- **User Interface**: Utilizes drag-and-drop functionality for control placement and configuration. Controls can be appended, removed, moved, and replaced.
- **State Management**: Utilizes a custom hook called `userFormBuilder`, built on top of React's array field hook, for managing control manipulation and state synchronization.
- **State Management Library**: Redux Toolkit is employed for passing and handling form state updates across the application.
- **Error Handling**: Error handling is implemented using Next.js' error.ts file.
- **API Requests**: Axios is used for handling API requests.
- **Authentication**: Next.js middleware is integrated to handle authentication, ensuring secure access to the application's features and data.
- **Eslint**: Development follows the guidelines of `next/core-web-vitals` ESLint config for performance optimization.



### Setup Command
To install dependencies, run:

```bash
npm install
```

### Running Locally
To start the development server and run the project locally, use:

```bash
npm run dev
```


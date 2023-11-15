# Microsoft Power Apps meets [Components](https://www.npmjs.com/package/@db-ui/react-components)

## How to test

Every component has its own `package.json` and testing environment.

1. `cd button`
2. `npm i`
3. `npm run refreshTypes`
4. `npm run start`

This opens a new browser window with a low-code editor and your component.

## How to build

For build run `npm run build:dotnet` or `npm run build:msbuild`, based on what you installed e.g. [MSBuild](https://learn.microsoft.com/de-de/visualstudio/msbuild/msbuild?view=vs-2022).
Afterwards you should have a `.zip` file inside `DBUI/bin/Release/DBUI.zip`.

## How to deploy

1. You can test your components with an upload to [PowerApps](https://make.powerapps.com/).
2. In the header is a dropdown for environments, select one with the rights to upload own components (your personal environment might not have the rights in a company account).
3. Goto `Solutions` on the right navigation and click on `import solution`.
4. Select the `DBUI/bin/Release/DBUI.zip` file.
5. Create a new Power App and [add the custom components](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/component-framework-for-canvas-apps#add-components-to-a-canvas-app).

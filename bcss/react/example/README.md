# Example

## Running Locally

```
npm run start
```

However, communication with backend via Axios is not included at this time.
This is just for the UI.

## Use Local Component Library

If you intend to make updates to the component library that you want to use in this React app you should execute the following command.

```
npm run local-components
```

This will link your React app to your local component library.

**IMPORTANT NOTE**: Don't forget to rebuild your component library when you want to pick up changes or first clone it (after an `npm install`) in your React app using the following command in the root of the component library.

```
npm run build
```

## Use Latest Published Component Library

If you wish to switch back to the latest published component library that resides in Nexus you should use the following command.
```
npm run latest-components
```

## Troubleshooting

* **Question:** Why does the change in my component/new component not show in my React app.
  <br>
  **Answer:** Make sure you have linked your React app to your local component library with the following command executed in the root of your React app.
  ```
  npm run local-components
  ```

* **Qustion:** Why does the merge to develop build fail on publishing my component library.
  **Answer:** If you have changed the component library, check that you have updated the version number accordingly.

* **Question:** Why doesn't my React app show my component update/new component when deployed from the develop branch.
  **Answer:** Check that you have updated your React app's react-component library version to match the version of the component library you want to use.
  
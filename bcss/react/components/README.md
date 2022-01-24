# BCSS React Component Library

This is a library for common React components that the new BCSS frontend will use in order to achieve a consistent look and feel.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using the typescript option.

**NOTE:** Due to a limitation with the free version of Nexus I have had to take a particular approach.
More details can be found [here](https://nhsd-confluence.digital.nhs.uk/display/DETM/Shared+React+Components+and+Separate+React+Apps)

## Prerequisities

Node version: 16.13.X (LTS at time of writing). This should include `npm` at version 8.1.X

Your add a file called `.npmrc` in your home ditrectory with the following content...
(Alternatively take a copy of the file in the ../assets folder)
```
registry=https://nexus.mgmt.texasplatform.uk/repository/bcss-npm-group
_auth=ZGV2ZWxvcG1lbnQ6OE1nLEcyV082SGNp
```

On Windows this will be...
```
C:\Users\<your-short-code>\
```

## Installing

```
npm install
```

More details on how to create components will be added to this README soon.

## Publishing

**CAUTION:** At time of writing (13 Dec) pubishing will overwrite the current library package. This will be deactivated as part of the next trache of work.

To publish the component library package to Nexus use the following command. 
```
npm run release
```

**NOTE:** The version of the library is specified by the "version" field in the `package.json`.

## Versioning

This is not offical, just a suggestion, and is essentially a copy of the React approach.

Give version format: `<major>.<minor>.<patch/fix>`

`<major>` - Update this when there is a breaking change. For example an interface to a component has changed such that an attribute has been removed or its name changed.
`<minor>` - Update this when changes are not breaking. For example changing the look of a component.
`<patch/fix>` - Update this when just fixing a bug.

**QUESTION:** What if we add a new component? I think this would just be a `<minor>` update?

## Using

Use this library in one of the following ways.

### Newly Scaffolded React App

Get the latest component library from Nexus by running the following command in the root of your React app.

```
npm install @bcss/react-components
```
If you want a specific version, for example, 1.1.0 you would use the command...
```
npm install @bcss/react-components@1.1.0
```

### Use Your Local Version of the Component Library

You may want to do this if you intend to make changes to the library and use them in you React app. In the root of your React app run the following command.

```
npm run local-components
```

**IMPORTANT NOTE**: Don't forget to rebuild your component library when you want to pick up the change in your React app using the following command in the root of the component library.
```
npm run build
```

Further details on how to use the components from the library in your code will be added to this README soon.

## Storybook

To see Storybook for your branch go to this URL

```
https://bcss-<jira-ticket>-ddc-bcss-components-storybook.k8s-nonprod.texasplatform.uk/
```
Where `<jira-ticket>` is for example `bcss-1234`.

## Dockerfile

The dockerfile completes a number of actions and the pipeline stage executes a number of steps in one stage to avoid adding more stages to the pipleine. An overview of the docker steps are:
1. Build the componeny library
2. Publishes the component library to Nexus
3. Build the Storybook website
4. Creates the Storybook website docker image for deployment

## Troubleshooting

* **Question:** Why does the change in my component/new component not show in my React app.
  <br>
  **Answer:** Make sure you have linked your React app to your local component library with the following command executed in the root of your React app.
  ```
  npm run local-components
  ```

* **Qustion:** Why does the merge to develop build fail on publishing my component library.
  <br>
  **Answer:** If you have changed the component library, check that you have updated the version number accordingly (see above).

* **Question:** Why doesn't my React app show my component update/new component when deployed from the develop branch.
  <br>
  **Answer:** Check that you have updated your React app's react-component library version to match the version of the component library you want to use.

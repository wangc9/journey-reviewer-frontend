# Changelog
Note: "*" indicates that the commit link is a placeholder. The corresponding link will be updated in the next commit.


## v0.5.0

### Features
- [`6f086cc`](https://github.com/wangc9/journey-reviewer-frontend/commit/6f086cc7b2cbe82f102ddc49627f0335e40e3b15) Add code documentation using TypeDoc


## v0.4.0

### Features
- [`0e177f7`](https://github.com/wangc9/journey-reviewer-frontend/commit/0e177f71526b7a34e0d39fa14808fca52ff371c9) Add maps
  - Add `AddStationMap` component for adding new stations through map.
  - Add `UserStationMap` dummy component for viewing stations in map.
  - Add `stationSlice` and station services.

### Bug Fixes

- [`a9a61f4`](https://github.com/wangc9/journey-reviewer-backend/commit/a9a61f41bd1aa2523b7c93fd1aa00cbbe0595bcd) Fix type error
  - Fix type error in `IUser`, `IStation`
  - Add type check for express routers


## v0.3.2

### Features
- [`3574034`](https://github.com/wangc9/journey-reviewer-frontend/commit/357403492684cfb2a7a9eb30e40ac9ecc078369f) Add `SignUp` page and its test


## v0.3.1

### Bug Fixes

- [`529ee19`](https://github.com/wangc9/journey-reviewer-frontend/commit/529ee1972944e34663f7f894ea54b2500beef2ad) Fix dummy test for `Login` page


## v0.3.0

### Features
- [`9978eaf`](https://github.com/wangc9/journey-reviewer-frontend/commit/9978eafc36ecfde41a2af60296d1088784a073e4) Add Redux
  - Add Redux and `userSlice` for storing user credentials.
  - Add test for `userSlice`.
  - Add dummy test for the login page.
  - Add log-out function in the `UserCard`.


## v0.2.1

### Features

- [`b0beea9`](https://github.com/wangc9/journey-reviewer-frontend/commit/b0beea9a424962b937f7e51a832739919ea64716) Add tests
  - Setup Jest and react testing library.
  - Add tests for the main page and the toolbar.
  - Extend CI pipeline.


## v0.2.0

### Features
- [`bf932b5`](https://github.com/wangc9/journey-reviewer-frontend/commit/bf932b5ad202420bab4690c356f9179afb2269b8) Improve login process
  - Disable Firebase UI.
  - Add custom UI for user sign-in.

- [`bf932b5`](https://github.com/wangc9/journey-reviewer-frontend/commit/bf932b5ad202420bab4690c356f9179afb2269b8) Improve toolbar
  - Add additional navigation buttons
  - Add `UserCard` to display user information

### Chores

- [`bf932b5`](https://github.com/wangc9/journey-reviewer-frontend/commit/bf932b5ad202420bab4690c356f9179afb2269b8) Code modularisation


## v0.1.0

### Features
- [`e45d01f`](https://github.com/wangc9/journey-reviewer-frontend/commit/e45d01f95d2756c8e9e1cbc848ae579103c3f378) Add components
  - Add `Login` component and `NaviBar` component.
  - Add Firebase auth UI.


## v0.0.1

### Features
- [`44e524a`](https://github.com/wangc9/journey-reviewer-frontend/commit/44e524a3b3ef067b3cdce3a29397de3d891a471d) Setup project to use TypeScript, React, Prettier, and Eslint. Add initial CI pipeline.
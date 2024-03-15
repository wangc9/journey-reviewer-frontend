# Changelog
Note: "*" indicates that the commit link is a placeholder. The corresponding link will be updated in the next commit.


## v0.5.8

### Features
- [`da2585e`](https://github.com/wangc9/journey-reviewer-frontend/commit/da2585e80193aca8000e27d453568d8efd2d2f5c)* Add information for single station
  - Clicking the station marker now shows a pop-up with information of the clicked station.
  - Clicking the station list now re-centres the map to the clicked station. A red mark is shown on top of the original mark for 1 second before disappearing.


## v0.5.7

### Features
- [`da2585e`](https://github.com/wangc9/journey-reviewer-frontend/commit/da2585e80193aca8000e27d453568d8efd2d2f5c) Add file dropbox for journey csv


## v0.5.6

### Features
- [`50eea72`](https://github.com/wangc9/journey-reviewer-frontend/commit/50eea723678d3760891882cf621e18fab121875c) Display all stations in list
  - Clicking the map view button will now direct to the map view of all stations accompanied with a paginated list. The old map view (station adding page) can be accessed via the `new station` button on the current page.
  - The list view button now directs to a simplified list of stations shared with the map view. Each page contains 10 stations. More details will be added to the list.
  - New services `getByPage` and `getPageCount` are added in connection with the pagination of station.


## v0.5.5

### Features
- [`960eeba`](https://github.com/wangc9/journey-reviewer-frontend/commit/960eeba85035d37f82972c1560501b3ea5e2624b) Display all stations on map


## v0.5.4

### Bug fixes
- [`2bf2d0c`](https://github.com/wangc9/journey-reviewer-frontend/commit/2bf2d0cfb339b4020a05de6dbf8c7c8731ea1723) Fix user sign-up
  - New user is now created in database after sign-up.
  - An alert is displayed on top of the sign-up form when encountering errors.


## v0.5.3

### Bug fixes
- [`f2eb5b1`](https://github.com/wangc9/journey-reviewer-frontend/commit/f2eb5b15721e1245f1a1fd9c9324ece5e6cde2b1) Fix file dropbox


## v0.5.2

### Features
- [`abd3fb0`](https://github.com/wangc9/journey-reviewer-frontend/commit/abd3fb05071f150b7c0105ef39afa29fd044026e) Change CI pipeline to enable actions on pull requests


## v0.5.1

### Features
- [`ae50615`](https://github.com/wangc9/journey-reviewer-frontend/commit/ae50615513a46c06c70356f99d070e498809ec73) Add file dropbox using `filepond` and change the source of map to `Digitransit`


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

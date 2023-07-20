<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/junseo-yang/fabulous-restaurant">
    <img src="fabulous-restaurants/fabulous-restaurant/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Fabulous Restaurants</h3>

  <p align="center">
    A restaurant review app to share fabulous restaurants on your list 
    <br />
    <a href="https://github.com/junseo-yang/fabulous-restaurant"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/junseo-yang/fabulous-restaurant">View Demo</a>
    ·
    <a href="https://github.com/junseo-yang/fabulous-restaurant/issues">Report Bug</a>
    ·
    <a href="https://github.com/junseo-yang/fabulous-restaurant/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

**Fabulous Restaurants** is a restaurant review sharing app. It provides a platform for users to share their reviews, comments, location, and contacts. It is a cross-platform application that supports web and mobile. 

[![Fabulous Restaurant Screen Shot Web Home][screenshot-web-home]](https://github.com/junseo-yang/fabulous-restaurant)
[![Fabulous Restaurant Screen Shot Mobile Home][screenshot-mobile-home]](https://github.com/junseo-yang/fabulous-restaurant)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
* [![Angular][Angular.io]][Angular-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]
* [![Cordova][Cordova.apache.org]][Cordova-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

1. Install [Node.js] which includes [Node Package Manager][npm]
2. Install the Angular CLI globally:
    ```sh
    npm i -g @angular/cli@13.1.2
    ```

### Installation
#### Web
1. Clone the repo
    ```sh
    git clone https://github.com/junseo-yang/fabulous-restaurant.git
    ```
2. Change directory
    ```sh
    cd fabulous-restaurants
    ```
3. Install NPM packages
    ```sh
    npm install
    ```
4. Run the application:
    ```sh
    ng serve
    ```
#### Mobile
1. Install [ADB](https://developer.android.com/tools/adb)
2. Connect an Android device
3. Install apk file
    ```sh
    adb install fabulous-restaurant.apk
4. Run the application on the Android device

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
### Web
#### Restaurants

1. Add/Edit/Delete your favourite restaurants
    * [![Fabulous Restaurant Screen Shot Web Restaurant Add/Edit/Delete][screenshot-web-restaurant-add-edit-delete]](https://github.com/junseo-yang/fabulous-restaurant)
1. List/View your favourite restaurants
    * [![Fabulous Restaurant Screen Shot Web Restaurant List/View][screenshot-web-restaurant-list]](https://github.com/junseo-yang/fabulous-restaurant)

#### Reviews

1. Add/Edit/Delete your reviews about favourite restaurants
    * [![Fabulous Restaurant Screen Shot Web Review Add/Edit/Delete][screenshot-web-review-add-edit-delete]](https://github.com/junseo-yang/fabulous-restaurant)
2. List/View your reviews about favourite restaurants
    * [![Fabulous Restaurant Screen Shot Web Review List/View][screenshot-web-review-list]](https://github.com/junseo-yang/fabulous-restaurant)

### Mobile
#### Restaurants

1. Add/Edit/Delete your favourite restaurants
    * [![Fabulous Restaurant Screen Shot Mobile Restaurant Add/Edit/Delete][screenshot-mobile-restaurant-add-edit-delete]](https://github.com/junseo-yang/fabulous-restaurant)
2. List/View your favourite restaurants
    * [![Fabulous Restaurant Screen Shot Mobile Restaurant List/View][screenshot-mobile-restaurant-list]](https://github.com/junseo-yang/fabulous-restaurant)

#### Reviews

1. Add/Edit/Delete your favourite restaurants
    * [![Fabulous Restaurant Screen Shot Mobile Review Add/Edit/Delete][screenshot-mobile-review-add-edit-delete]](https://github.com/junseo-yang/fabulous-restaurant)
2. List/View your favourite restaurants
    * [![Fabulous Restaurant Screen Shot Mobile Review List/View][screenshot-mobile-review-list]](https://github.com/junseo-yang/fabulous-restaurant)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Implement CRUD for Restaurants and Reviews 
- [x] Implement Login
- [x] Implement Admin user management
- [x] Implement Different nav for Admin
- [x] Implement Geolocation (Here map) - Leverage Android Native GPS Feature
- [x] Import AuthGuard
- [x] Prohibit duplicate username
- [x] Initialize admin with `admin` and `password`
- [x] Foreign key constraints - can't delete restaurant if it has a related review.
- [x] Return to the url when you logout and login
- [x] Fix password change blank

See the [open issues](https://github.com/junseo-yang/fabulous-restaurant/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

**Junseo Yang**
- :briefcase: LinkedIn: https://linkedin.com/in/junseo-yang
- :school_satchel: Website: https://junseo-yang.github.io
- :mailbox: jsy724724@gmail.com

Project Link: [https://github.com/junseo-yang/fabulous-restaurant](https://github.com/junseo-yang/fabulous-restaurant)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/junseo-yang/fabulous-restaurant.svg?style=for-the-badge
[contributors-url]: https://github.com/junseo-yang/fabulous-restaurant/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/junseo-yang/fabulous-restaurant.svg?style=for-the-badge
[forks-url]: https://github.com/junseo-yang/fabulous-restaurant/network/members
[stars-shield]: https://img.shields.io/github/stars/junseo-yang/fabulous-restaurant.svg?style=for-the-badge
[stars-url]: https://github.com/junseo-yang/fabulous-restaurant/stargazers
[issues-shield]: https://img.shields.io/github/issues/junseo-yang/fabulous-restaurant.svg?style=for-the-badge
[issues-url]: https://github.com/junseo-yang/fabulous-restaurant/issues
[license-shield]: https://img.shields.io/github/license/junseo-yang/fabulous-restaurant.svg?style=for-the-badge
[license-url]: https://github.com/junseo-yang/fabulous-restaurant/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/junseo-yang
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[Cordova-url]: https://cordova.apache.org/
[Cordova.apache.org]: https://img.shields.io/badge/Cordova-35434F?style=for-the-badge&logo=apache-cordova&logoColor=E8E8E8
[JQuery-url]: https://jquery.com 
[screenshot-web-home]: images/web-home.png
[screenshot-mobile-home]: images/mobile-home.png
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/get-npm
[screenshot-web-restaurant-add-edit-delete]: images/web-restaurant-add-edit-delete.png
[screenshot-web-restaurant-list]: images/web-restaurant-list.png
[screenshot-web-review-add-edit-delete]: images/web-review-add-edit-delete.png
[screenshot-web-review-list]: images/web-review-list.png
[screenshot-mobile-restaurant-add-edit-delete]: images/mobile-restaurant-add-edit-delete.png
[screenshot-mobile-restaurant-list]: images/mobile-restaurant-list.png
[screenshot-mobile-review-add-edit-delete]: images/mobile-review-add-edit-delete.png
[screenshot-mobile-review-list]: images/mobile-review-list.png
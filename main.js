/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Overview.js":
/*!*************************!*\
  !*** ./src/Overview.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Overview)\n/* harmony export */ });\n/* harmony import */ var _Tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tag */ \"./src/Tag.js\");\n\r\n\r\nclass Overview {\r\n  constructor() {\r\n    this.tags = [];\r\n  }\r\n\r\n  addTag(tag) {\r\n    // console.log(\"Creating new tag\")\r\n    let newTag = new _Tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tag);\r\n    this.tags.push(newTag);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://todo-list/./src/Overview.js?");

/***/ }),

/***/ "./src/Tag.js":
/*!********************!*\
  !*** ./src/Tag.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Tag)\n/* harmony export */ });\n/* harmony import */ var _Todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Todo */ \"./src/Todo.js\");\n\r\n\r\nclass Tag {\r\n  constructor(name) {\r\n    this.name = name;\r\n    this.list = [];\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://todo-list/./src/Tag.js?");

/***/ }),

/***/ "./src/Todo.js":
/*!*********************!*\
  !*** ./src/Todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Todo)\n/* harmony export */ });\nclass Todo {\r\n  constructor(title, desc, dueDate, priority, tag) {\r\n    this.title = title;\r\n    this.desc = desc;\r\n    this.dueDate = dueDate;\r\n    this.priority = priority;\r\n    this.tag = tag;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://todo-list/./src/Todo.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Overview__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Overview */ \"./src/Overview.js\");\n/* harmony import */ var _Tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tag */ \"./src/Tag.js\");\n/* harmony import */ var _Todo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Todo */ \"./src/Todo.js\");\n\r\n\r\n\r\n\r\nconst mainOverview = new _Overview__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\r\ndocument.querySelector(\"#todo-submit\").addEventListener(\"click\", () => {\r\n  let title = document.querySelector(\"#title\").value;\r\n  let desc = document.querySelector(\"#desc\").value;\r\n  let date = Date(document.querySelector(\"#date\"));\r\n  let priority = document.querySelector(\"#priority\").value;\r\n  let tag = document.querySelector(\"#tag\").value;\r\n\r\n  let newTodo = new _Todo__WEBPACK_IMPORTED_MODULE_2__[\"default\"](title, desc, date, priority, tag);\r\n  console.log(newTodo);\r\n});\r\n\r\ndocument.querySelector(\"#tag-submit\").addEventListener(\"click\", () => {\r\n  let name = document.querySelector(\"#tag-name\").value;\r\n  mainOverview.addTag(name);\r\n  console.log(mainOverview);\r\n});\n\n//# sourceURL=webpack://todo-list/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;
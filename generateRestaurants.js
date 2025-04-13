"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = require("fs/promises");
var states = [
    "Lagos", "Abuja", "Rivers", "Kano", "Kaduna", "Oyo", "Enugu", "Delta", "Ogun", "Anambra",
    "Edo", "Plateau", "Benue", "Kwara", "Niger", "Cross River", "Akwa Ibom", "Ondo", "Ekiti", "Osun",
    "Borno", "Yobe", "Bauchi", "Gombe", "Taraba", "Adamawa", "Kebbi", "Zamfara", "Sokoto", "Jigawa", "Katsina", "Nasarawa", "Ebonyi", "Bayelsa", "Abia", "Kogi", "Imo"
];
var foodTags = [
    "Rice", "Chicken", "Fastfood", "Pounded Yam", "Goat meat", "Spicy", "Fries", "Burgers",
    "Pizza", "Drinks", "Local", "Soups", "Swallow", "Smoothies", "Desserts", "Barbecue",
    "Grilled Fish", "Jollof", "Plantain", "Fried Rice", "Snacks"
];
var discounts = [
    "5% off order", "Free delivery, up to ₦500", "10% off first order",
    "Buy 1 Get 1 Free", "Free delivery on weekends", "15% off orders above ₦2000",
    "20% off orders above ₦3000", "Free drink with every order",
    "Free delivery on first order", "Buy 2 Get 1 Free", "10% off orders above ₦5000",
    "Free drink with every dessert", "Free drink with every snack",
    "Free drink with every barbecue", "5% off all orders", ""
];
var getRandom = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };
var getRandomTags = function () {
    var shuffled = __spreadArray([], foodTags, true).sort(function () { return 0.5 - Math.random(); });
    return shuffled.slice(0, Math.floor(Math.random() * 3 + 2)).join(", ");
};
var generateRestaurants = function () {
    var restaurants = [];
    for (var i = 1; i <= 600; i++) {
        var hasNotice = Math.random() < 0.5;
        var restaurant = __assign({ id: i, name: "Restaurant ".concat(i), tags: getRandomTags(), rating: +(Math.random() * 2 + 3).toFixed(1), reviews: "".concat(Math.floor(Math.random() * 500) + 1, "+ Ratings"), discount: getRandom(discounts), image: "/images/".concat(Math.floor(Math.random() * 18 + 1), ".jpg"), location: "".concat(getRandom(states), ", Nigeria"), opensAt: "".concat(String(Math.floor(Math.random() * 3 + 8)).padStart(2, '0'), ":").concat(Math.random() < 0.5 ? '00' : '30'), closesAt: "".concat(String(Math.floor(Math.random() * 4 + 20)).padStart(2, '0'), ":").concat(Math.random() < 0.5 ? '00' : '30') }, (hasNotice && { notice: "Special discounts available today!" }));
        restaurants.push(restaurant);
    }
    return restaurants;
};
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = generateRestaurants();
                return [4 /*yield*/, (0, promises_1.writeFile)('restaurantData.json', JSON.stringify(data, null, 2))];
            case 1:
                _a.sent();
                console.log("✅ 600 restaurant records saved to restaurantData.json");
                return [2 /*return*/];
        }
    });
}); };
main();

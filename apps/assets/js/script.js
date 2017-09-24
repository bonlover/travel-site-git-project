import $ from 'jquery';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';

var mobileMenu = new MobileMenu();

new RevealOnScroll($(".feature-item"), "80%");
new RevealOnScroll($(".testimonial"), "60%");
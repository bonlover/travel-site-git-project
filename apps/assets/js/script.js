import $ from 'jquery';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';

var mobileMenu = new MobileMenu();
var stickyHeader = new StickyHeader();

new RevealOnScroll($(".feature-item"), "80%");
new RevealOnScroll($(".testimonial"), "60%");

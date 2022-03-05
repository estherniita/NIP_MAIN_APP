import { style, animate, animation, keyframes } from "@angular/animations";

export const fadeIn = animation([
    style({ opacity: 0 }),
    animate('{{time}}', style({ opacity: 1 }))
]);

export const fadeOut = animation([
    animate('{{time}}', style({ opacity: 0 }))
]);
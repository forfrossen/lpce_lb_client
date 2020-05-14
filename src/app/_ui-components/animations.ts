import {
	animation, trigger, animateChild, group,
	transition, animate, style, query, sequence
  } from '@angular/animations';

export const fadeInOutAnimation = 
	trigger( 'fadeInOut', [
		transition( ':enter', [
			style({ opacity: 0, display: 'none' }),
			sequence([
				animate( '2ms 300ms', style( { display: 'block' }, ) ),	
				animate( '300ms', style( { opacity: 1 } ) ),	
			])
		] ),
		transition( ':leave', [
			sequence([
				animate( 300, style( { opacity: 0 } ) ),	
				style( { display: 'none' } ),	
			])
		] )
	] );

export const slideInOutAnimation = 
	trigger( 'slideInOut', [
		transition( ':enter', [
			style( { opacity: 0, transform: 'translateY(-50px)' } ),
			animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
			
		]),
		transition(':leave', [
			animate( '500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 0, transform: 'translateY(20px)' }))
		])
	] )

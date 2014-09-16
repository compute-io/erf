/**
*
*	COMPUTE: erf
*
*
*	DESCRIPTION:
*		- Error function.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	/**
	* NOTE: the following copyright and license, as well as the long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_erf.c?revision=268523&view=co}.
	*
	* The implementation follows the original, but has been modified for JavaScript.
	*/

	/**
	* ===========================
	* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
	*
	* Developed at SunPro, a Sun Microsystems, Inc business.
	* Permission to use, copy, modify, and distribute this software is freely granted, provided that this notice is preserved.
	* ===========================
	*/

	/**
	* double erf(double x)
	*		                        x
	*		               2       |\
	*		erf(x) = -----------   | exp(-t*t)dt
	*		            sqrt(pi)  \|
	*		                       0
	*
	*		erfc(x) =  1-erf(x)
	*	Note that
	*		erf(-x) = -erf(x)
	*		erfc(-x) = 2 - erfc(x)
	*
	* Method:
	*	1. For |x| in [0, 0.84375)
	*		erf(x)  = x + x*R(x^2)
	*		erfc(x) = 1 - erf(x)           if x in [-.84375,0.25]
	*		        = 0.5 + ((0.5-x)-x*R)  if x in [0.25,0.84375]
	*		where R = P/Q where P is an odd poly of degree 8 and Q is an odd poly of degree 10.
	*			                       -57.90
	*			| R - (erf(x)-x)/x | <= 2
	*
	*
	*		Remark. The formula is derived by noting
	*		erf(x) = (2/sqrt(pi))*(x - x^3/3 + x^5/10 - x^7/42 + ....)
	*		and that
	*		2/sqrt(pi) = 1.128379167095512573896158903121545171688
	*		is close to one. The interval is chosen because the fix point of erf(x) is near 0.6174 (i.e., erf(x)=x when x is near 0.6174), and by some experiment, 0.84375 is chosen to guarantee the error is less than one ulp for erf.
	*
	*	2. For |x| in [0.84375,1.25), let s = |x| - 1, and c = 0.84506291151 rounded to single (24 bits)
	*		erf(x)  = sign(x) * (c  + P1(s)/Q1(s))
	*		erfc(x) = (1-c)  - P1(s)/Q1(s) if x > 0
	*			1+(c+P1(s)/Q1(s))    if x < 0
	*			|P1/Q1 - (erf(|x|)-c)| <= 2**-59.06
	*	Remark: here we use the taylor series expansion at x=1.
	*		erf(1+s) = erf(1) + s*Poly(s)
	*				= 0.845.. + P1(s)/Q1(s)
	*	That is, we use rational approximation to approximate
	*		erf(1+s) - (c = (single)0.84506291151)
	*	Note that |P1/Q1|< 0.078 for x in [0.84375,1.25] where
	*		P1(s) = degree 6 poly in s
	*		Q1(s) = degree 6 poly in s
	*
	*	3. For x in [1.25,1/0.35(~2.857143)),
	*		erfc(x) = (1/x)*exp(-x*x-0.5625+R1/S1)
	*		erf(x)  = 1 - erfc(x)
	*	where
	*		R1(z) = degree 7 poly in z, (z=1/x^2)
	*		S1(z) = degree 8 poly in z
	*
	*	4. For x in [1/0.35,28]
	*		erfc(x) = (1/x)*exp(-x*x-0.5625+R2/S2) if x > 0
	*		        = 2.0 - (1/x)*exp(-x*x-0.5625+R2/S2) if -6<x<0
	*		        = 2.0 - tiny		(if x <= -6)
	*		erf(x)  = sign(x)*(1.0 - erfc(x)) if x < 6, else
	*		erf(x)  = sign(x)*(1.0 - tiny)
	*	where
	*		R2(z) = degree 6 poly in z, (z=1/x^2)
	*		S2(z) = degree 7 poly in z
	*
	*	Note1:
	*		To compute exp(-x*x-0.5625+R/S), let s be a single precision number and s := x; then
	*		-x*x = -s*s + (s-x)*(s+x)
	*		exp(-x*x-0.5626+R/S) = exp(-s*s-0.5625)*exp((s-x)*(s+x)+R/S);
	*	Note2:
	*		Here 4 and 5 make use of the asymptotic series
	*		            exp(-x*x)
	*		erfc(x) ~  ----------- * ( 1 + Poly(1/x^2) )
	*		            x*sqrt(pi)
	*		We use rational approximation to approximate
	*			g(s)=f(1/x^2) = log(erfc(x)*x) - x*x + 0.5625
	*		Here is the error bound for R1/S1 and R2/S2
	*			|R1/S1 - f(x)|  < 2**(-62.57)
	*			|R2/S2 - f(x)|  < 2**(-61.52)
	*
	*	5. For inf > x >= 28
	*		erf(x)  = sign(x) *(1 - tiny)  (raise inexact)
	*		erfc(x) = tiny*tiny (raise underflow) if x > 0
	*				= 2 - tiny if x<0
	*
	*	6. Special case:
	*		erf(0)  = 0, erf(inf)  = 1, erf(-inf) = -1,
	*		erfc(0) = 1, erfc(inf) = 0, erfc(-inf) = 2,
	*		erfc/erf(NaN) is NaN
	*/

	// CONSTANTS //

	var INF = Number.POSITIVE_INFINITY,
		NINF = Number.NEGATIVE_INFINITY,

		TINY = 1e-300,
		SMALL = 1.0 / (1 << 28 ), /* 2**-28; equiv is Math.pow( 2, -28 ) */
		ERX = 8.45062911510467529297e-1, /* 0x3FEB0AC1, 0x60000000 */

		// Coefficients for approximation to erf on [0, 0.84375)
		EFX = 1.28379167095512586316e-1, /* 0x3FC06EBA, 0x8214DB69 */
		EFX8 = 1.02703333676410069053, /* 0x3FF06EBA, 0x8214DB69 */
		PP0 = 1.28379167095512558561e-1, /* 0x3FC06EBA, 0x8214DB68 */
		PP1 = -3.25042107247001499370e-1, /* 0xBFD4CD7D, 0x691CB913 */
		PP2 = -2.84817495755985104766e-2, /* 0xBF9D2A51, 0xDBD7194F */
		PP3 = -5.77027029648944159157e-3, /* 0xBF77A291, 0x236668E4 */
		PP4 = -2.37630166566501626084e-5, /* 0xBEF8EAD6, 0x120016AC */
		QQ1 = 3.97917223959155352819e-1, /* 0x3FD97779, 0xCDDADC09 */
		QQ2 = 6.50222499887672944485e-2, /* 0x3FB0A54C, 0x5536CEBA */
		QQ3 = 5.08130628187576562776e-3, /* 0x3F74D022, 0xC4D36B0F */
		QQ4 = 1.32494738004321644526e-4, /* 0x3F215DC9, 0x221C1A10 */
		QQ5 = -3.96022827877536812320e-6, /* 0xBED09C43, 0x42A26120 */

		// Coefficients for approximation to erf on [0.84375, 1.25)
		PA0 = -2.36211856075265944077e-3, /* 0xBF6359B8, 0xBEF77538 */
		PA1 = 4.14856118683748331666e-1, /* 0x3FDA8D00, 0xAD92B34D */
		PA2 = -3.72207876035701323847e-1, /* 0xBFD7D240, 0xFBB8C3F1 */
		PA3 = 3.18346619901161753674e-1, /* 0x3FD45FCA, 0x805120E4 */
		PA4 = -1.10894694282396677476e-1, /* 0xBFBC6398, 0x3D3E28EC */
		PA5 = 3.54783043256182359371e-2, /* 0x3FA22A36, 0x599795EB */
		PA6 = -2.16637559486879084300e-3, /* 0xBF61BF38, 0x0A96073F */
		QA1 = 1.06420880400844228286e-1, /* 0x3FBB3E66, 0x18EEE323 */
		QA2 = 5.40397917702171048937e-1, /* 0x3FE14AF0, 0x92EB6F33 */
		QA3 = 7.18286544141962662868e-2, /* 0x3FB2635C, 0xD99FE9A7 */
		QA4 = 1.26171219808761642112e-1, /* 0x3FC02660, 0xE763351F */
		QA5 = 1.36370839120290507362e-2, /* 0x3F8BEDC2, 0x6B51DD1C */
		QA6 = 1.19844998467991074170e-2, /* 0x3F888B54, 0x5735151D */

		// Coefficients for approximation to erfc on [1.25, 1/0.35)
		RA0 = -9.86494403484714822705e-3, /* 0xBF843412, 0x600D6435 */
		RA1 = -6.93858572707181764372e-1, /* 0xBFE63416, 0xE4BA7360 */
		RA2 = -1.05586262253232909814e1, /* 0xC0251E04, 0x41B0E726 */
		RA3 = -6.23753324503260060396e1, /* 0xC04F300A, 0xE4CBA38D */
		RA4 = -1.62396669462573470355e2, /* 0xC0644CB1, 0x84282266 */
		RA5 = -1.84605092906711035994e2, /* 0xC067135C, 0xEBCCABB2 */
		RA6 = -8.12874355063065934246e1, /* 0xC0545265, 0x57E4D2F2 */
		RA7 = -9.81432934416914548592, /* 0xC023A0EF, 0xC69AC25C */
		SA1 = 1.96512716674392571292e1, /* 0x4033A6B9, 0xBD707687 */
		SA2 = 1.37657754143519042600e2, /* 0x4061350C, 0x526AE721 */
		SA3 = 4.34565877475229228821e2, /* 0x407B290D, 0xD58A1A71 */
		SA4 = 6.45387271733267880336e2, /* 0x40842B19, 0x21EC2868 */
		SA5 = 4.29008140027567833386e2, /* 0x407AD021, 0x57700314 */
		SA6 = 1.08635005541779435134e2, /* 0x405B28A3, 0xEE48AE2C */
		SA7 = 6.57024977031928170135, /* 0x401A47EF, 0x8E484A93 */
		SA8 = -6.04244152148580987438e-2, /* 0xBFAEEFF2, 0xEE749A62 */

		// Coefficients for approximation to erfc on [1/0.35, 28]
		RB0 = -9.86494292470009928597e-3, /* 0xBF843412, 0x39E86F4A */
		RB1 = -7.99283237680523006574e-1, /* 0xBFE993BA, 0x70C285DE */
		RB2 = -1.77579549177547519889e1, /* 0xC031C209, 0x555F995A */
		RB3 = -1.60636384855821916062e2, /* 0xC064145D, 0x43C5ED98 */
		RB4 = -6.37566443368389627722e2, /* 0xC083EC88, 0x1375F228 */
		RB5 = -1.02509513161107724954e3, /* 0xC0900461, 0x6A2E5992 */
		RB6 = -4.83519191608651397019e2, /* 0xC07E384E, 0x9BDC383F */
		SB1 = 3.03380607434824582924e1, /* 0x403E568B, 0x261D5190 */
		SB2 = 3.25792512996573918826e2, /* 0x40745CAE, 0x221B9F0A */
		SB3 = 1.53672958608443695994e3, /* 0x409802EB, 0x189D5118 */
		SB4 = 3.19985821950859553908e3, /* 0x40A8FFB7, 0x688C246A */
		SB5 = 2.55305040643316442583e3, /* 0x40A3F219, 0xCEDF3BE6 */
		SB6 = 4.74528541206955367215e2, /* 0x407DA874, 0xE79FE763 */
		SB7 = -2.24409524465858183362e1; /* 0xC03670E2, 0x42712D62 */


	// ERF //

	/**
	* FUNCTION: erf( x )
	*	Evaluates the error function for an input value.
	*/
	function erf( x ) {
		var exp = Math.exp,
			sign = false,
			tmp,
			z, r, s, y, p, q;

		if ( typeof x !== 'number' ) {
			throw new TypeError( 'erf()::invalid input argument. Must provide a numeric value.' );
		}

		// [1] Special cases...

		// NaN:
		if ( x !== x ) {
			return NaN;
		}
		// Positive infinity:
		if ( x === INF ) {
			return 1;
		}
		// Negative infinity:
		if ( x === NINF ) {
			return -1;
		}

		// [2] Get the sign:
		if ( x < 0 ) {
			x = -x;
			sign = true;
		}

		// [3] |x| < 0.84375
		if ( x < 0.84375 ) {
			if ( x < SMALL ) {
				if ( x < TINY ) {
					// Avoid underflow:
					tmp = 0.125 * (8.0*x + efx8*x );
				} else {
					tmp = x + efx*x;
				}
			} else {
				z = x * x;
				// Horner's method: http://en.wikipedia.org/wiki/Horner's_method
				r = PP0 + z*(PP1+z*(PP2+z*(PP3+z*PP4)));
				s = 1.0 + z*(QQ1+z*(QQ2+z*(QQ3+z*(QQ4+z*QQ5))));
				y = r / s;
				tmp = x + x*y;
			}
			if ( sign ) {
				return -tmp;
			}
			return tmp;
		}

		// [4] 0.84375 <= |x| < 1.25
		if ( x < 1.25 ) {
			s = x - 1;
			p = PA0 + s*(PA1+s*(PA2+s*(PA3+s*(PA4+s*(PA5+s*PA6)))));
			q = 1 + s*(QA1+s*(QA2+s*(QA3+s*(QA4+s*(QA5+s*QA6)))));
			if ( sign ) {
				return -erx - p/q;
			}
			return erx + p/q;
		}

		// [5] INF > |x| >=6
		if ( x >= 6 ) {
			if ( sign ) {
				return TINY - 1;
			}
			return 1 - TINY;
		}

		s = 1 / (x*x);

		// [6] |x| < 1 / 0.35 ~2.857143
		if ( x < 1/0.35 ) {
			r = RA0 + s*(RA1+s*(RA2+s*(RA3+s*(RA4+s*(RA5+s*(RA6+s*RA7))))));
			s = 1 + s*(SA1+s*(SA2+s*(SA3+s*(SA4+s*(SA5+s*(SA6+s*(SA7+s*SA8)))))));
		} else { // [7] |x| >= 1/0.35 ~2.857143
			r = RB0 + s*(RB1+s*(RB2+s*(RB3+s*(RB4+s*(RB5+s*RB6)))));
			s = 1 + s*(SB1+s*(SB2+s*(SB3+s*(SB4+s*(SB5+s*(SB6+s*SB7))))));
		}
		z = x & 0xffffffff00000000; // pseudo-single (20-bit) precision x;
		r = exp( -z*z - 0.5625 ) * exp( (z-x)*(z+x) + r/s );
		if ( sign ) {
			return r/x - 1;
		}
		return 1 - r/x;
	} // end FUNCTION erf()


	// EXPORTS //

	module.exports = erf;

})();
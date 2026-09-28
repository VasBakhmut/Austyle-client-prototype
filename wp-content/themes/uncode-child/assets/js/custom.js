jQuery(document).ready(function() {

	jQuery('.top-menu').prependTo('#masthead .navbar-cta');
		
	jQuery('.sku-in-loop').each(function(i) {
		jQuery(this).prependTo(jQuery('.tmb-woocommerce .t-entry-text .t-entry-text-tc').eq(i));
	});

	if (jQuery(window).width() < 959) {
		jQuery('.navbar-cta').insertAfter(jQuery('.menu-horizontal-inner .desktop-hidden .menu-accordion'));		
	}
	
	
	jQuery( ".icons-area .icons-value:contains('FIRE RATING')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Fire-Rating.svg' class='product-icon' title='FIRE RATING' /></div>" );
	jQuery( ".icons-area .icons-value:contains('2 HR FIRE RATING')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Fire-Rating-2hr.svg' class='product-icon' title='2 HR FIRE RATING' /></div>" );
	jQuery( ".icons-area .icons-value:contains('4 HR FIRE RATING')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Fire-Rating-4hr.svg' class='product-icon' title='4 HR FIRE RATING' /></div>" );
	jQuery( ".icons-area .icons-value:contains('10 YR MECHANICAL WARRANTY')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Warranty-10yr.svg' class='product-icon' title='10 YR MECHANICAL WARRANTY' /></div>" );
	jQuery( ".icons-area .icons-value:contains('15 YR MECHANICAL WARRANTY')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Warranty-15yr.svg' class='product-icon' title='15 YR MECHANICAL WARRANTY' /></div>" );
	jQuery( ".icons-area .icons-value:contains('20 YR MECHANICAL WARRANTY')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Warranty-20yr.svg' class='product-icon' title='20 YR MECHANICAL WARRANTY' /></div>" );
	jQuery( ".icons-area .icons-value:contains('TAMPER PROOF MECHANISM')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Tamper-Proof.svg' class='product-icon' title='TAMPER PROOF MECHANISM' /></div>" );
	jQuery( ".icons-area .icons-value:contains('DURABLE SECURITY')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Durable-Security.svg' class='product-icon' title='DURABLE SECURITY' /></div>" );
	jQuery( ".icons-area .icons-value:contains('LONG TERM CONFIDENCE')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Long-Term.svg' class='product-icon' title='LONG TERM CONFIDENCE' /></div>" );
	jQuery( ".icons-area .icons-value:contains('ELECTRIC STRIKER COMPATIBLE')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Electric-Striker.svg' class='product-icon' title='ELECTRIC STRIKER COMPATIBLE' /></div>" );
	jQuery( ".icons-area .icons-value:contains('304 SS BALL BEARING RACE MECHANISM')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Ball-Bearing.svg' class='product-icon' title='304 SS BALL BEARING RACE MECHANISM' /></div>" );
	jQuery( ".icons-area .icons-value:contains('NON-HANDED REVERSIBLE LEVERS')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Reversible.svg' class='product-icon' title='NON-HANDED REVERSIBLE LEVERS' /></div>" );
	jQuery( ".icons-area .icons-value:contains('INTEGRATED PRIVACY OPTION')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Privacy.svg' class='product-icon' title='INTEGRATED PRIVACY OPTION' /></div>" );
	jQuery( ".icons-area .icons-value:contains('ESCAPE FUNCTION')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Escape.svg' class='product-icon' title='ESCAPE FUNCTION' /></div>" );
	jQuery( ".icons-area .icons-value:contains('DDA COMPLIANT')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/DDA.svg' class='product-icon' title='DDA COMPLIANT' /></div>" );
	jQuery( ".icons-area .icons-value:contains('PATENTED MECHANISM')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Patented.svg' class='product-icon' title='PATENTED MECHANISM' /></div>" );
	jQuery( ".icons-area .icons-value:contains('INTEGRATED KEYLESS SNIB LOCK')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Integrated-Snib.svg' class='product-icon' title='INTEGRATED KEYLESS SNIB LOCK' /></div>" );
	jQuery( ".icons-area .icons-value:contains('INDEPENDENT CAM OPERATION')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Integrated-Cam.svg' class='product-icon' title='INDEPENDENT CAM OPERATION' /></div>" );
	jQuery( ".icons-area .icons-value:contains('myLOCK')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/myLock.svg' class='product-icon' title='myLOCK' /></div>" );
	jQuery( ".icons-area .icons-value:contains('RECOMMENDED WITH myLOCK')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Recommended-with-myLock.svg' class='product-icon' title='RECOMMENDED WITH myLOCK' /></div>" );
	jQuery( ".icons-area .icons-value:contains('LATCHING STRIKER OPTION INCLUDED')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Striker.svg' class='product-icon' title='LATCHING STRIKER OPTION INCLUDED' /></div>" );
	jQuery( ".icons-area .icons-value:contains('316 STAINLESS STEEL')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Material-316SS.svg' class='product-icon' title='316 STAINLESS STEEL' /></div>" );
	jQuery( ".icons-area .icons-value:contains('SATIN STAINLESS STEEL')" ).append( "<div class='icon-outer'><img src='https://austyle.com.au/wp-content/themes/uncode-child/assets/img/Material-SSS.svg' class='product-icon' title='SATIN STAINLESS STEEL' /></div>" );


//	jQuery(".product-icon").on("mouseover",function(event){
	jQuery(".product-icon").each(function() {										  
//		jQuery(".icon-tooltip").remove();
		Title=jQuery(this).attr("title");
		jQuery(this).removeAttr("title")
		let tooltip=jQuery("<div/>",{class:"icon-tooltip",html:Title,style:"opacity:1;"});
		jQuery(this).after(tooltip);
		jQuery(this).find(".icon-tooltip").fadeIn();
	});
//	jQuery(".product-icon").on("mouseout",function(event){
//		jQuery(this).removeAttr("title");
//		jQuery(this).attr("title", Title)
//		Title="";
//		jQuery(".icon-tooltip").remove();
//	});
	
	jQuery('#store_locator_get_my_position').appendTo('#store_locator_find_stores_button');
	jQuery('#store_locator_get_all_stores').appendTo('#store_locator_find_stores_button');
//	jQuery('.product-tab h4').append('<p>Select options below to view further details</p>');


	var variationvar = jQuery(".variation_id").val();
	if (parseFloat(variationvar) == 0) {
		jQuery( ".single_variation_wrap" ).prepend( '<div class="empty-var"><div class="woocommerce-variation-sku"><span class="variation-label"><strong>SKU</strong></span>--</div><div class="woocommerce-variation-description"><span class="variation-label">Description</span>--</div><div class="woocommerce-variation-size"><span class="variation-label">Size</span><span class="size-value">--</span></div><div class="woocommerce-variation-finish"><span class="variation-label">Finish</span><span class="finish-value">--</span></div><div class="woocommerce-variation-uom"><span class="variation-label">Unit of Measure</span>--</div><div class="woocommerce-variation-barcode"><span class="variation-label">Barcode</span>--</div><div class="woocommerce-variation-itemstatus"><span class="variation-label">Item Status</span>--</div><div class="woocommerce-variation-projection"><span class="variation-label">Projection</span>--</div><div class="woocommerce-variation-price"></div><div class="woocommerce-variation-availability"></div></div>');
	}
	
	jQuery(".variations_form .variation_id").change(function() {	
		if (jQuery('.variation_id').val().length == ''){
			if (jQuery('.empty-var').length === 0) {		
				jQuery( ".single_variation_wrap" ).prepend( '<div class="empty-var"><div class="woocommerce-variation-sku"><span class="variation-label"><strong>SKU</strong></span>--</div><div class="woocommerce-variation-description"><span class="variation-label">Description</span>--</div><div class="woocommerce-variation-size"><span class="variation-label">Size</span><span class="size-value">--</span></div><div class="woocommerce-variation-finish"><span class="variation-label">Finish</span><span class="finish-value">--</span></div><div class="woocommerce-variation-uom"><span class="variation-label">Unit of Measure</span>--</div><div class="woocommerce-variation-barcode"><span class="variation-label">Barcode</span>--</div><div class="woocommerce-variation-itemstatus"><span class="variation-label">Item Status</span>--</div><div class="woocommerce-variation-projection"><span class="variation-label">Projection</span>--</div><div class="woocommerce-variation-price"></div><div class="woocommerce-variation-availability"></div></div>');
			}
		} else {
			jQuery( ".empty-var" ).remove();
		}	
	});
	
	if (jQuery("#pa_finish").val() === "") {
    	jQuery("#pa_finish").css({'border-color' : 'red','color' : 'red'});
	} else {
		jQuery("#pa_finish").css({'border-color' : '#303133','color' : '#303133'});
	}
	if (jQuery("#pa_size").val() === "") {
    	jQuery("#pa_size").css({'border-color' : 'red','color' : 'red'});
	} else {
		jQuery("#pa_size").css({'border-color' : '#303133','color' : '#303133'});
	}
	if (jQuery("#pa_design").val() === "") {
    	jQuery("#pa_design").css({'border-color' : 'red','color' : 'red'});
	} else {
		jQuery("#pa_design").css({'border-color' : '#303133','color' : '#303133'});
	}
	if (jQuery("#pa_subrange").val() === "") {
    	jQuery("#pa_subrange").css({'border-color' : 'red','color' : 'red'});
	} else {
		jQuery("#pa_subrange").css({'border-color' : '#303133','color' : '#303133'});
	}
	if (jQuery("#pa_subrange2").val() === "") {
    	jQuery("#pa_subrange2").css({'border-color' : 'red','color' : 'red'});
	} else {
		jQuery("#pa_subrange2").css({'border-color' : '#303133','color' : '#303133'});
	}

	jQuery('#pa_finish').on('change', function() {
		if (jQuery("#pa_finish").val() === "") {
			jQuery("#pa_finish").css({'border-color' : 'red','color' : 'red'});
		} else {
			jQuery("#pa_finish").css({'border-color' : '#303133','color' : '#303133'});
		}
	});
	jQuery('#pa_size').on('change', function() {
		if (jQuery("#pa_size").val() === "") {
			jQuery("#pa_size").css({'border-color' : 'red','color' : 'red'});
		} else {
			jQuery("#pa_size").css({'border-color' : '#303133','color' : '#303133'});
		}
	});
	jQuery('#pa_design').on('change', function() {
		if (jQuery("#pa_design").val() === "") {
			jQuery("#pa_design").css({'border-color' : 'red','color' : 'red'});
		} else {
			jQuery("#pa_design").css({'border-color' : '#303133','color' : '#303133'});
		}
	});
	jQuery('#pa_subrange').on('change', function() {
		if (jQuery("#pa_subrange").val() === "") {
			jQuery("#pa_subrange").css({'border-color' : 'red','color' : 'red'});
		} else {
			jQuery("#pa_subrange").css({'border-color' : '#303133','color' : '#303133'});
		}
	});
	jQuery('#pa_subrange2').on('change', function() {
		if (jQuery("#pa_subrange2").val() === "") {
			jQuery("#pa_subrange2").css({'border-color' : 'red','color' : 'red'});
		} else {
			jQuery("#pa_subrange2").css({'border-color' : '#303133','color' : '#303133'});
		}
	});	
	
	
});



jQuery(document).ajaxComplete(function() {	
	jQuery('.variable-items-wrapper').each(function() {
		var className = jQuery(this).attr('aria-label')
		jQuery(this).parent().addClass(className);
	});

	jQuery('.variations_form :input').click(function() {
		jQuery('.woocommerce-variation-finish .finish-value').text(function(i, text) {
    		return text.replace(/-/g, ' ');
		});
		
		jQuery('.woocommerce-variation-size .size-value').text(function(i, text) {
			if ( jQuery('.Size li').hasClass('selected') ) {
				var sizevalue = jQuery('.Size li[aria-checked=true]').attr('data-title');
    			jQuery('.size-value').text(sizevalue);
			}
		});
		
	});
});
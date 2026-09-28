( function( $ ) {
'use strict';
    jQuery( document ).ready( function() {
        jQuery('.single_variation_wrap').on('show_variation', function( event, variation ) {
            var product_id = jQuery('input[name="product_id"]').val();
            var data = {
                action       : 'ucs_cross_sell_products',
                product_id : product_id,
                variation_id : variation.variation_id,
                ucs_nonce : ucs_frontend.nonce,
            };
            jQuery.post(ucs_frontend.ajaxurl, data, function(response){
                if ( response.success ) {
                   jQuery('section.up-sells').html(response.data);
                }
            });
        });
    }); 
})(jQuery);
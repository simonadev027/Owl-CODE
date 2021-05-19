/*!
    * Start Bootstrap - Freelancer v6.0.5 (https://startbootstrap.com/theme/freelancer)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
    */
    (function($) {
    "use strict"; // Start of use strict
  
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 71)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });
  
    // Scroll to top button appear
    $(document).scroll(function() {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });
  
    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
  
    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 80
    });
  
    // Collapse Navbar
    var navbarCollapse = function() {
      if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-shrink");
      } else {
        $("#mainNav").removeClass("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  
    // Floating label headings for the contact form
    $(function() {
      $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
      }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
      }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
    });
  
  })(jQuery); // End of use strict
  
  // Language Switch 
  $(document).ready(function () {

    // Show dropdown
    $('.selected').click(function () {
        $('.custom-sel').addClass('show-sel');
        $('.custom-sel a').removeClass('hidden');
    });

    // Hide dropdown when not focused
    $('.custom-sel').focusout(function () {
        $('.custom-sel').removeClass('show-sel');
        $('.custom-sel a:not(:first)').addClass('hidden');
    }).blur(function () {
        $('.custom-sel').removeClass('show-sel');
        $('.custom-sel a:not(:first)').addClass('hidden');
    });

});
if (typeof jQuery === "undefined") { throw new Error("jQuery required"); }

+function ($) {
  'use strict';

  // SEARCHBAR CLASS DEFINITION
  // =========================

  var backdrop = '.searchbar-backdrop';
  var toggle   = '[data-toggle="searchbar"]';
  var Searchbar = function (element) {
    $(element).on('click.mr.searchbar', this.toggle);
  };

  Searchbar.VERSION = '1.0.0';

  Searchbar.prototype.toggle = function (e) {
    var $this = $(this);

    if ($this.is('.disabled, :disabled')) return;

    var $parent  = getParent($this);
    var isActive = $parent.hasClass('open') || (typeof isXS == 'function' && isXS());

    if (!isActive) {
        
      clearMenus();
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="searchbar-backdrop"/>').insertAfter($(this)).on('click', clearMenus);
      }
      
      var relatedTarget = { relatedTarget: this };
      $parent.trigger(e = $.Event('show.mr.searchbar', relatedTarget));

      if (e.isDefaultPrevented()) return;
      e.preventDefault();

      $parent.find('input').trigger('focus');
      
      $parent
        .toggleClass('open')
        .trigger('shown.mr.searchbar', relatedTarget);

        return false;
    }
  };

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove();
    $(toggle).each(function () {
      var $parent = getParent($(this));
      var relatedTarget = { relatedTarget: this };
      if (!$parent.hasClass('open')) return;
      $parent.trigger(e = $.Event('hide.mr.searchbar', relatedTarget));
      if (e.isDefaultPrevented()) return;
      $parent.removeClass('open').trigger('hidden.mr.searchbar', relatedTarget);
    });
  }

  function getParent($this) {
    var selector = $this.attr('data-target');
    
    if (!selector) {
      return $this.parents('form');
    }

    var $parent = selector && $(selector);

    return $parent && $parent.length ? $parent : $this.parent();
  }


  // SEARCHBAR PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data  = $this.data('mr.searchbar');

      if (!data) $this.data('mr.searchbar', (data = new Searchbar(this)));
      if (typeof option == 'string') data[option].call($this);
    });
  }

  var old = $.fn.searchbar;

  $.fn.searchbar             = Plugin;
  $.fn.searchbar.Constructor = Searchbar;


  // SEARCHBAR NO CONFLICT
  // ====================

  $.fn.searchbar.noConflict = function () {
    $.fn.searchbar = old;
    return this;
  };


  // APPLY TO STANDARD SEARCHBAR ELEMENTS
  // ===================================

  $(document)
    .on('click.mr.searchbar.data-api', clearMenus)
    .on('click.mr.searchbar.data-api', '.searchbar', function (e) { e.stopPropagation(); })
    //.on('focus.mr.searchbar.data-api', toggle, Searchbar.prototype.toggle) // this causes the focus event to trigger twice
    .on('click.mr.searchbar.data-api', toggle, Searchbar.prototype.toggle);


}(jQuery);
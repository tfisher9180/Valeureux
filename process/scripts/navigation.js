(function($) {

  var mobileMenu = $( '#mobile-menu' );
  var siteMenu = $( '#site-menu' );
  var menuToggle = $( '.site-header' ).find( '.menu-toggle' );
  var dropdownToggle = mobileMenu.find( '.dropdown-toggle' );
  var searchToggle = $( '.site-header' ).find( '.search-toggle' );
  var searchBar = $( '#searchbar' );

  // Menu Toggle
  (function() {
    if (!menuToggle.length) {
      return;
    }

    menuToggle.on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      $('body').toggleClass('mobile-menu-open');
      menuToggle.toggleClass('menu-toggled');
    });

    $(document).on('click', '.mobile-menu-open', function(e) {
      if ($(e.target).closest( mobileMenu ).length == 0) {
        $(this).removeClass('mobile-menu-open');
        menuToggle.removeClass('menu-toggled');
      }
    });
  })();

  // Dropdown Toggle
  (function() {
    if (!dropdownToggle.length) {
      return;
    }

    dropdownToggle.on('click', function(e) {
      e.preventDefault();

      $(this).closest('li.has-dropdown').toggleClass('dropdown-toggled');
      $(this).siblings('.dropdown-menu').slideToggle(300);
    });
  })();

  // Search Menu
  (function() {
    if (!searchToggle.length) {
      return;
    }

    if (!searchBar.length) {
      return;
    }

    searchToggle.on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      $('body').toggleClass('search-menu-open');
      searchBar.slideToggle(200);
      searchBar.find('input').focus();
    });

    searchBar.find( '.cancel' ).on('click', function(e) {
      $('body').toggleClass('search-menu-open');
      searchBar.slideToggle(200);
    });

    $(document).on('click', '.search-menu-open', function(e) {
      if ($(e.target).closest('#searchbar').length == 0) {
        $(this).removeClass('search-menu-open');
        searchBar.slideToggle(200);
      }
    });
  })();

  // Focus class for touch devices
  (function() {
    if (!siteMenu.length || !siteMenu.children().length) {
      return;
    }

    siteMenu.find( 'a' ).on('focus blur', function() {
      $(this).parents( 'li' ).toggleClass( 'focus' );
    });

    if ( 'ontouchstart' in window ) {
      $( window ).on('resize', toggleFocusClassTouchScreen);
      toggleFocusClassTouchScreen();
    }

    function toggleFocusClassTouchScreen() {
      if ( menuToggle.css('display') == 'none' ) {
        $(document.body).on('touchstart', function(e) {
          if ( ! $(e.target).closest(siteMenu.find('li')).length ) {
            siteMenu.find('li').removeClass('focus');
          }
        });

        siteMenu.find('.has-dropdown > a').on('touchstart', function(e) {
          var li = $(this).parent('li');

          if (!li.hasClass('focus')) {
            e.preventDefault();
            li.toggleClass('focus');
            li.siblings('.focus').removeClass('focus');
          }
        });
      } else {
        siteMenu.find('.has-dropdown > a').unbind('touchstart');
      }
    }
  })();

})(jQuery);

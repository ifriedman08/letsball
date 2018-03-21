$(document).ready(function () {
  console.log('ready');

  var filterDash = $("<div class='filter-dash' style='display:none'>");

  $('body').append("<div class='filter-background' style='display:none'>");
  $('body').append(filterDash);
  $('.filter-background').click(function () {
    toggleFilterModal();
  })

  var removeFilterHandler = function() {
    console.log('removing filter');
    filterDash.load('/assets/filterDash.html', function () {
      $('#remove_all_filters').click(removeFilterHandler);
      $('#update_filters').click(setFilterHandler);
      $('#close_filter_modal').click(function () {
        toggleFilterModal();
      })
    });
    window.localStorage.LetsBallFilters = "";
  };

  filterDash.load('/assets/filterDash.html', function () {
    if (window.localStorage.LetsBallFilters && window.localStorage.LetsBallFilters != '') {
      var filters = JSON.parse(window.localStorage.LetsBallFilters)
      if (filters.times) {
        $('.time-selector').val(filters.times);
      }
      if (filters.sports) {
        filters.sports.forEach(function (sport) {
          $('.checkbox.' + sport)[0].setAttribute("checked",true);
        })
      }
      if (filters.levels) {
        filters.levels.forEach(function (level) {
          $('.checkbox.' + level)[0].setAttribute("checked",true);
        })
      }
    }
    $('#remove_all_filters').click(removeFilterHandler);
    $('#update_filters').click(setFilterHandler);
    $('#close_filter_modal').click(function () {
      toggleFilterModal();
    })
  })

  var setFilterHandler = function() {
    LetsBall.filters.sports = [];
    LetsBall.filters.levels = [];
    $(".filter.sport").each(function () {
      if (this.checked) {
        LetsBall.filters.sports.push(this.value);
      }
    })
    $(".filter.level").each(function () {
      if (this.checked) {
        LetsBall.filters.levels.push(this.value);
      }
    })
    var timeFilterSelection = $('.time-selector')[0].value;
    if (timeFilterSelection != "Anytime") {
      LetsBall.filters.times = timeFilterSelection;
    }
    var filter_qstring = JSON.stringify(LetsBall.filters);
    if (LetsBall.filters.sports || LetsBall.filters.levels || LetsBall.filters.times ) {
      window.localStorage.LetsBallFilters = filter_qstring;
    } else {
      window.localStorage.LetsBallFilters = "{}";
    }
    toggleFilterModal();
    LetsBall.initMap();
  };

  function toggleFilterModal() {
    $('.filter-dash').toggle();
    $('.filter-background').toggle();
  }

  function clearOverlays() {
    for (var i = 0; i < LetsBall.allMarkers.length; i++ ) {
      LetsBall.allMarkers[i].setMap(null);
    }
    LetsBall.allMarkers = [];
  }

  $('.add-filters-link').click(function () {
    toggleFilterModal();
    console.log('add filters link');
  })
})

$(document).ready(function () {
  console.log('ready');

  var filterDash = $("<div class='filter-dash' style='display:none'>");

  $('body').append("<div class='filter-background' style='display:none'>");
  $('body').append(filterDash);

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
      // var filter_arr = window.localStorage.LetsBallFilters.split(',');
      // filter_arr.forEach(function (element) {
      //   if ($('.' + element)[0].getAttribute('type') == 'checkbox'){
      //     $('.' + element)[0].setAttribute('checked', true)
      //   } else if ($('.' + element)[0].getAttribute('tagName') == 'option') {
      //     $('.filter.time-selector')[0].val(element)
      //   };
      // })
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
    // if (window.localStorage.LetsBallFilters != "") {
    //   window.location.href = window.location.origin + "/?" + window.localStorage.LetsBallFilters;
    // } else {
      window.location.href = window.location.origin + "/";
    // }
  };

  function toggleFilterModal() {
    $('.filter-dash').toggle();
    $('.filter-background').toggle();
  }

  $('.add-filters-link').click(function () {
    toggleFilterModal();
    console.log('add filters link');
  })
})

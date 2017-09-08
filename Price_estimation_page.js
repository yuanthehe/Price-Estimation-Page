$(function() {
   refreshTotal();

  $(":radio").on("click", function() {
    var $referenceBox = $(this).parent().parent().parent().parent();
    var selectionId = $referenceBox.attr("id")
    //Replace default title & Change title based on click
    changeTitle($referenceBox, $(this))
    //replace default image & change image based on click
    changeBackground($referenceBox, $(this))

    //save title to selectedTitle, save data-min/max to selectedMin/Max
    var selectedTitle = $referenceBox.find(".active").find("h2").text()
    var dataMin = $(this).attr('data-min')
    var dataMax = $(this).attr('data-max')
    //create plus button, on click: add to estimate & remove button
    plusButton($referenceBox, selectionId, selectedTitle, dataMin, dataMax);
    });


 //Replace default title & Change title based on click
  jQuery.fn.exists = function(){ return this.length > 0; };
  function changeTitle(referenceBox, input){
      if (referenceBox.find('.active').exists()){
        var transfer = referenceBox.find('.active')
        transfer.removeClass('active').addClass('non_active')
      };
      var titleToShow = input.attr("data-grade");
      referenceBox.find("." + titleToShow).removeClass("non_active").addClass("active");
  };



//Replace default image & change image based on click
  function changeBackground (referenceBox, input){
    var backgroundToShow = input.attr("data-background")
    referenceBox.removeAttr("id");
    referenceBox.attr('id', backgroundToShow)
  };
//Create plus button, on click: add to estimate & remove button
  function plusButton(referenceBox, selectionId, titleToPass, dataMin, dataMax){
    var plusButton = $(
      '<div class="plus_button"><div class="plus"></div></div>'
    );
    referenceBox.find(".plus_button").remove();
    referenceBox.prepend(plusButton);
      plusButton.on("click", function() {
        appendSelection(selectionId, titleToPass, dataMin, dataMax);
        //refreshTotal();
        $(this).remove();
      });

  };

  //Create box & items
  function appendSelection(selectionId, titleToPass, dataMin, dataMax) {
    var selectedBox = $('<div class="selected_box row"></div>');
      $(".selected_panel").append(selectedBox);
      selectedBox.attr("data-identity", selectionId);
      selectedBox.attr("data-min", dataMin);
      selectedBox.attr("data-max", dataMax);

    var deleteButton = $('<div class="delete_button"></div>');
    deleteButton.append('<div class="minus"></div>');
      //delete selected option
      deleteButton.on("click", function() {
        selectedBox.remove();
        refreshTotal();
      });

    var selectedTitle = $('<div class="selected_title"></div>');
        selectedTitle.append("<p>"+titleToPass+"</p>")

    var selectedPrice = $('<div class="selected_price"></div>');
        selectedPrice.append("<p>"+dataMin+"k~"+dataMax+"k"+"</p>");

    selectedBox.append(deleteButton, selectedTitle, selectedPrice);
    refreshTotal();
  }

  //refresh total with all mins and maxes from the estimate panel
  function refreshTotal() {
    var estimateMin = 0;
    var estimateMax = 0;
      $('.selected_panel .selected_box').each(function(){
        estimateMin += parseFloat($(this).attr('data-min'));
        estimateMax += parseFloat($(this).attr('data-max'));
      });
    if(estimateMin !==0 && $('.selected_panel .selected_box').exists()){
      $('#estimated_min').text(estimateMin + "k~");
      $('#estimated_max').text(estimateMax + "k");
    }else {
      $('#estimated_min').text(0);
      $('#estimated_max').text("k");
    };
  };

});

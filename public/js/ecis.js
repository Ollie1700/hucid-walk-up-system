$(document).ready(function() {

    // BACK BUTTON
    (() => {
        const backButton = $('.back');
        if(backButton) {
            backButton.click(() => window.history.back());
        }
    })();

    // TIMER //
    (() => {

        var
        timer = $('#timer'),
        hSpan = $('#timer .hours'),
        mSpan = $('#timer .minutes'),
        sSpan = $('#timer .seconds'),
        displayTime = function() {
            var
            d = new Date(),
            hours = (d.getHours() < 10  ? '0' : '') + d.getHours(),
            minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes(),
            seconds = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
            hSpan.html(hours);
            mSpan.html(minutes);
            sSpan.html(seconds);
        };

        displayTime();
        setInterval(displayTime, 1000);
        timer.css('opacity', '1');
    })();

    // SCHEDULE FILTERING //
    (() => {
        if($('#schedule-page')) {

            function setCoords() {
                // Initialise latitude and longitude array
                let latAndLng = [];
                // Traverse to parent of button click
                const parent = this.parentNode.parentNode;
                // Get lat and long values from element's dataset attributes
                const lat = parent.dataset.lat;
                const lng = parent.dataset.lng;
                // Push lat and long to array
                latAndLng.push({lat, lng})
                // Set local storage coordinates equal to the values held in latAndLng Array
                localStorage.setItem('coords', JSON.stringify(latAndLng))
            }

            // Get every button with the class 'directions'
            const directionButtons = document.querySelectorAll('.directions')
            // Bind an click listener to each button. When any button is clicked, call setCoords
            directionButtons.forEach(button => button.addEventListener('click', setCoords))

            // SCHEDULE FILTERING
            var currentFilters = {},
                resultCount = $('#result-count'),
                updateFilters = () => {
                    $('.schedule-filter').each((i, e) => {
                        var filter = $(e),
                            filterId = filter.attr('data-fid'),
                            current = filter.find(':selected').text();
                        currentFilters[filterId] = current;
                    });
                },
                updateResults = () => {
                    // For every result...
                    $('.result').each((i, e) => {
                        var result = $(e);
                        // Loop through every available filter
                        for(var fid in currentFilters){
                            if(currentFilters.hasOwnProperty(fid)) {
                                // If the filter doesn't match the value, exit
                                if(currentFilters[fid] != 'All' && !result.attr(`data-${fid}`).includes(currentFilters[fid])) {
                                    result.hide();
                                    return;
                                }
                            }
                        }
                        // All filters passed, so show result
                        result.show();
                    });
                }
                updateFiltersAndResults = () =>{
                    updateFilters();
                    updateResults();
                };

            // Initialise filters and results
            updateFiltersAndResults();

            // Add filter and result update to select change event
            $('.schedule-filter').change(updateFiltersAndResults);

            // Clear filters button
            $('#clear-filters').click((e) => {
                $('.schedule-filter').each((i, e) => $(e).val('All'));
                updateFiltersAndResults();
            });
        }
    })();

});

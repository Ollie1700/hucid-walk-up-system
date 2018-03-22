$(document).ready(function() {

    // TRANSLATE
    (() => {
        const translateButton = $('#language-tester');
        const testEnabled = document.cookie.includes('enabled');
        const cookieName = 'languagetest';

        translate.engine = 'yandex';
        translate.key = 'trnsl.1.1.20180322T133253Z.63b39de61ae88de4.20502fb6defaf22a33b4a69c72fd87567b8c542e';

        var getTextNodesIn = function(el) {
            return $(el).find(":not(iframe)").addBack().contents().filter(function() {
                return this.nodeType == 3;
            });
        };

        function toggleLabel() {
            if(testEnabled) {
                translateButton.html('Disable Language Test');
            }
            else {
                translateButton.html('Enable Language Test');
            }
        }

        function translateThePage() {
            if(testEnabled) {
                getTextNodesIn('body').each((i, e) => {
                    translate($(e).html(), 'ko').then(text => {
                        $(e).html(text);
                    });
                });
            }
        }

        toggleLabel();

        translateThePage();

        translateButton.click((e) => {
            e.preventDefault();

            if(testEnabled) {
                document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            }
            else {
                document.cookie = cookieName + "=enabled; expires=Thu, 01 Jan 2070 00:00:00 UTC; path=/;"
            }

            toggleLabel();
            window.location.reload(true);
        });

    })();

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

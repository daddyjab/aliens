/****************************************************

Homework Assignment:
14-JavaScript and DOM Manipulation - Project Aliens

@Author: Jeffery Brown (daddyjab)
@Date: 3/07/19
@File: aliens.js

 ****************************************************/

// Data for UFO sitings
var ufoTableData = ufo_sitings_data;

// Get the in the HTML table w/ id="ufo-table"
ufoTableBody = d3.select("#ufo-table>tbody");

// Get the Filter Button
var filterButton = d3.select("#filter-btn");

// Get the Filter Date field
var filterDateField = d3.select("#datetime");

function updateUFOTable ( ufoData ) {
// Function to update the UFO table with rows from the specified data
// Arguments: ud is an array of objects
// Returns: nothing

    // Clear the cells in the table
    ufoTableBody.selectAll("tr").remove();

    // Populate a row to data in the table for each object in the data array
    ufoData.forEach( d => {
        // Add a new row
        ufoRow = ufoTableBody.append("tr");

        // Add cells to this row
        ufoRow.append("td").text(d.datetime).style("text-align","center");
        ufoRow.append("td").text(d.city).style("text-align","center").style("text-transform", "capitalize");
        ufoRow.append("td").text(d.state).style("text-align","center").style("text-transform", "uppercase");
        ufoRow.append("td").text(d.country).style("text-align","center").style("text-transform", "uppercase");
        ufoRow.append("td").text(d.shape).style("text-align","center").style("text-transform", "capitalize");
        ufoRow.append("td").text(d.durationMinutes).style("text-align","center");
        ufoRow.append("td").text(d.comments).style("text-align","left");
    });
    
}

// Handler for the Filter
function handleFilterButton() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get the value in the filter
    var filterDataValue = filterDateField.property("value");

    // Filter the UFO data to keep only occurrences on dates matching the filter date
    // Asterisk (*) matches all dates

    if (filterDataValue === "*" ) {
        var ufoFilteredData = ufoTableData;
    } else {    
        var ufoFilteredData = ufoTableData.filter( u => (u.datetime === filterDataValue) );
    }

    // Display the data in the table
    updateUFOTable( ufoFilteredData );
}

// Display the data in the table the first time through,
// then let updates happen via the event handler
updateUFOTable( ufoTableData );

// Now set things up the handler to display the fitered data
// Handler for user clicking the Filter Button
filterButton.on( "click", handleFilterButton );

const zerorpc = require('zerorpc');
let client = new zerorpc.Client();

client.connect("tcp://127.0.0.1:4242");

// Calling Python's echo method
client.invoke("echo", "server ready", (error, res) => {
  if(error || res !== 'server ready') {
    console.error(error)
  } else {
    console.log("server is ready")
  }
})

// calling python's hellopy method
$('form').submit(function (event) {
  // below line is stopping the form to submit and reloading the page,
  // because we want to print the data on the div
    event.preventDefault();

    client.invoke("hellopy", $('#item1').val(), $('#item2').val(), function(error, res) {
      if (error){
        console.error(error)
      }
      else{
        console.log(res);
        // $('#result').text(res)
        $('ul').append("<li>"+res+"</li>")
      }
  });
});

// reading data from python's method table_dia
$('#bxt').click(function (event) {
    $('table').empty()
    client.invoke("table_dia", 'server' , function(error, res) {
      if (error){
        console.error(error)
      }
      else{
        ConvertToTable(res);
      // $('ul').append("<li>"+res+"</li>")
      }
  });
});

// below function called in above function
function ConvertToTable(jData) {
  var arrJSON = jQuery.parseJSON(jData)
  var formattedtemp = JSON.stringify(arrJSON, null, '\t');

  $('table').append("<th>Test Number</th>")
  $('table').append("<th>Result</th>")
  $('table').append("<th>Count</th>")

  for (var i = 0; i < arrJSON.length; i++){
    var tr;
    for (var i = 0; i < arrJSON.length; i++) {
        tr = $('<tr/>');
        tr.append("<td>" + arrJSON[i].test_number + "</td>");
        tr.append("<td>" + arrJSON[i].result + "</td>");
        tr.append("<td>" + arrJSON[i].Count + "</td>");
        $('table').append(tr);
    }

  }
}

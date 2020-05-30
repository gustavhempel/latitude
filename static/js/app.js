

var dataset = d3.select("#selDataset");
d3.json("samples.json").then(function(data) {

    data.names.forEach(function(info){
        // console.log(info);
        dataset.append("option").text(info);
    });
});


function optionChanged(inputValue){
    d3.json("samples.json").then(function(data) {
        // var inputValue = dataset.property("value");
        // console.log(inputValue);


        // info box
        var meta = data.metadata;
        // console.log(meta);
        let demo = meta.filter(function (e) {
            // console.log(e.id);
            return e.id == inputValue;
        });
        // console.log(demo[0]);
        var demo_box = d3.select("#sample-metadata");
        var demo_info = demo[0];


        demo_box.append("p").text(`id: ${demo_info.id}`);
        demo_box.append("p").text(`ethnicity: ${demo_info.ethnicity}`);
        demo_box.append("p").text(`gender: ${demo_info.gender}`);
        demo_box.append("p").text(`age: ${demo_info.age}`);
        demo_box.append("p").text(`location: ${demo_info.location}`);
        demo_box.append("p").text(`bbtype: ${demo_info.bbtype}`);
        demo_box.append("p").text(`wfreq: ${demo_info.wfreq}`);


        //horizontal bar chart
        var samples = data.samples;
        let sample = samples.filter(function (s) {
            return s.id == inputValue;
        });
        sample = sample[0];
        console.log(sample);
        var otu_ids = sample.otu_ids.slice(0, 10).sort(function compareFunction(firstNum, secondNum) {
            // resulting order is (3, 2, 1)
            return firstNum - secondNum;
        });
        var otu_lables = sample.otu_labels.slice(0, 10).sort(function compareFunction(firstNum, secondNum) {
            // resulting order is (3, 2, 1)
            return firstNum - secondNum;
        });
        var sample_values = sample.sample_values.slice(0, 10).sort(function compareFunction(firstNum, secondNum) {
            // resulting order is (3, 2, 1)
            return firstNum - secondNum;
        });
        var otu_ids_arr = []
        otu_ids.forEach(function (data) {
            otu_ids_arr.push(`OTU ${data}`);
        })
        console.log(otu_ids_arr);
        var trace1 = {
            x: sample_values,
            y: otu_ids_arr,
            text: otu_lables,
            orientation: 'h',
            type: 'bar'
        };
        var data = [trace1];
        Plotly.newPlot("bar", data);  

        //bubble chart

        var b_otu_ids = sample.otu_ids;
        var b_sample_values = sample.sample_values;
        var b_otu_labels = sample.otu_labels;

        var trace1 = {
            x: b_otu_ids,
            y: b_sample_values,
            text: b_otu_labels,
            mode: 'markers',
            marker: {
              size: b_sample_values,
              color: b_otu_ids
            }
          };

        var data = [trace1];

          
          
        Plotly.newPlot('bubble', data);

        
        //gauge chart

        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: demo_info.wfreq,
              title: { text: "Belly Button Washing Frequency" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [null, 7] } }
            }
          ];
          
          var layout = { width: 500, height: 400 };
          Plotly.newPlot('gauge', data, layout);
    });
};

function clearBox(elementID) { 
    var div = document.getElementById(elementID); 
      
    while(div.firstChild) { 
        div.removeChild(div.firstChild); 
    } 
} ;
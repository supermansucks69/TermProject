var country = ["Singapore", "Japan", "Russia", "China", "NZ", "Australia", "America", "UK", "India", "Germany", "Fiji", "Korea", "South Africa", "Others"]
var amt = [2000,1200,2000,3000,1500,1700,3500,2300,3000,2100,1000,2300,3000,900]


$(document).ready(function() {

	var ctxVisitorRate = document.getElementById("chart-visitor").getContext("2d");
	var chartVisitorRate = new Chart(ctxVisitorRate, {
		type: "doughnut",				//type of chart

		data: {
			labels: country,
			datasets: [ 
			{
				data: amt,
				backgroundColor: ['Red','Orange', 'Yellow', 'Green', 'Blue', 'Purple',
					'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple',
					'Red', 'Orange']
			}
		]
	},

	//configurations
	options: {
	
		title: {
			display: true,
			text: 'Visitor Rates (%)',
			fontSize: 30

			},

			animation: {
				animateScale: true
			}
		}
	});

});


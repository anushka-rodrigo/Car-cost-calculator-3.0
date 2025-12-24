  // Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {

    // Select the "Calculate Car Cost" button
    const calcButton = document.getElementById("calc");

    // Attach click event listener to run your function
    calcButton.addEventListener("click", function(event) {
        collectInputs_calc(event); // call your function
    });

});
  
  // Function to collect all input values
        function collectInputs_calc(event) {
            event.preventDefault(); // Prevent the form from submitting and refreshing the page
    
            // Home Section Inputs
            const carName = document.getElementById("carName").value;
            const carYear = document.getElementById("carYear").value;
            const carTransmission = document.getElementById("carTransmission").value;
            const carGas = document.getElementById("carGas").value;
            const carPrice = document.getElementById("carPrice").value;
            const carYrUse = document.getElementById("carYrUse").value;
            const carTDmonth = document.getElementById("carTDmonth").value;

            //home section input cals
            let yr=carYear;
            let gas=carGas;
            let price=parseFloat(carPrice);
            let n=parseInt(carYrUse);
            let td_month=parseInt(carTDmonth);

            let td=td_month*12*n;
            td = td + 1000;
            let totalMonthlyCost=0.0;

    
            // Maintenance Cost Inputs
            const tyreChangeCost = document.getElementById("tyreChangeCost").value;
            const brakePadLinerCost = document.getElementById("brakePadLinerCost").value;
            const transmissionFluidCost = document.getElementById("transmissionFluidCost").value;
            const coolantReplaceCost = document.getElementById("coolantReplaceCost").value;
            const batteryReplacementCost = document.getElementById("batteryReplacementCost").value;

            //maintenance cost calcs
            let ttc=parseFloat(tyreChangeCost);
            let tbc=parseFloat(brakePadLinerCost);
            let ttf=parseFloat(transmissionFluidCost);
            let tcc=parseFloat(coolantReplaceCost);
            let tbr=parseFloat(batteryReplacementCost);

            ttc=ttc*parseInt(td/30000.0);
            tbc=tbc*parseInt(td/35000.0);
            ttf=ttf*parseInt(td/30000.0);
            tcc=tcc*n;
            tbr=tbr*(n/3.0);

            let tmc=ttc+tbc+ttf+tcc+tbr;

            // Operational Cost Inputs
            const fuelCost = document.getElementById("fuelCost").value;
            const fuelEfficiency = document.getElementById("fuelEfficiency").value;
            const carCostByInsurance = document.getElementById("carCostByInsurance").value;
            const insuranceCost = document.getElementById("insuranceCost").value;

            // operational cost calcs
            let fuel=parseFloat(fuelCost);
            let distance=parseFloat(fuelEfficiency);
            let tic=parseFloat(carCostByInsurance);
            let percentage=parseFloat(insuranceCost);

            let tfc=(parseFloat(td)/distance)*fuel;
            tic=(tic*percentage/100)*n;

            let toc=tfc+tic;
            totalMonthlyCost = totalMonthlyCost + ((parseFloat(td_month)/distance)*fuel) + (parseFloat(tic)/(12.0*n));

            // Service Cost Inputs
            const vehicleEmissionCost = document.getElementById("vehicleEmissionCost").value;
            const serviceCost = document.getElementById("serviceCost").value;
            const carWashCost = document.getElementById("carWashCost").value;

            // service cost calcs
            let tet=parseFloat(vehicleEmissionCost);
            let tfs=parseFloat(serviceCost);
            let carWash=parseFloat(carWashCost);
    
            tet=tet*n;
            tfs=(parseFloat(td)/5000)*tfs;
            let tcw=((12*n)-(parseFloat(td)/5000))*carWash;

            let tsc=tet+tfs+tcw;
            totalMonthlyCost = totalMonthlyCost + (tfs/(12.0*n)) + carWash;

            // Other Cost Inputs
            const supplementaryCost = document.getElementById("supplementaryCost").value;
            const lease = document.getElementById("lease").value;
            const leaseRate = document.getElementById("leaseRate").value;

            // other cost calcs
            let sc=parseFloat(supplementaryCost);
            let a=parseFloat(lease);
            let r=parseFloat(leaseRate);

            sc=price*sc/100;
            sc=sc*0.25*n;
            let lr=(a*r*n)/100;
            let ls=0.00;
            ls=ls+(a/(12.00*n));
            ls = ls + (lr*(1.0/(12.0*n)));

            let totherc=sc+lr+a;
            totalMonthlyCost = totalMonthlyCost + ls + (sc/3.0);

            //calculating the vehicle depreciation
            let cd = parseFloat(price);
            let d = [15,10,10,5,5,3,3,2,2,1];

            //get the section to update
            let depsec = document.getElementById("depreciation");
            depsec.innerHTML =  "<h3>Vehicle Depreciation over the years: </h3><ul>";
            for (i=0; i<n; i++){
                cd=cd-(cd*d[i]/100);
                depsec.innerHTML += `<li>Depreciation for year ${i+1} : Rs. ${cd.toFixed(2)}</li>`;
            }
            depsec.innerHTML += `</ul><br><p><b> Final depreciated value of vehicle: Rs. ${cd.toFixed(2)}</b></p>`; 
            //${cd.toFixed(2)} this is to make 2 decimal places are printed, to use it instead of "" use ``

            // Display the results in the "results" section
            let res = document.getElementById("results");
            let sum = tmc + toc + tsc + totherc;
            let totalMonthlyCost2 = totalMonthlyCost - ls;

            res.innerHTML = `
                <h3>Final Cost Summary</h3>
                <ul>
                    <li><b>Total Cost for vehicle for ${n} years:</b> Rs. ${sum.toFixed(2)}</li>
                    <li><b>Lease settlement for 1 month:</b> Rs. ${ls.toFixed(2)}</li>
                    <li><b>Monthly cost for vehicle:</b> Rs. ${totalMonthlyCost.toFixed(2)}</li>
                    <li><b>Monthly cost for vehicle without lease settlement:</b> Rs. ${totalMonthlyCost2.toFixed(2)}</li>
                    <li><b>Car value left after ${n} years:</b> Rs. ${cd.toFixed(2)}</li>
                </ul><br>
                <center><h2>Thank you for using our service!</h2></center>
            `;
            document.getElementById("finalResults").style.display = "block";
        }
    

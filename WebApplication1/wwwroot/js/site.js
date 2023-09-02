// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


const urlApi ='https://insw-dev.ilcs.co.id/n/pelabuhan?'
function suggestCountries(){
    var countryInput = document.getElementById('InputCountry').value;
    var suggestionsCountry = document.getElementById('suggestionsCountry');
    suggestionsCountry.innerHTML = '';

    if (countryInput.length >= 3) {
        fetch(`${urlApi}/negara?ur_negara=${countryInput}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(country => {
                    var listItem = document.createElement('li');
                    listItem.textContent = country.nama_negara;
                    suggestionsCountry.appendChild(listItem);
                });
            })
            .catch(error => console.error(error));
    }
}

function suggestHarbor() {
    var countryInput = document.getElementById('InputCountry').value;
    var pelabuhanInput = document.getElementById('InputHarbor').value;
    var suggestionsHarbor = document.getElementById('suggestionsHarbor');
    suggestionsHarbor.innerHTML = '';

    if (pelabuhanInput.length >= 3) {
        fetch(`${urlApi}/n/pelabuhan?kd_negara=${countryInput}&ur_pelabuhan=${pelabuhanInput}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(port => {
                    var listItem = document.createElement('li');
                    listItem.textContent = port.ur_pelabuhan;
                    suggestionsHarbor.appendChild(listItem);
                });
            })
            .catch(error => console.error(error));
    }
}

function suggestGoods(){
    var goodsCode = document.getElementById('inputGoodsCode').value;
    var priceInput = document.getElementById("totalPrice").value;
    fetch(`${urlApi}/n/barang?hs_code=${goodsCode}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var barangData = data[0]; // Ambil data pertama dari respons API
                
                var dataBarangElement = document.getElementById('goodsData');
                dataBarangElement.textContent = `Nama Barang: ${barangData.nama_barang}, Deskripsi: ${barangData.deskripsi}`;
                
                var persentaseTaxElement = document.getElementById('persentaseTax');
                persentaseTaxElement.textContent = `Persentase Tax (b): ${barangData.tarif}%`;
                
                var totalElement = document.getElementById("totalPrice");
                totalElement.textContent = `Total: ${priceInput}`
            }
            else {
                var dataBarangElement = document.getElementById('c');
                dataBarangElement.textContent = 'Data barang tidak ditemukan.';
            }
        })
        .catch(error => console.error(error));
}


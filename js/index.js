

// var siteNameInput = document.getElementById('siteName');
// var siteLinkInput = document.getElementById('siteURL');

// var siteArr = [];

// if(localStorage.getItem('sites') != null){
//     siteArr = JSON.parse(localStorage.getItem('sites'));
//     addSite();

//     console.log(siteArr);
// }

// function addSite() {
//     var sites = {
//         name: siteNameInput.value,
//         link: siteLinkInput.value
//     }
//     // console.log(sites);

//     siteArr.push(sites);

//     localStorage.setItem('sites', JSON.stringify(siteArr));


//     // console.log(siteArr)
//     displaySites();
//     clearInputs();
// }

// function displaySites() {
//     var container = '';
//     for (var i = 0; i < siteArr.length; i++) {
//         container += `
//         <tr>
//             <td>${i+1}</td>
//             <td>${siteArr[i].name}</td>
//             <td>
//                 <button onclick="" class="btn btn-outline-secondary">
//                    <a href="${siteArr[i].link}" class="text-black">Visite</a>
//                 </button>
//             </td>
//             <td>
//                <button onclick="deleteSite(${i})" class="btn btn-danger">Delete</button>
//             </td>
//         </tr>
//         `
//     }

//     document.getElementById('tBody').innerHTML = container;

//     // console.log(JSON.parse(localStorage.getItem('sites')));
// }


// function clearInputs(){
//     siteNameInput.value = '';
//     siteLinkInput.value = '';
// }

// function deleteSite(deleteIndex){
//     siteArr.splice(deleteIndex, 1);
//     displaySites();
//     localStorage.setItem('sites', JSON.stringify(siteArr));
// }

var siteNameInput = document.getElementById('siteName');
var siteLinkInput = document.getElementById('siteURL');

var siteArr = [];

// Check if 'sites' key exists in localStorage
if (localStorage.getItem('sites') != null) {
    // If 'sites' key exists, parse its value and assign it to siteArr
    siteArr = JSON.parse(localStorage.getItem('sites'));
    // After parsing, display the sites
    displaySites();
}

function addSite() {
    if (validateURL(siteLinkInput.value)) {
        var sites = {
            name: siteNameInput.value,
            link: siteLinkInput.value
        }
        // Add the new site to the siteArr
        siteArr.push(sites);
        // Update localStorage with the new siteArr
        localStorage.setItem('sites', JSON.stringify(siteArr));
        // Display the updated sites
        displaySites();
        // Clear input fields
        clearInputs();
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong in yor URL!",
          });
    }
}

// ---------------------------------- function displaySites 

function displaySites() {
    var container = '';
    for (var i = 0; i < siteArr.length; i++) {
        container += `
        <tr>
            <td>${i + 1}</td>
            <td>${siteArr[i].name}</td>
            <td>
                <button class="btn btn-outline-secondary">
                   <a href="${siteArr[i].link}" class="text-black">Visit</a>
                </button>
            </td>
            <td>
               <button onclick="deleteSite(${i})" class="btn btn-danger">Delete</button>
            </td>
        </tr>
        `;
    }

    document.getElementById('tBody').innerHTML = container;
}

// ---------------------------------------- function validateURL

function validateURL(urlR) {
    var urlRegex = /^(?:https?:\/\/)?(?:www\.)?[^\s\/]+\.[^\s]{2,}$/i
    return urlRegex.test(urlR);

}
// /^((http|https):\/\/)?www\.([a-A]+)\.([A-z]{2,})/

// ---------------------------------------- function clearInputs

function clearInputs() {
    siteNameInput.value = '';
    siteLinkInput.value = '';
}

// ---------------------------------------- function deleteSite

function deleteSite(deleteIndex) {
    
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger mx-2"
    },
    buttonsStyling: false
});
swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
}).then((result) => {
    if (result.isConfirmed) {

        siteArr.splice(deleteIndex, 1);
        localStorage.setItem('sites', JSON.stringify(siteArr));
        displaySites();

        swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your bookmark has been deleted.",
            icon: "success"
        });
    } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
    ) {
        swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary bookmark is safe :)",
            icon: "error"
        });
    }
});
}




var sitenameinput = document.getElementById("siteName");
var siteurlinput = document.getElementById("siteUrl");

var sitelist = [];

if (localStorage.getItem("sites") != null) {
	sitelist = JSON.parse(localStorage.getItem("sites"));
	displaysite();
}

function addsite() {
	if (validatename() && validateurls()) {
		var site = {
			name: sitenameinput.value,
			url: siteurlinput.value,
		};
		sitelist.push(site);
		localStorage.setItem("sites", JSON.stringify(sitelist));
		displaysite();
		clearform();
	} else {
		Swal.fire({
			icon: "error",
			title: "Site Name or Url is not valid, Please follow the rules below :",
			text: `Site name must contain at least 3 characters
            Site URL must be a valid one
            `,
			footer: '<a href="#">Why do I have this issue?</a>',
		});
	}
}
function displaysite() {
	var box = ``;
	for (var i = 0; i < sitelist.length; i++) {
		box += `
        <div class="bookmark-item col-xl-3 col-lg-4 col-md-6 mb-4">
					<div class="bookmark-card justify-content-center align-items-center p-4">
						<div class="bookmark-header d-flex flex-column justify-content-between align-items-center">
							<h3 class="text-center my-2">${sitelist[i].name}</h3>
							<small class="bookmark-url my-2">${sitelist[i].url}</small>
							<span class="badge my-2 text-bg-info text-white">Index : ${i + 1} </span>
						</div>
						<div class="bookmark-actions">
							<div class="d-flex gap-2">
								<a href="${
									sitelist[i].url
								}" class="text-decoration-none" target="_blank" rel="noopener noreferrer"><button
									class="btn-visit flex-fill d-flex justify-content-center align-items-center p-3 flex-row"
								>
									<i class="fa-solid fa-link"></i> Visit
								</button></a>
								<button onclick="deletesites(${i})" class="btn-delete " onclick="deleteBookmark(this)">
									<i class="fa-solid fa-trash"></i> Delete
								</button>
							</div>
						</div>
					</div>
				</div>
        `;
	}
	document.getElementById("bookmarksList").innerHTML = box;
}
function clearform() {
	sitenameinput.value = "";
	siteurlinput.value = "";
    sitenameinput.classList.remove("is-valid");
    siteurlinput.classList.remove("is-valid");
}

function deletesites(index) {
	sitelist.splice(index, 1);
	localStorage.setItem("sites", JSON.stringify(sitelist));
	displaysite();
}
function validatename() {
	var regex = /^[a-zA-Z0-9]{2,}$/;
	if (regex.test(sitenameinput.value)) {
		sitenameinput.classList.add("is-valid");
		sitenameinput.classList.remove("is-invalid");
		return true;
	} else {
		sitenameinput.classList.add("is-invalid");
		sitenameinput.classList.remove("is-valid");
		return false;
	}
}

function validateurls() {
	var regex =
		/^(https?|ftp):\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
	if (regex.test(siteurlinput.value)) {
		siteurlinput.classList.add("is-valid");
		siteurlinput.classList.remove("is-invalid");
		return true;
	} else {
		siteurlinput.classList.add("is-invalid");
		siteurlinput.classList.remove("is-valid");
		return false;
	}
}

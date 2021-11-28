const occupationContainer = document.querySelector("#occupation-container");
const loader = document.querySelector("#loader");

const isStudent = document.form.education;

const toggleOccupation = (e) => {
 if (e === "no") {
  occupationContainer.style.display = "flex";
 } else {
  occupationContainer.style.display = "none";
  document.querySelector("#occupation").value = "";
 }
};

for (var i = 0; i < isStudent.length; i++) {
 isStudent[i].addEventListener("change", () => {
  toggleOccupation(isStudent.value);
 });
}
const handleSubmit = (e) => {
 e.preventDefault();
 let fullName = document.querySelector("#name").value;
 let age = document.querySelector("#age").value;
 let phoneNumber = document.querySelector("#phoneNumber").value;
 let occupationDOM = document.querySelector("#occupation").value;
 let email = document.querySelector("#email").value.toLowerCase();
 let facebookUsername = document.querySelector("#facebookUsername").value;
 let wish = document.querySelector("#wish").value;
 const submitBtn = document.querySelector("#submitBtn");
 let isStudent = document.forms["form"]["education"].value;
 let gender = document.forms["form"]["gender"].value;

 submitBtn.style.display = "none";
 loader.style.display = "block";

 const data = {
  name: fullName,
  age,
  occupation: occupationDOM ? occupationDOM : "",
  gender,
  phoneNumber,
  email,
  isStudent,
  facebookUsername,
  wish,
 };

 fetch("https://pure-springs-87823.herokuapp.com/api/v1/user/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
 })
  .then((data) => data.json())
  .then((res) => {
   loader.style.display = "none";
   if (!res.error) {
    Swal.fire(
     "Congratulations!",
     "Your submission was received and have been recorded",
     "success"
    );
    submitBtn.style.display = "block";
    // fullName = "";
    // age = "";
    // phoneNumber = "";
    // occupationDOM = "";
    // gender = "";
    // isStudent = "";
    // facebookUsername = "";
    // wish = "";
    document.querySelector("#name").value = "";
    document.querySelector("#age").value = "";
    document.querySelector("#phoneNumber").value = "";
    document.querySelector("#occupation").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#facebookUsername").value = "";
    document.querySelector("#wish").value = "";

    document.querySelectorAll(".radio").forEach((item) => {
     item.checked = false;
    });
   } else if (
    res.error &&
    res.message === "Email or phone number already registered"
   ) {
    Swal.fire(
     "Ooops!",
     "The email or phone number have been registered before",
     "error"
    );
    submitBtn.style.display = "block";
    console.log("Already submitted before");
   }
  })
  .catch((err) => {
   loader.style.display = "none";
   console.log(err.message);
   if (err.message === "Failed to fetch") {
    Swal.fire(
     "Ooops!",
     "It seems like you are not connected to the internet",
     "error"
    );
    submitBtn.style.display = "block";
   } else {
    Swal.fire("Ooops!", "An error occured, please try again later", "error");
    submitBtn.style.display = "block";
   }
  });
};

document.querySelector("#form").addEventListener("submit", handleSubmit);

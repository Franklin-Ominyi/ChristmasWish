const occupationContainer = document.querySelector("#occupation-container");
const loader = document.querySelector("#loader");

const isStudent = document.form.education;
let occupationDOM;
const toggleOccupation = (e) => {
 if (e === "no") {
  occupationContainer.style.display = "flex";
  occupationDOM = document.querySelector("#occupation").value;
 } else {
  occupationContainer.style.display = "none";
  occupationDOM = "";
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

 let email = document.querySelector("#email").value.toLowerCase();
 let facebookUsername = document.querySelector("#facebookUsername").value;
 let wish = document.querySelector("#wish").value;
 const submitBtn = document.querySelector("#submitBtn");
 const isStudent = document.forms["form"]["education"].value;
 const gender = document.forms["form"]["gender"].value;

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
     "Your submission was recieved and have been recorded",
     "success"
    );
   } else if (
    res.error &&
    res.message === "Email or phone number already registered"
   ) {
    Swal.fire(
     "Ooops!",
     "The email or phone number have been registered before",
     "error"
    );
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
   } else {
    Swal.fire("Ooops!", "An error occured, please try again later", "error");
   }
  });
};

document.querySelector("#form").addEventListener("submit", handleSubmit);

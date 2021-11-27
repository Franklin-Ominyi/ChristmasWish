const occupationContainer = document.querySelector("#occupation-container");

const isStudent = document.form.education;

const toggleOccupation = (e) => {
 if (e === "no") {
  occupationContainer.style.display = "flex";
 } else {
  occupationContainer.style.display = "none";
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
 const isStudent = document.forms["form"]["education"].value;
 const gender = document.forms["form"]["gender"].value;

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
   console.log(res);
   if (!res.error) {
    console.log("Created Successfully");
   } else if (
    res.error &&
    res.message === "Email or phone number already registered"
   ) {
    console.log("Already submitted before");
   }
  })
  .catch((err) => {
   console.log(err.message);
  });
};

document.querySelector("#form").addEventListener("submit", handleSubmit);

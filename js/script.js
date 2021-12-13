const occupationContainer = document.querySelector("#occupation-container");
const loader = document.querySelector("#loader");
console.log("hello world")
const isStudent = document.form.education;

window.onload = () => {
 if (document.readyState === "complete") {
  document.querySelector(".page-loading").style.display = "none";
  document.querySelector(".container").style.display = "flex";
 }
};

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

 let phoneNumber = document.querySelector("#phoneNumber").value;
 let occupationDOM = document.querySelector("#occupation").value;
 let email = document.querySelector("#email").value.toLowerCase();
 let facebookUsername = document.querySelector("#facebookUsername").value;
 let coupon = document.querySelector("#coupon").value.toLowerCase();
 let accountNumber = document.querySelector("#account-number").value;
 let accountName = document.querySelector("#account-name").value;
 let accountBank = document.querySelector("#account-bank").value;

 let wish = document.querySelector("#wish").value;
 const submitBtn = document.querySelector("#submitBtn");
 let isStudent = document.forms["form"]["education"].value;
 let gender = document.forms["form"]["gender"].value;

 submitBtn.style.display = "none";
 loader.style.display = "block";

 const data = {
  name: fullName,
  occupation: occupationDOM ? occupationDOM : "",
  gender,
  phoneNumber,
  email,
  isStudent,
  facebookUsername,
  coupon,
  accountNumber,
  accountName,
  accountBank,
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
   loader.style.display = "none";
   if (!res.error) {
    console.log("true");
    Swal.fire(
     "Congratulations!",
     "Your submission was received and have been recorded.  NB - You are expected to advertise this platform on your Facebook page before you will be credited.",
     "success"
    );
    submitBtn.style.display = "block";

    document.querySelector("#name").value = "";
    document.querySelector("#phoneNumber").value = "";
    document.querySelector("#occupation").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#facebookUsername").value = "";
    document.querySelector("#coupon").value = "";
    document.querySelector("#account-name").value = "";
    document.querySelector("#account-number").value = "";
    document.querySelector("#account-bank").value = "";
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
   } else if (res.error && res.message === "Coupon was already used") {
    Swal.fire(
     "Ooops!",
     "The coupon code you inputed has been used before",
     "error"
    );
    submitBtn.style.display = "block";
   } else if (res.error && res.message === "Coupon is not valid") {
    Swal.fire("Ooops!", "The coupon code you inputed is not valid", "error");
    submitBtn.style.display = "block";
   }
  })
  .catch((err) => {
   loader.style.display = "none";
   console.log("eror");

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
    console.log(err);
   }
  });
};

document.querySelector("#form").addEventListener("submit", handleSubmit);
// const coupon = async () => {
//   
//  }

//  const coupons = await arr;
//  const data = coupons;
//  fetch("http://localhost:3000/api/v1/admin/addcoupon", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(data),
//  })
//   .then((data) => data.json())
//   .then((res) => {
//    console.log(res);
//   })
//   .catch((err) => {
//    console.log(err);
//   });
// };

// coupon();

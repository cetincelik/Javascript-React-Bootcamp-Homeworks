let Users = [];
let checkRange = document.querySelector("#first-range");

const getUsers = () => {
  return fetch("https://randomuser.me/api/?results=100")
    .then((response) => response.json())
    .then((results) => results.results)
    .then((data) => {
      Users = data;
    })
    .catch((error) => console.log(error));
};
const filterByAgeRange = (lowerLimit, upperLimit) => {
  let usersByAgeRange = Users.filter(
    (user) => user.dob.age > lowerLimit && user.dob.age < upperLimit
  );
  return usersByAgeRange;
};
const showAllUser = (user) => {
  const allUsersElement = document.querySelector("#user-list");
  let userElement = document.createElement("div");
  userElement.classList.add("user-list-item");
 
  newElement(userElement, "flex", user.name.first);
  newElement(userElement, "flex", user.name.last);
  newElement(userElement, "flex", user.dob.age);
  allUsersElement.appendChild(userElement);
};

const allData = async () => {
  await getUsers();
  console.log(Users);
  Users.map((user) => showAllUser(user));
};

const filterUsers = () => {
  const allUsersElement = document.querySelector("#user-list");
  allUsersElement.innerText = "";

  let filteredUsers = [];
  let lowerLimit, upperLimit;

  var ranges = document.getElementsByName("age-range");
  for (var range of ranges) {
    if (range.checked) {
      lowerLimit = range.value.split("-")[0];
      upperLimit = range.value.split("-")[1];
    }
  }
  if (upperLimit === undefined) {
    upperLimit = Number.MAX_VALUE;
  }

  filteredUsers = filterByAgeRange(lowerLimit, upperLimit);
  filteredUsers.map((user) => showAllUser(user));
};
const newElement = (appendedElement, className, text) => {
  const element = document.createElement("div");
  element.classList.add(className);
  element.innerText = text;
  appendedElement.appendChild(element);
};

allData();

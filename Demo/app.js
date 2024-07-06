var courseApi = "http://localhost:3000/courses";

function start() {
  getCourses(renderCourses);
  handleCreateForm();
}

start();
//Functions

function getCourses(callback) {
  fetch(courseApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function createCourse(data, callback) {
  var options = {
    method: "POST",
    body: JSON.stringify(data),
  };
  fetch(courseApi, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function handleDeleteCourse(id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(courseApi + "/" + id, options)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      var courseItem = document.querySelector(".course-item-" + id);
      if (courseItem) {
        courseItem.remove();
      }
    });
}

function renderCourses(courses) {
  var coursesListBlock = document.querySelector("#courses-list");
  var htmls = courses.map(function (course) {
    return `
        <li class="course-item-${course.id}">
            <h4>${course.title}</h4>
            <p>${course.description}</p>
            <button onclick="handleDeleteCourse('${course.id}')">Delete</button>
        </li>       
        `;
  });
  coursesListBlock.innerHTML = htmls.join("");
}

function handleCreateForm() {
  var createBtn = document.querySelector("#create");
  createBtn.onclick = function () {
    var title = document.querySelector('input[name="title"]').value;
    var description = document.querySelector('input[name="description"]').value;

    var formData = {
      title: title,
      description: description,
    };
    createCourse(formData, function () {
      getCourses(renderCourses);
    });
  };
}

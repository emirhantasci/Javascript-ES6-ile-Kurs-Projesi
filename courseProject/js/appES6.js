class Course {
    constructor(title,instructor,image){
        this.courseId=Math.floor(Math.random()*10000)
        this.title=title;
        this.instructor=instructor;
        this.image=image;
    }
}

class UI{
    addCourseToList(course){
        const list=document.querySelector("#course-list");

        var html = `
        <tr>
            <td><img src="/img/${course.image}" style="width:180px;"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href='#' data-id="${course.courseId}" class="btn btn-danger btn-sm delete mt-2"> Delete </a></td>
        </tr>
        `
        list.innerHTML += html;
    }
    clearControls() {
        const title = document.querySelector("#title").value="";
        const instructor = document.querySelector("#instructor").value="";
        const image = document.querySelector("#image").value="";
    }
    deleteCourse(element){
        if(element.classList.contains('delete')){
            const ui = new UI();
            element.parentElement.parentElement.remove();
            ui.showAlert('Kurs kaydı silindi.', 'danger');
        }
    }
    showAlert(message,className){
        var alert = `
        <div class="alert alert-${className}">
            ${message}
        </div>
        `;

        const row = document.querySelector(".row");
        row.insertAdjacentHTML('beforeBegin', alert);

        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 3000);
    }
}

class Storage{
    static getCourses(){
        let courses;
        if(localStorage.getItem('courses')==null){
            courses=[ ];
        }
        else{
            courses=JSON.parse(localStorage.getItem('courses'));
        }
        console.log(courses);
        return courses;
    }
    static displayCourses(){
        const courses = Storage.getCourses();
        const ui = new UI();
        courses.forEach(course => ui.addCourseToList(course));

    }
    static addCourse(course){
        const courses=Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
    }
    static deleteCourse(element){
        
        if(element.classList.contains('delete')){
            const id=element.getAttribute("data-id");
            console.log(id);
            const courses= Storage.getCourses();
            
            courses.forEach(function(course,index){
                console.log(index);
                if(course.courseId == id){
                    courses.splice(index, 1);
                }
            });

            localStorage.setItem('courses', JSON.stringify(courses))
        }
        else{
            console.log("Yanlış");
        }
    }
}

document.addEventListener('DOMContentLoaded', Storage.displayCourses);

document.querySelector("#new-course").addEventListener('submit', function(e){

    const title = document.querySelector("#title").value;
    const instructor = document.querySelector("#instructor").value;
    const image = document.querySelector("#image").value;
    
    const course = new Course(title,instructor,image);
    console.log(course);

    const ui = new UI();

    if(title == null || instructor==null || image==null){
        ui.showAlert('Lütfen formu eksiksiz bir şekilde tamamlayın.','warning');
    }else{
        ui.showAlert('Kurs kaydı başarıyla oluşturuldu.','success');
        ui.addCourseToList(course);
        Storage.addCourse(course);
        
        ui.clearControls();
    }
    

    e.preventDefault();
});

document.querySelector("#course-list").addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteCourse(e.target);
    Storage.deleteCourse(e.target);
});

function newFunction(e) {
    e.preventDefault();
    e.preventDefault();
}

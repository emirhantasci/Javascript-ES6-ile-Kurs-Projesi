function Course(title,instructor, image){
    this.title=title;
    this.instructor=instructor;
    this.image=image;
}

function UI(){

}

UI.prototype.addCourseToList=function(course){
    const list=document.querySelector("#course-list");

    var html = `
    <tr>
        <td><img src="/img/${course.image}" style="width:180px;"/></td>
        <td>${course.title}</td>
        <td>${course.instructor}</td>
        <td><a href='#' class="btn btn-danger btn-sm delete"> Delete </a></td>
    </tr>
    `
    list.innerHTML += html;
}

UI.prototype.clearControls=function(){
    const title = document.querySelector("#title").value="";
    const instructor = document.querySelector("#instructor").value="";
    const image = document.querySelector("#image").value="";
}

UI.prototype.deleteCourse=function(element){
    if(element.classList.contains('delete')){
        element.parentElement.parentElement.remove();
    }
}

UI.prototype.showAlert=function(message,className){
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



document.querySelector("#new-course").addEventListener('submit', function(e){

    const title = document.querySelector("#title").value;
    const instructor = document.querySelector("#instructor").value;
    const image = document.querySelector("#image").value;
    
    const course = new Course(title,instructor,image);


    const ui = new UI();

    if(title == null || instructor==null || image==null){
        ui.showAlert('Lütfen formu eksiksiz bir şekilde tamamlayın.','warning');
    }else{
        ui.showAlert('Kurs kaydı başarıyla oluşturuldu.','success');
        ui.addCourseToList(course);
        ui.clearControls();
    }
    

    e.preventDefault();
});

document.querySelector("#course-list").addEventListener('click', function(e){
    console.log(e.target);
    const ui = new UI();
    ui.deleteCourse(e.target);
    ui.showAlert('Kurs kaydı silindi.', 'danger');
});
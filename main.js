// Lưu dữ liệu trên server
var useApi = 'http://localhost:3000/use';
// console.log(useApi);
// Hàm chạy
function star() {
    getUse(function(uses){
        console.log(uses);
        renderUse(uses);   
    }); 
    handleCreatForm();
}
star();
//lấy dữ liệu server
function getUse(callback){
     fetch(useApi)
        .then(function(response){ 
            return response.json();
        })
        .then(callback);
}    
// Render code: Đưa dữ liệu ra trình duyệt
function renderUse(uses) {
    var listUse = document.querySelector('#list-use');
    console.log(listUse);
    var htmls = uses.map(function(use){
        return `
            <li class="use-item-${use.id}">
                <h4>${use.name}</h4>
                <p>${use.email}</p>
                <button onclick="deleteUse(${use.id})">Xóa</button>
            </li>
        `;
    });
    listUse.innerHTML = htmls.join('');
}
// Tạo tài khoản
function handleCreatForm(){
    var createBtn = document.querySelector('.form-submit');
    console.log(createBtn);
    createBtn.onclick = function(){
       var name = document.querySelector('input[name="fullname"]').value;
       console.log(name);
       var email = document.querySelector('input[name="email"]').value;
       var password = document.querySelector('input[name="password"]').value;
       var forData = {
           name: name,
           email: email,
           password: password
       }
       createUse(fordata, function(){
            getUse(renderUse);
       });
    };
}
// Gửi dữ liệu đi.
function createUse(data, callback){
    var options = {
        methd: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    };
    fetch(useApi,options)
        .then(function(response){
            response.json();
        })
        .then(callback);
}
// Xóa dữ liệu
function deleteUse(id){
    var options = {
        methd: 'Delete',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    };
    fetch(useApi + '/' + id,options)
        .then(function(response){
            response.json();
        })
        .then(function(){
            var useItem = document.querySelector('.use-item-'+id);
            if(useItem) {
                useItem.remove();
            }
        });
}
const elInput = document.querySelector('.js-todo-input') ;
const elTemplate = document.querySelector('.js-todo-temp').content ;
const elParentBtns = document.querySelector('.js-parent-btns') ;
const elTodoList = document.querySelector('.js-todo-list') ;
const elNotTodos = document.querySelector('.js-not-todos') ;

let todos = window.localStorage.getItem('todos') ? JSON.parse(window.localStorage.getItem('todos')): [] ;

const handleRenderTodos = (arr) => {
    elTodoList.innerHTML = '';
    if(arr.length){
        const docFragment = document.createDocumentFragment() ;
        elNotTodos.classList.add('d-none') ;
        arr.forEach((todo) => {
            let clone = elTemplate.cloneNode(true) ;
            clone.querySelector('.js-todo-name').textContent = todo.title ;
            clone.querySelector('.js-todo-del-btn').dataset.id = todo.id ;
            clone.querySelector('.js-todo-edit-btn').dataset.id = todo.id ;
            let elComplateChecked = clone.querySelector('.js-is-complate') ;
            elComplateChecked.checked = todo.isComplate ;
            elComplateChecked.dataset.id = todo.id ;
            docFragment.append(clone) ;
        });
        elTodoList.append(docFragment) ;
    }else {elNotTodos.classList.remove('d-none')} ;
}

const toCheckTodos = (arr) => { if(!(arr.length)){elParentBtns.classList.add('d-none')} else {elParentBtns.classList.remove('d-none')} };

const handleChange = (evt) => {
    if(!(evt.target.value.trim().length)) return alert("Iltimos todo Kiriting !") ;
    const todoValue = evt.target.value.trim().toLowerCase() ;
    let newTodo = {
        id : uuid.v4(),
        title : todoValue,
        isComplate : false,
    };
    todos.push(newTodo) ;
    evt.target.value = '';
    window.localStorage.setItem('todos', JSON.stringify(todos));
    toCheckTodos(todos) ;
    handleRenderTodos(todos) ;
};

const handleChangeComplate = (evt) => {
    if(evt.target.matches('.js-is-complate')){
        const elChecked = evt.target.checked ;
        const id = evt.target.dataset.id ;
        const idx = todos.findIndex((todo) => todo.id == id) ;
        todos[idx].isComplate = elChecked ;
        window.localStorage.setItem('todos', JSON.stringify(todos)) ;
    };
};

const handleTodoClick = (evt) => {
    if(evt.target.matches('.js-todo-edit-btn')){
        const id = evt.target.dataset.id;
        const idx = todos.findIndex((todo) => todo.id === id);
        let editionalTitle = prompt('Edit the Todo', todos[idx].title).trim().toLowerCase();
        todos[idx].title = editionalTitle;
        window.localStorage.setItem('todos', JSON.stringify(todos));
        handleRenderTodos(todos);
    };
    if(evt.target.matches('.js-todo-del-btn')){
        const id = evt.target.dataset.id ;
        const idx = todos.findIndex((todo) => todo.id == id) ;
        todos.splice(idx, 1) ;
        window.localStorage.setItem('todos', JSON.stringify(todos)) ;
        handleRenderTodos(todos)
    };
};

const handleParentBtnsClick = (evt) => {
    let filterTodos = structuredClone(todos) ;
    if(evt.target.matches('.js-all-todos')) handleRenderTodos(todos) ;
    if(evt.target.matches('.js-all-complated')) filterTodos = filterTodos.filter((todo) => todo.isComplate) ; handleRenderTodos(filterTodos) ;
    if(evt.target.matches('.js-not-complated')) filterTodos = filterTodos.filter((todo) => !(todo.isComplate)) ; handleRenderTodos(filterTodos) ;
};

toCheckTodos(todos) ;
handleRenderTodos(todos) ;
elInput.addEventListener('change', handleChange) ;
elTodoList.addEventListener('change', handleChangeComplate);
elTodoList.addEventListener('click', handleTodoClick);
elParentBtns.addEventListener('click', handleParentBtnsClick); 


































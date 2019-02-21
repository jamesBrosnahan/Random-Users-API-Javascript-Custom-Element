class RandomUserName extends HTMLElement{
  static get observedAttributes(){
    return ['title', 'first-name', 'last-name'];
  }
  constructor(){
    super();
    let shadowRoot = this.attachShadow({mode : 'closed'});
    shadowRoot.innerHTML = '<style>div{display: grid; grid-template-columns: minmax(max-content, 3fr) minmax(max-content, 3fr) minmax(max-content, 3fr);}</style>';
    this.container = document.createElement('div');
    this.title_paragraph = document.createElement('p');
    this.first_name_paragraph = document.createElement('p');
    this.last_name_paragraph = document.createElement('p');
    this.container.appendChild(this.title_paragraph);
    this.container.appendChild(this.first_name_paragraph);
    this.container.appendChild(this.last_name_paragraph);
    shadowRoot.appendChild(this.container);
  }
  attributeChangedCallback(attribute, oldVal, newVal) {
    if(attribute === 'title'){
      this.title_paragraph.innerText = newVal;
    }else if(attribute === 'first-name'){
      this.first_name_paragraph.innerText = newVal;
    }else if(attribute === 'last-name'){
      this.last_name_paragraph.innerText = newVal;
    }
  }
  set title(value){
    if(value){
      this.setAttribute('title', value);
    }else{
      this.removeAttribute('title');
    }
  }
  get title(){
    if(this.hasAttribute('title')){
      return this.getAttribute('title');
    }else{
      return this.title_paragraph.innerText;
    }
  }
  set first_name(value){
    if(value){
      this.setAttribute('first-name', value);
    }else{
      this.removeAttribute('first-name');
    }
  }
  get first_name(){
    if(this.hasAttribute('first-name')){
      return this.getAttribute('first-name');
    }else{
      return this.first_name_paragraph.innerText;
    }
  }
  set last_name(value){
    if(value){
      this.setAttribute('last-name', value);
    }else{
      this.removeAttribute('last-name');
    }
  }
  get last_name(){
    if(this.hasAttribute('last-name')){
      return this.getAttribute('last-name');
    }else{
      return this.last_name_paragraph.innerText;
    }
  }
}
class RandomUserPicture extends HTMLElement{
  static get observedAttributes(){
    return ['large', 'medium', 'thumbnail'];
  }
  constructor(){
    super();
    let shadowRoot = this.attachShadow({mode : 'open'});
    this.img = document.createElement('img');
    this.large_image = new Image();
    this.medium_image = new Image();
    this.thumbnail_image = new Image();
    shadowRoot.appendChild(this.img);
  }
  update(){
    if(this.mode === 'large'){
      this.img.src = this.large_image.src;
    }else if(this.mode === 'medium'){
      this.img.src = this.medium_image.src;
    }else if(this.mode === 'thumbnail'){
      this.img.src = this.thumbnail_image.src;
    }
  }
  onload(image){
    this.img.src = this.large_image.src;
    this.update();
  }
  connectedCallback(){
    this.large_image.onload = this.onload('large');
  }
  disconnectedCallback(){
    
  }
  attributeChangedCallback(attribute, oldVal, newVal) {
    if(attribute === 'large'){
      this.large_image.src = newVal;
    }else if(attribute === 'mode'){
      if(newVal === 'large' || newVal === 'medium' || newVal === 'thumbnail'){
      }else{
      }
    }
  }
  set mode(value){
    if(value){
      this.setAttribute('mode', value);
    }else{
      this.removeAttribute('mode');
    }
  }
  get mode(){
    if(this.hasAttribute('mode')){
      return this.getAttribute('mode');
    }else{
      return '';
    }
  }
  set large(value){
    if(value){
      this.setAttribute('large', value);
    }else{
      this.removeAttribute('large');
    }
  }
  get large(){
    if(this.hasAttribute('large')){
      return this.getAttribute('large');
    }else{
      return '';
    }
  }
}
class RandomUserEmail extends HTMLElement{
    static get observedAttributes(){
    return ['address'];
  }
  constructor(){
    super();
    let shadowRoot = this.attachShadow({mode : 'open'});
    
  }
  set email(value){
    if(value){
      this.setAttribute('first-name', value);
    }else{
      this.removeAttribute('first-name');
    }
  }
  get email(){
    if(this.hasAttribute('email')){
      return this.getAttribute('email');
    }else{
      return this.email_paragraph.innerText;
    }
  }
}
class RandomUser extends HTMLElement{
  static get observedAttributes(){
    return ['data'];
  }
  constructor(){
    super();
    let shadowRoot = this.attachShadow({mode : 'open'});
    
  }
  set gender(value){
    
  }
  get gender(){
    
  }
  set name(json){
    
  }
  get name(){
    
  }

  set data(json){
    if(value){
      this.setAttribute('data', json);
    }else{
      this.removeAttribute('data');
    }
  }
  get data(){
    if(this.hasAttribute('data')){
      return this.getAttribute('data');
    }else{
      //TODO: Add logic to turn data into json for returning.
      return null;
    }
  }
}
class RandomUsersList extends HTMLElement{
  static get observedAttributes(){
    return ['results'];
  }
  constructor(){
    super();
    let shadowRoot = this.attachShadow({mode : 'open'});
    shadowRoot.innerHTML = '<style>ul{display: grid; grid-template-columns: auto;}</style>';
    this.search = document.createElement('input');
    this.search.type = 'text';
    shadowRoot.appendChild(this.search);
    this.ul = document.createElement('ul');
    shadowRoot.appendChild(this.ul);
    this.url = 'https://randomuser.me/api/?results=';
  }
  connectedCallback(){
    
  }
  addToUL(data){
    let authors = data.results;
    console.log(authors);
    let names = authors.map((data) => {
      let container = document.createElement('div');
      let picture = document.createElement('random-user-picture');
      picture.mode = 'large';
      picture.large = data.picture.large;
      let user_name = document.createElement('random-user-name');
      user_name.title = data.name.title;
      user_name.first_name = data.name.first;
      user_name.last_name = data.name.last;
      container.appendChild(picture);
      container.appendChild(user_name);
      return container;
    });
    for(let x = 0; x < names.length; x++){
      this.ul.appendChild(names[x]);
    }
    console.log(names);
  }
  async getUsers(results){
    try{
      let response = await fetch(this.url+results);
      let data = await response.json();
      console.log(data.results);
      this.addToUL(data);
    }catch(error){
      console.error(error.message, error);
    }
  }
  attributeChangedCallback(attribute, oldVal, newVal) {
    if(attribute === 'results' && !isNaN(newVal)){
      this.results_ = newVal;
      this.getUsers('' + newVal);
    }
  }
  get results(){
    if(this.hasAttribute('results')){
      return this.getAttribute('results');
    }else{
      return null;
    }
  }
  set results(value){
    if(value){
      this.setAttribute('results', value);
    }else{
      this.removeAttribute('results');
    }
  }
}

customElements.define('random-user-picture', RandomUserPicture);
customElements.define('random-user-name', RandomUserName);
customElements.define('random-user', RandomUser);
customElements.define('random-users-list', RandomUsersList);
class Search {
  constructor() {
    this.form = document.querySelector('.search')
    this.searchField = this.form.querySelector('.search__input')
    this.searchResults = this.form.querySelector('.search__results')
    this.MAX_RESULTS = 6
    this.posts = undefined
    this.previousSearchTerm = ''
    this.timer
    this.events()
  }

  events(){
    this.form.addEventListener('submit', (e) => e.preventDefault())
    this.searchField.addEventListener('keyup', () => this.handleKeyPress());
  }

  loadData(){
    fetch('http://vanilla-notes.site/wp-json/vanilla/v1/searchquery')
    .then(res => res.json())
    .then(data => this.posts = data)
    .catch(err => console.log(err)); // TODO: Error handling
  }

  handleKeyPress(){
    // avoid unnecessary queries if input value hasn't changed (user pressed arrow key, tab, etc)
    if (this.previousSearchTerm !== this.searchField.value){
      clearTimeout(this.timer)

      // if search field is empty no results should show at all
      if (!this.searchField.value){
        this.searchResults.innerHTML = ''
      } else {
        this.searchResults.innerHTML = '<li class="search__result">Loading...</li>'

        // data only should load if user ever interacts with search form. This is the first interaction.
        if (!this.posts) this.loadData()

        this.previousSearchTerm = this.searchField.value
        this.timer = setTimeout(() => this.showResults(), 750)
      }
    }
  }

  showResults(){

    const query = this.searchField.value.trim().toLowerCase()
    let output = ''

    // return all matching results
    const matches = this.posts.filter(post => {
      return post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query)
    })

    if (!matches.length) {
      output = '<li class="search__result"><p>No results found.</p></li>'

    } else {

      // remove all but the first results allowed by MAX_RESULTS variable
      matches.splice(this.MAX_RESULTS)

      output = matches.map(item => `
        <li class="search__result">
          <a class="search__link" href="${item.permalink}">${item.title}</a>
        </li>`
      ).join('')
    }

    // Allow user to show more results if there are more than MAX_RESULTS (TO DO not wired yet!)
    if (matches.length === this.MAX_RESULTS){
      output += `
      <li class="search__result">
        <span>Showing ${this.MAX_RESULTS} results. </span>
        <a class="search__link" href="#">Get more results.</a>
      </li>`
    }

    // return ouput
    this.searchResults.innerHTML = output
  }
}

export default Search

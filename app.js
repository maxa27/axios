class RandomUserApp {
    constructor() {
      this.state = {
        loading: false,
        error: '',
        user: null,
      };
  
      this.loadUserBtn = document.getElementById('loadUser');
      this.spinner = document.getElementById('spinner');
      this.alert = document.getElementById('alert');
      this.userCard = document.getElementById('userCard');
  
      this.loadUserBtn.addEventListener('click', () => this.fetchUser());
    }
  
    render() {
      if (this.state.loading) {
        this.spinner.classList.remove('d-none');
      } else {
        this.spinner.classList.add('d-none');
      }
  
      if (this.state.error) {
        this.alert.textContent = this.state.error;
        this.alert.classList.remove('d-none');
      } else {
        this.alert.textContent = '';
        this.alert.classList.add('d-none');
      }
  
      if (this.state.user) {
        const { picture, name, email } = this.state.user;
        this.userCard.innerHTML = `
          <div class="card">
            <img src="${picture.large}" class="card-img-top" alt="User Photo">
            <div class="card-body">
              <h5 class="card-title">${name.first} ${name.last}</h5>
              <p class="card-text">${email}</p>
            </div>
          </div>
        `;
      } else {
        this.userCard.innerHTML = '';
      }
    }
  
    async fetchUser() {
      this.state.loading = true;
      this.state.error = '';
      this.state.user = null;
      this.render();
  
      try {
        const response = await axios.get('https://randomuser.me/api/');
        const user = response.data.results[0];
        this.state.user = user;
      } catch (err) {
        this.state.error = 'Не удалось загрузить данные пользователя. Попробуйте ещё раз.';
      } finally {
        this.state.loading = false;
        this.render();
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new RandomUserApp();
  });